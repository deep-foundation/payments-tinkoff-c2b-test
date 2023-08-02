import { DeepClient } from '@deep-foundation/deeplinks/imports/client.js';
import { createSerialOperation } from '@deep-foundation/deeplinks/imports/gql/index.js';
import { PACKAGE_NAME } from './package-name.js';

export interface InsertDoTestArg {
  deep: DeepClient;
  containerLinkId?: number;
}

export async function insertDoTest(arg: InsertDoTestArg) {
  const { deep } = arg;
  const containTypeLinkId = await deep.id('@deep-foundation/core', 'Contain');
  const containerLinkId = arg.containerLinkId ?? deep.linkId;

  return await deep.serial({
    operations: [
      createSerialOperation({
        table: 'links',
        type: 'insert',
        objects: {
          type_id: await deep.id(PACKAGE_NAME, 'DoTest'),
          in: {
            data: {
              type_id: containTypeLinkId,
              from_id: containerLinkId,
            },
          },
        },
      }),
    ],
  });
}
