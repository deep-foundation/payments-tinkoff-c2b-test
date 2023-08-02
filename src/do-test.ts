import { insertPort,InsertPortArg } from './insert-port.js';
import { insertRoute,InsertRouteArg } from './insert-route.js';
import { insertSum, InsertSumArg} from './insert-sum.js';
import { insertTerminalKey, InsertTerminalKeyArg } from './insert-terminal-key.js';
import { insertTerminalPassword,InsertTerminalPasswordArg  } from './insert-terminal-password.js';
import { insertDoTest, InsertDoTestArg} from './insert-do-test.js';
import assert from 'assert';
import delay from 'delay';
import { insertNotificationUrl, InsertNotificationUrlParam } from './insert-notification-url.js';

export type DoTestArg = InsertPortArg & InsertRouteArg & InsertSumArg & InsertTerminalKeyArg & InsertTerminalPasswordArg & InsertDoTestArg & InsertNotificationUrlParam & {
  lookingForHandlerResultAttemptsCount?: number,
  lookingForHandlerResultDelayInMs?: number
}

// export async function doTest(arg: {
//   deep: DeepClient;
//   containerLinkId?: number;
//   terminalKey: string;
//   terminalPassword: string;
//   sum: number;
//   port: string;
//   route: string;
//   lookingForHandlerResultAttemptsCount?: number,
//   lookingForHandlerResultDelayInMs?: number
// }) {
  export async function doTest(arg: DoTestArg) {
  const { deep, port, route, sum, terminalKey, terminalPassword, containerLinkId = deep.linkId, lookingForHandlerResultAttemptsCount = 10, lookingForHandlerResultDelayInMs = 1000 ,notificationUrl} = arg;
  await insertTerminalKey({
    deep,
    containerLinkId,
    terminalKey,
  });

  await insertTerminalPassword({
    deep,
    containerLinkId,
    terminalPassword,
  });

  await insertSum({
    deep,
    containerLinkId,
    sum,
  });

  await insertPort({
    deep,
    containerLinkId,
    port,
  });

  await insertRoute({
    deep,
    containerLinkId,
    route,
  });


  await insertNotificationUrl({
    deep,
    containerLinkId,
    notificationUrl
  });

  const {
    data: [{ id: doTestLinkId }],
  } = await insertDoTest({
    deep,
    containerLinkId,
  });

  const resolvedTypeLinkId = await deep.id('@deep-foundation/core', 'Resolved');
  const rejectedTypeLinkId = await deep.id('@deep-foundation/core', 'Rejected');

  let resolvedLink;

  for (let i = 0; i < lookingForHandlerResultAttemptsCount; i++) {
    const { data: promiseTreeLinksDownToDoTestLink } = await deep.select({
      up: {
        parent_id: { _eq: doTestLinkId },
        tree_id: { _eq: await deep.id('@deep-foundation/core', 'promiseTree') },
      },
    });

    const rejectedLink = promiseTreeLinksDownToDoTestLink.find(
      (link) => link.type_id === rejectedTypeLinkId
    );

    if(rejectedLink) {
      const {data: [promiseResultLink]} = await deep.select({
        id: rejectedLink.to_id
      })
      throw new Error(promiseResultLink.value.value)
    }

    resolvedLink = promiseTreeLinksDownToDoTestLink.find(
      (link) => link.type_id === resolvedTypeLinkId
    );

    await delay(lookingForHandlerResultDelayInMs)
  }

  assert.notStrictEqual(resolvedLink, undefined)
}
