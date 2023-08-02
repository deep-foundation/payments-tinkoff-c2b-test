import { DeepClient } from '@deep-foundation/deeplinks/imports/client';
import { createSerialOperation } from '@deep-foundation/deeplinks/imports/gql';
import { PACKAGE_NAME } from './package-name.js';

export async function insertNotificationUrl(param: InsertNotificationUrlParam) {
  const { deep, containerLinkId = deep.linkId, notificationUrl } = param;
  const containTypeLinkId = await deep.id('@deep-foundation/core', 'Contain');

  const reservedLinkIds = await deep.reserve(1);

  const notificationUrlLinkId = reservedLinkIds.pop();

  return await deep.serial({
    operations: [
      createSerialOperation({
        table: 'links',
        type: 'insert',
        objects: {
          id: notificationUrlLinkId,
          type_id: await deep.id(PACKAGE_NAME, 'NotificationUrl'),
          in: {
            data: {
              type_id: containTypeLinkId,
              from_id: containerLinkId,
            },
          },
        },
      }),
      createSerialOperation({
        table: 'strings',
        type: 'insert',
        objects: {
          link_id: notificationUrlLinkId,
          value: notificationUrl,
        },
      }),
    ],
  });
}

export interface InsertNotificationUrlParam {
  deep: DeepClient;
  notificationUrl: string;
  containerLinkId?: number;
}
