import {
  DeepClient,
  DeepClientResult,
  SerialOperation,
  Table,
} from '@deep-foundation/deeplinks/imports/client.js';
import { BoolExpLink } from '@deep-foundation/deeplinks/imports/client_types.js';
import { Link, MinilinksResult } from '@deep-foundation/deeplinks/imports/minilinks.js';


async ({
  deep,
}: {
  deep: DeepClient;
  data: { newLink: Link<number>, triggeredByLinkId: number };
}) => {
  const { execSync } = require('child_process');
  const assert = require('assert');
  const puppeteer = require('puppeteer');
  const {
    createSerialOperation,
  } = require('@deep-foundation/deeplinks/imports/gql/serial.js');

  await installDependencies();

  const containTypeLinkId = await deep.id('@deep-foundation/core', 'Contain');

  const routeLink = await getRouteLink();
  const route = routeLink.value.value;
  const portLink = await getPort();
  const port = portLink.value.value;
  const terminalKeyLink = await getTerminalKeyLink();
  const terminalKey = terminalKeyLink.value.value;
  const terminalPasswordLink = await getTerminalPasswordLink();
  const terminalPassword = terminalPasswordLink.value.value;
  const sum = await getSum();
  const notificationUrl = await getNotificationUrl();

  const reservedIds = await deep.reserve(13);

  const routeLinkId = reservedIds.pop();
  const routerStringUseLinkId = reservedIds.pop();
  const routerLinkId = reservedIds.pop();
  const portLinkId = reservedIds.pop();

  await insertRouteHandler();

  const storageBusinessLinkId = reservedIds.pop();
  const terminalKeyLinkId = reservedIds.pop();
  const terminalPasswordLinkId = reservedIds.pop();
  const notificationUrlLinkId = reservedIds.pop();
  const productLinkId = reservedIds.pop();

  const storageBusinessInsertSerialOperationData =
    await getStorageBusinessInsertSerialOperationData({
      storageBusinessLinkId,
    });

  const terminalPasswordInsertSerialOperationData =
    await getTerminalPasswordInsertSerialOperationData({
      terminalPasswordLinkId,
      storageBusinessLinkId,
    });

  const terminalPasswordValueInsertSerialOperationData =
    await getTerminalPasswordValueInsertSerialOperationData({
      terminalPasswordLinkId,
      terminalPassword,
    });

  const usesTerminalPasswordInsertSerialOperationData =
    await getUsesTerminalPasswordInsertSerialOperationData({
      storageBusinessLinkId,
      terminalPasswordLinkId,
    });

  const terminalKeyInsertSerialOperationData =
    await getTerminalKeyInsertSerialOperationData({
      storageBusinessLinkId,
      terminalKeyLinkId,
    });

  const terminalKeyValueInsertSerialOperationData =
    await getTerminalKeyValueInsertSerialOperationData({
      terminalKeyLinkId,
      terminalKey,
    });

  const usesTerminalKeyInsertSerialOperationData =
    await getUsesTerminalKeyInsertSerialOperationData({
      storageBusinessLinkId,
      terminalKeyLinkId,
    });

  const notificatoinUrlInsertSerialOperationData =
    await getNotificationUrlInsertSerialOperationData({
      notificationUrlLinkId,
      storageBusinessLinkId,
    });

  const notificationUrlValueInsertSerialOperationData =
    await getNotificationUrlValueInsertSerialOperationData({
      notificationUrl,
      notificationUrlLinkId
    });

  const usesNotificationUrlInsertSerialOperationData =
    await getUsesNotificationUrlInsertSerialOperationData({
      notificationUrlLinkId,
      storageBusinessLinkId,
    });

  const productInsertSerialOperationData =
    await getProductInsertSerialOperationData({
      productLinkId,
    });

  console.log('serialOperations0', [
    storageBusinessInsertSerialOperationData,
    terminalPasswordInsertSerialOperationData,
    terminalPasswordValueInsertSerialOperationData,
    usesTerminalPasswordInsertSerialOperationData,
    terminalKeyInsertSerialOperationData,
    terminalKeyValueInsertSerialOperationData,
    usesTerminalKeyInsertSerialOperationData,
    notificatoinUrlInsertSerialOperationData,
    notificationUrlValueInsertSerialOperationData,
    usesNotificationUrlInsertSerialOperationData,
    productInsertSerialOperationData,
  ]);

  await deep.serial({
    operations: [
      storageBusinessInsertSerialOperationData,
      terminalPasswordInsertSerialOperationData,
      terminalPasswordValueInsertSerialOperationData,
      usesTerminalPasswordInsertSerialOperationData,
      terminalKeyInsertSerialOperationData,
      terminalKeyValueInsertSerialOperationData,
      usesTerminalKeyInsertSerialOperationData,
      notificatoinUrlInsertSerialOperationData,
      notificationUrlValueInsertSerialOperationData,
      usesNotificationUrlInsertSerialOperationData,
      productInsertSerialOperationData,
    ],
  });

  const paymentLinkId = reservedIds.pop();
  const sumLinkId = reservedIds.pop();
  const objectLinkId = reservedIds.pop();
  const payLinkId = reservedIds.pop();

  const paymentInsertData = await getPaymentInsertSerialOperationData({
    paymentLinkId,
    storageBusinessLinkId,
  });

  const sumInsertData = await getSumInsertSerialOperationData({
    paymentLinkId,
    sumLinkId,
  });

  const sumValueInsertData = await getSumValueInsertSerialOperationData({
    sum,
    sumLinkId,
  });

  const objectInsertData = await getObjectInsertSerialOperationData({
    objectLinkId,
    paymentLinkId,
    productLinkId,
  });

  const payInsertData = await getPayInsertSerialOperationData({
    payLinkId,
    sumLinkId,
  });

  console.log('serialOperations1', [
    paymentInsertData,
    sumInsertData,
    sumValueInsertData,
    objectInsertData,
    payInsertData,
  ]);

  await deep.serial({
    operations: [
      paymentInsertData,
      sumInsertData,
      sumValueInsertData,
      objectInsertData,
      payInsertData,
    ],
  });

  const { link: urlLink } = await tryGetLink({
    delayMs: 1000,
    attemptsCount: 10,
    selectData: {
      type_id: {
        _id: ['@deep-foundation/payments-tinkoff-c2b', 'Url'],
      },
      to_id: payLinkId,
    },
  });
  assert.notStrictEqual(urlLink, undefined);

  const url = urlLink.value.value;
  assert.notStrictEqual(url, undefined);

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await payInBrowser({
    browser,
    page,
    url,
  });

  const { link: payedLink } = await tryGetLink({
    delayMs: 1000,
    attemptsCount: 10,
    selectData: {
      type_id: {
        _id: ['@deep-foundation/payments-tinkoff-c2b', 'Payed'],
      },
      to_id: payLinkId,
    },
  });
  assert.notEqual(payedLink, undefined);

  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function payInBrowser({ page, browser, url }) {
    await page.goto(url, { waitUntil: 'networkidle2' });
    await sleep(5000);
    const oldForm = await page.evaluate(() => {
      return !!document.querySelector(
        'input[automation-id="tui-input-card-grouped__card"]'
      );
    });
    if (oldForm) {
      console.log('OLD FORM!!!!!!!');
      // Старая форма используется на тестовом сервере
      const cvc1 = await page.evaluate(() => {
        return !!document.querySelector(
          'button[automation-id="pay-card__submit"]'
        );
      });

      if (cvc1) {
        await page.waitForSelector(
          'input[automation-id="tui-input-card-grouped__card"]'
        );
        await sleep(300);
        await page.type(
          'input[automation-id="tui-input-card-grouped__card"]',
          process.env.PAYMENTS_C2B_CARD_NUMBER_SUCCESS
        ); // card number
        await sleep(300);
        await page.keyboard.press('Tab');
        await sleep(300);
        await page.type(
          'input[automation-id="tui-input-card-grouped__expire"]',
          process.env.PAYMENTS_C2B_CARD_EXPDATE
        ); // expired date
        await sleep(300);
        await page.keyboard.press('Tab');
        await sleep(300);
        await page.type(
          'input[automation-id="tui-input-card-grouped__cvc"]',
          process.env.PAYMENTS_C2B_CARD_CVC
        ); // CVC code
        await sleep(300);
        await page.click('button[automation-id="pay-card__submit"]'); // submit button
      } else {
        await page.waitForSelector(
          'input[automation-id="tui-input-card-grouped__card"]'
        );
        await sleep(300);
        await page.type(
          'input[automation-id="tui-input-card-grouped__card"]',
          process.env.PAYMENTS_C2B_CARD_NUMBER_SUCCESS
        ); // card number
        await sleep(300);
        await page.keyboard.press('Tab');
        await sleep(300);
        await page.type(
          'input[automation-id="tui-input-card-grouped__expire"]',
          process.env.PAYMENTS_C2B_CARD_EXPDATE
        ); // expired date
        await sleep(300);
        await page.keyboard.press('Tab');
        await sleep(300);
        await page.type(
          'input[automation-id="tui-input-card-grouped__cvc"]',
          process.env.PAYMENTS_C2B_CARD_CVC
        ); // CVC code
        await sleep(300);
        await page.click('button[automation-id="card-form__submit"]'); // submit button
      }
      // TODO: пока старая форма вызывалась только на тестовой карте, где ввод смс кода не нужен
      await sleep(1000);
    } else {
      console.log('NEW FORM!!!!!!!');
      await page.type('#pan', process.env.PAYMENTS_C2B_CARD_NUMBER_SUCCESS); // card number
      await page.type('#expDate', process.env.PAYMENTS_C2B_CARD_EXPDATE); // expired date
      await page.type('#card_cvc', process.env.PAYMENTS_C2B_CARD_CVC); // CVC code
      await page.click('button[type=submit]'); // submit button
      await page.waitForSelector('input[name="password"]');
      const code = prompt('enter code ');
      console.log('code', code);
      await page.type('input[name="password"]', code);
      await sleep(3000);
    }
    await browser.close();
  }

  async function getRouteLink() {
    const selectData = {
      type_id: {
        _id: [deep.id, 'Route'],
      },
      in: {
        type_id: containTypeLinkId,
        from_id: triggeredByLinkId,
      },
    };

    const {
      data: [routeLink],
    } = await deep.select(selectData);

    if (!routeLink) {
      throw new Error(`Select with data ${selectData} returned empty result`);
    }

    if (!routeLink.value?.value) {
      throw new Error(`${routeLink.id} must have a value`);
    }

    return routeLink;
  }

  async function getPort() {
    const selectData = {
      type_id: {
        _id: [deep.id, 'Port'],
      },
      in: {
        type_id: containTypeLinkId,
        from_id: triggeredByLinkId,
      },
    };

    const {
      data: [port],
    } = await deep.select(selectData);

    if (!port) {
      throw new Error(`Select with data ${selectData} returned empty result`);
    }

    if (!port.value?.value) {
      throw new Error(`${port.id} must have a value`);
    }

    return port;
  }

  async function installDependencies() {
    execSync(
      `npm install puppeteer &&  apt update &&  apt install -y libgbm-dev chromium gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget`
    );
  }

  async function insertRouteHandler() {
    const notificationHandlerLinkId = await deep.id(
      '@deep-foundation/payments-tinkoff-c2b',
      'NotificationHandler'
    );
    const routeTypeLinkId = await deep.id('@deep-foundation/core', 'Route');
    const routerTypeLinkId = await deep.id('@deep-foundation/core', 'Router');
    const portTypeLinkId = await deep.id('@deep-foundation/core', 'Port');
    const routerStringUseTypeLinkId = await deep.id(
      '@deep-foundation/core',
      'RouterStringUse'
    );
    const routerListeningTypeLinkId = await deep.id(
      '@deep-foundation/core',
      'RouterListening'
    );

    await deep.serial({
      operations: [
        createSerialOperation({
          table: 'links',
          type: 'insert',
          objects: {
            id: routeLinkId,
            type_id: routeTypeLinkId,
            in: {
              data: {
                type_id: containTypeLinkId,
                from_id: triggeredByLinkId,
              },
            },
          },
        }),
        createSerialOperation({
          table: 'links',
          type: 'insert',
          objects: {
            type_id: await deep.id('@deep-foundation/core', 'HandleRoute'),
            from_id: routeLinkId,
            to_id: notificationHandlerLinkId,
            in: {
              data: {
                type_id: containTypeLinkId,
                from_id: triggeredByLinkId,
              },
            },
          },
        }),
        createSerialOperation({
          table: 'links',
          type: 'insert',
          objects: {
            id: routerLinkId,
            type_id: routerTypeLinkId,
            in: {
              data: {
                type_id: containTypeLinkId,
                from_id: triggeredByLinkId,
              },
            },
          },
        }),
        createSerialOperation({
          table: 'links',
          type: 'insert',
          objects: {
            id: routerStringUseLinkId,
            type_id: routerStringUseTypeLinkId,
            from_id: routeLinkId,
            to_id: routerLinkId,
            in: {
              data: {
                type_id: containTypeLinkId,
                from_id: triggeredByLinkId,
              },
            },
          },
        }),
        createSerialOperation({
          table: 'strings',
          type: 'insert',
          objects: {
            link_id: routerStringUseLinkId,
            value: route,
          },
        }),
        createSerialOperation({
          table: 'links',
          type: 'insert',
          objects: {
            id: portLinkId,
            type_id: portTypeLinkId,
            in: {
              data: {
                type_id: containTypeLinkId,
                from_id: triggeredByLinkId,
              },
            },
          },
        }),
        createSerialOperation({
          table: 'numbers',
          type: 'insert',
          objects: {
            link_id: portLinkId,
            value: port,
          },
        }),
        createSerialOperation({
          table: 'links',
          type: 'insert',
          objects: {
            type_id: routerListeningTypeLinkId,
            from_id: routerLinkId,
            to_id: portLinkId,
            in: {
              data: {
                type_id: containTypeLinkId,
                from_id: triggeredByLinkId,
              },
            },
          },
        }),
      ],
    });
  }

  async function getStorageBusinessInsertSerialOperationData({
    storageBusinessLinkId,
  }) {
    const storageBusinessTypeLinkId = await deep.id(
      '@deep-foundation/payments-tinkoff-c2b',
      'StorageBusiness'
    );
    return createSerialOperation({
      type: 'insert',
      table: 'links',
      objects: {
        id: storageBusinessLinkId,
        type_id: storageBusinessTypeLinkId,
        in: {
          data: {
            type_id: containTypeLinkId,
            from_id: triggeredByLinkId,
          },
        },
      },
    });
  }

  async function getTerminalPasswordInsertSerialOperationData({
    terminalPasswordLinkId,
    storageBusinessLinkId,
  }) {
    const terminalPasswordTypeLinkId = await deep.id(
      '@deep-foundation/payments-tinkoff-c2b',
      'TerminalPassword'
    );
    return createSerialOperation({
      type: 'insert',
      table: 'links',
      objects: {
        id: terminalPasswordLinkId,
        type_id: terminalPasswordTypeLinkId,
        in: {
          data: [
            {
              type_id: containTypeLinkId,
              from_id: storageBusinessLinkId,
            },
          ],
        },
      },
    });
  }

  async function getTerminalPasswordValueInsertSerialOperationData({
    terminalPassword,
    terminalPasswordLinkId,
  }) {
    return createSerialOperation({
      type: 'insert',
      table: 'strings',
      objects: {
        link_id: terminalPasswordLinkId,
        value: terminalPassword,
      },
    });
  }

  async function getUsesTerminalPasswordInsertSerialOperationData({
    terminalPasswordLinkId,
    storageBusinessLinkId,
  }) {
    const usesTerminalPasswordTypeLinkId = await deep.id(
      '@deep-foundation/payments-tinkoff-c2b',
      'UsesTerminalPassword'
    );
    return createSerialOperation({
      type: 'insert',
      table: 'links',
      objects: {
        type_id: usesTerminalPasswordTypeLinkId,
        from_id: storageBusinessLinkId,
        to_id: terminalPasswordLinkId,
        in: {
          data: {
            type_id: containTypeLinkId,
            from_id: storageBusinessLinkId,
          },
        },
      },
    });
  }

  async function getTerminalKeyInsertSerialOperationData({
    terminalKeyLinkId,
    storageBusinessLinkId,
  }) {
    const terminalKeyTypeLinkId = await deep.id(
      '@deep-foundation/payments-tinkoff-c2b',
      'TerminalKey'
    );
    return createSerialOperation({
      type: 'insert',
      table: 'links',
      objects: {
        id: terminalKeyLinkId,
        type_id: terminalKeyTypeLinkId,
        in: {
          data: [
            {
              type_id: containTypeLinkId,
              from_id: storageBusinessLinkId,
            },
          ],
        },
      },
    });
  }

  async function getTerminalKeyValueInsertSerialOperationData({
    terminalKeyLinkId,
    terminalKey,
  }) {
    return createSerialOperation({
      type: 'insert',
      table: 'strings',
      objects: {
        link_id: terminalKeyLinkId,
        value: terminalKey,
      },
    });
  }

  async function getUsesTerminalKeyInsertSerialOperationData({
    terminalKeyLinkId,
    storageBusinessLinkId,
  }) {
    const usesTerminalKeyTypeLinkId = await deep.id(
      '@deep-foundation/payments-tinkoff-c2b',
      'UsesTerminalKey'
    );
    return createSerialOperation({
      type: 'insert',
      table: 'links',
      objects: {
        type_id: usesTerminalKeyTypeLinkId,
        from_id: storageBusinessLinkId,
        to_id: terminalKeyLinkId,
        in: {
          data: {
            type_id: containTypeLinkId,
            from_id: storageBusinessLinkId,
          },
        },
      },
    });
  }

  async function getNotificationUrlInsertSerialOperationData({
    notificationUrlLinkId,
    storageBusinessLinkId,
  }) {
    const notificationUrlTypeLinkId = await deep.id(
      '@deep-foundation/payments-tinkoff-c2b',
      'NotificationUrl'
    );
    return createSerialOperation({
      type: 'insert',
      table: 'links',
      objects: {
        id: notificationUrlLinkId,
        type_id: notificationUrlTypeLinkId,
        in: {
          data: [
            {
              type_id: containTypeLinkId,
              from_id: storageBusinessLinkId,
            },
          ],
        },
      },
    });
  }

  async function getNotificationUrlValueInsertSerialOperationData({
    notificationUrlLinkId,
    notificationUrl,
  }) {
    return createSerialOperation({
      type: 'insert',
      table: 'strings',
      objects: {
        link_id: notificationUrlLinkId,
        value: notificationUrl,
      },
    });
  }

  async function getUsesNotificationUrlInsertSerialOperationData({
    notificationUrlLinkId,
    storageBusinessLinkId,
  }) {
    const usesNotificationUrlTypeLinkId = await deep.id(
      '@deep-foundation/payments-tinkoff-c2b',
      'UsesNotificationUrl'
    );
    return createSerialOperation({
      type: 'insert',
      table: 'links',
      objects: {
        type_id: usesNotificationUrlTypeLinkId,
        from_id: storageBusinessLinkId,
        to_id: notificationUrlLinkId,
        in: {
          data: {
            type_id: containTypeLinkId,
            from_id: storageBusinessLinkId,
          },
        },
      },
    });
  }

  async function getProductInsertSerialOperationData({ productLinkId }) {
    const syncTextFileTypeLinkId = await deep.id(
      '@deep-foundation/core',
      'SyncTextFile'
    );
    return createSerialOperation({
      type: 'insert',
      table: 'links',
      objects: {
        id: productLinkId,
        type_id: syncTextFileTypeLinkId,
        in: {
          data: [
            {
              type_id: containTypeLinkId,
              from_id: triggeredByLinkId,
            },
          ],
        },
      },
    });
  }

  async function getTerminalKeyLink() {
    const terminalKeyTypeLinkId = await deep.id(
      '@deep-foundation/payments-tinkoff-c2b-test',
      'TerminalKey'
    );
    const selectData = {
      type_id: terminalKeyTypeLinkId,
      in: {
        type_id: containTypeLinkId,
        from_id: triggeredByLinkId,
      },
    };
    const {
      data: [terminalKeyLink],
    } = await deep.select(selectData);

    if (!terminalKeyLink) {
      throw new Error(
        `Select with data ${JSON.stringify(selectData)} returned empty result`
      );
    }

    if (!terminalKeyLink.value?.value) {
      throw new Error(`${terminalKeyLink.id} must have value`);
    }

    return terminalKeyLink;
  }

  async function getTerminalPasswordLink() {
    const terminalPasswordTypeLinkId = await deep.id(
      '@deep-foundation/payments-tinkoff-c2b-test',
      'TerminalPassword'
    );
    const selectData = {
      type_id: terminalPasswordTypeLinkId,
      in: {
        type_id: containTypeLinkId,
        from_id: triggeredByLinkId,
      },
    };
    const {
      data: [terminalPasswordLink],
    } = await deep.select(selectData);

    if (!terminalPasswordLink) {
      throw new Error(
        `Select with data ${JSON.stringify(selectData)} returned empty result`
      );
    }

    if (!terminalPasswordLink.value?.value) {
      throw new Error(`${terminalPasswordLink.id} must have value`);
    }

    return terminalPasswordLink;
  }

  async function getPaymentInsertSerialOperationData({
    paymentLinkId,
    storageBusinessLinkId,
  }) {
    const paymentTypeLinkId = await deep.id(
      '@deep-foundation/payments-tinkoff-c2b',
      'Payment'
    );
    return createSerialOperation({
      type: 'insert',
      table: 'links',
      objects: {
        id: paymentLinkId,
        type_id: paymentTypeLinkId,
        from_id: triggeredByLinkId,
        to_id: storageBusinessLinkId,
        in: {
          data: [
            {
              type_id: containTypeLinkId,
              from_id: triggeredByLinkId,
            },
          ],
        },
      },
    });
  }

  async function getSumInsertSerialOperationData({ sumLinkId, paymentLinkId }) {
    const sumTypeLinkId = await deep.id(
      '@deep-foundation/payments-tinkoff-c2b',
      'Sum'
    );
    return createSerialOperation({
      type: 'insert',
      table: 'links',
      objects: {
        id: sumLinkId,
        type_id: sumTypeLinkId,
        from_id: triggeredByLinkId,
        to_id: paymentLinkId,
        in: {
          data: [
            {
              type_id: containTypeLinkId,
              from_id: triggeredByLinkId,
            },
          ],
        },
      },
    });
  }

  async function getSumValueInsertSerialOperationData({ sumLinkId, sum }) {
    return createSerialOperation({
      type: 'insert',
      table: 'numbers',
      objects: {
        link_id: sumLinkId,
        value: sum,
      },
    });
  }

  async function getObjectInsertSerialOperationData({
    objectLinkId,
    paymentLinkId,
    productLinkId,
  }) {
    const objectTypeLinkId = await deep.id(
      '@deep-foundation/payments-tinkoff-c2b',
      'Object'
    );
    return createSerialOperation({
      type: 'insert',
      table: 'links',
      objects: {
        id: objectLinkId,
        type_id: objectTypeLinkId,
        from_id: paymentLinkId,
        to_id: productLinkId,
        in: {
          data: [
            {
              type_id: containTypeLinkId,
              from_id: triggeredByLinkId,
            },
          ],
        },
      },
    });
  }

  async function getPayInsertSerialOperationData({ payLinkId, sumLinkId }) {
    const payTypeLinkId = await deep.id(
      '@deep-foundation/payments-tinkoff-c2b',
      'Pay'
    );
    return createSerialOperation({
      type: 'insert',
      table: 'links',
      objects: {
        id: payLinkId,
        type_id: payTypeLinkId,
        from_id: triggeredByLinkId,
        to_id: sumLinkId,
        in: {
          data: [
            {
              type_id: containTypeLinkId,
              from_id: triggeredByLinkId,
            },
          ],
        },
      },
    });
  }

  async function getSum() {
    const sumTypeLinkId = await deep.id(
      '@deep-foundation/payments-tinkoff-c2b-test',
      'Sum'
    );
    const selectData = {
      type_id: sumTypeLinkId,
      in: {
        type_id: containTypeLinkId,
        from_id: triggeredByLinkId,
      },
    };
    
    const {
      data: [sumLink],
    } = await deep.select(selectData);

    return sumLink.value?.value ?? 5500;
  }

  async function getNotificationUrl() {
    const notificationUrlTypeLinkId = await deep.id(
      '@deep-foundation/payments-tinkoff-c2b-test',
      'NotificationUrl'
    );
    const selectData = {
      type_id: notificationUrlTypeLinkId,
      in: {
        type_id: containTypeLinkId,
        from_id: triggeredByLinkId,
      },
    };
    
    const {
      data: [notificationUrlLink],
    } = await deep.select(selectData);
    if(!notificationUrlLink) {
      throw new Error(`Select with data ${JSON.stringify(selectData)} returned empty result`);
    }
    if(!notificationUrlLink.value?.value) {
      throw new Error(`${notificationUrlLink.id} must have value`);
    }

    return notificationUrlLink.value.value;
  }

  async function tryGetLink({ selectData, delayMs, attemptsCount }) {
    let resultLink;
    for (let i = 0; i < attemptsCount; i++) {
      const {
        data: [link],
      } = await deep.select(selectData);

      if (link) {
        resultLink = link;
      }

      if(attemptsCount !== 0) {
        await sleep(delayMs);
      }
    }
    return { link: resultLink };
  }
};
