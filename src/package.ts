
import {
  Package as BasePackage,
  PackageOptions as BasePackageOptions,
} from '@deep-foundation/deeplinks/imports/package';

/**
Represents a deep package

@remarks
Contains name of the package and all the links as the objects with id method which returns the id of the link.

@example
#### Use name field to get the name of the package
```ts
const package = new Package({deep});
const {name: packageName} = package;
```
#### Use id method to get the id of the link
```ts
const package = new Package({deep});
const doTestInsertHandlerCodeTypeLinkId = await package["DoTestInsertHandlerCode"].id();
const notificationUrlTypeLinkId = await package["NotificationUrl"].id();
const typeOfValueOfNotificationUrlTypeLinkId = await package["TypeOfValueOfNotificationUrl"].id();
const sumTypeLinkId = await package["Sum"].id();
const typeOfValueOfSumTypeLinkId = await package["TypeOfValueOfSum"].id();
const terminalKeyTypeLinkId = await package["TerminalKey"].id();
const typeOfValueOfTerminalKeyTypeLinkId = await package["TypeOfValueOfTerminalKey"].id();
const terminalPasswordTypeLinkId = await package["TerminalPassword"].id();
const typeOfValueOfTerminalPasswordTypeLinkId = await package["TypeOfValueOfTerminalPassword"].id();
const portTypeLinkId = await package["Port"].id();
const typeOfValueOfPortTypeLinkId = await package["TypeOfValueOfPort"].id();
const routeTypeLinkId = await package["Route"].id();
const typeOfValueOfRouteTypeLinkId = await package["TypeOfValueOfRoute"].id();
const @deep-foundation/payments-tinkoff-c2bDependencyTypeLinkId = await package["@deep-foundation/payments-tinkoff-c2bDependency"].id();
const doTestTypeLinkId = await package["DoTest"].id();
const doTestInsertHandlerTypeLinkId = await package["DoTestInsertHandler"].id();
const handleDoTestTypeLinkId = await package["HandleDoTest"].id();
```

#### Use idLocal method to get the local id of the link
```ts
const package = new Package({deep});
await package.applyMinilinks();
const doTestInsertHandlerCodeTypeLinkId = package["DoTestInsertHandlerCode"].idLocal();
const notificationUrlTypeLinkId = package["NotificationUrl"].idLocal();
const typeOfValueOfNotificationUrlTypeLinkId = package["TypeOfValueOfNotificationUrl"].idLocal();
const sumTypeLinkId = package["Sum"].idLocal();
const typeOfValueOfSumTypeLinkId = package["TypeOfValueOfSum"].idLocal();
const terminalKeyTypeLinkId = package["TerminalKey"].idLocal();
const typeOfValueOfTerminalKeyTypeLinkId = package["TypeOfValueOfTerminalKey"].idLocal();
const terminalPasswordTypeLinkId = package["TerminalPassword"].idLocal();
const typeOfValueOfTerminalPasswordTypeLinkId = package["TypeOfValueOfTerminalPassword"].idLocal();
const portTypeLinkId = package["Port"].idLocal();
const typeOfValueOfPortTypeLinkId = package["TypeOfValueOfPort"].idLocal();
const routeTypeLinkId = package["Route"].idLocal();
const typeOfValueOfRouteTypeLinkId = package["TypeOfValueOfRoute"].idLocal();
const @deep-foundation/payments-tinkoff-c2bDependencyTypeLinkId = package["@deep-foundation/payments-tinkoff-c2bDependency"].idLocal();
const doTestTypeLinkId = package["DoTest"].idLocal();
const doTestInsertHandlerTypeLinkId = package["DoTestInsertHandler"].idLocal();
const handleDoTestTypeLinkId = package["HandleDoTest"].idLocal();
```
#### Use name field to get the name of the link
```ts
const package = new Package({deep});
const doTestInsertHandlerCode = package["DoTestInsertHandlerCode"].name;
const notificationUrl = package["NotificationUrl"].name;
const typeOfValueOfNotificationUrl = package["TypeOfValueOfNotificationUrl"].name;
const sum = package["Sum"].name;
const typeOfValueOfSum = package["TypeOfValueOfSum"].name;
const terminalKey = package["TerminalKey"].name;
const typeOfValueOfTerminalKey = package["TypeOfValueOfTerminalKey"].name;
const terminalPassword = package["TerminalPassword"].name;
const typeOfValueOfTerminalPassword = package["TypeOfValueOfTerminalPassword"].name;
const port = package["Port"].name;
const typeOfValueOfPort = package["TypeOfValueOfPort"].name;
const route = package["Route"].name;
const typeOfValueOfRoute = package["TypeOfValueOfRoute"].name;
const @deep-foundation/payments-tinkoff-c2bDependency = package["@deep-foundation/payments-tinkoff-c2bDependency"].name;
const doTest = package["DoTest"].name;
const doTestInsertHandler = package["DoTestInsertHandler"].name;
const handleDoTest = package["HandleDoTest"].name;
```
*/
export class Package extends BasePackage {

  constructor(param: PackageOptions) {
    super({
      ...param,
      name: '@deep-foundation/payments-tinkoff-c2b-test',
    });
  }


      /**
      @example
      #### Use id method to get the id of the DoTestInsertHandlerCode link
      ```ts
      const package = new Package({deep});
      const doTestInsertHandlerCodeTypeLinkId = await package["DoTestInsertHandlerCode"].id();
      ```
      #### Use localId method to get the local id of the DoTestInsertHandlerCode link
      ```ts
      const package = new Package({deep});
      const doTestInsertHandlerCodeTypeLinkId = await package["DoTestInsertHandlerCode"].localId();
      ```
      #### Use name field to get the name of the DoTestInsertHandlerCode link
      ```ts
      const package = new Package({deep});
      const doTestInsertHandlerCode = await package["DoTestInsertHandlerCode"].name;
      ```
      */
      public "DoTestInsertHandlerCode" = this.createEntity("DoTestInsertHandlerCode");
      /**
      @example
      #### Use id method to get the id of the NotificationUrl link
      ```ts
      const package = new Package({deep});
      const notificationUrlTypeLinkId = await package["NotificationUrl"].id();
      ```
      #### Use localId method to get the local id of the NotificationUrl link
      ```ts
      const package = new Package({deep});
      const notificationUrlTypeLinkId = await package["NotificationUrl"].localId();
      ```
      #### Use name field to get the name of the NotificationUrl link
      ```ts
      const package = new Package({deep});
      const notificationUrl = await package["NotificationUrl"].name;
      ```
      */
      public "NotificationUrl" = this.createEntity("NotificationUrl");
      /**
      @example
      #### Use id method to get the id of the TypeOfValueOfNotificationUrl link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfNotificationUrlTypeLinkId = await package["TypeOfValueOfNotificationUrl"].id();
      ```
      #### Use localId method to get the local id of the TypeOfValueOfNotificationUrl link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfNotificationUrlTypeLinkId = await package["TypeOfValueOfNotificationUrl"].localId();
      ```
      #### Use name field to get the name of the TypeOfValueOfNotificationUrl link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfNotificationUrl = await package["TypeOfValueOfNotificationUrl"].name;
      ```
      */
      public "TypeOfValueOfNotificationUrl" = this.createEntity("TypeOfValueOfNotificationUrl");
      /**
      @example
      #### Use id method to get the id of the Sum link
      ```ts
      const package = new Package({deep});
      const sumTypeLinkId = await package["Sum"].id();
      ```
      #### Use localId method to get the local id of the Sum link
      ```ts
      const package = new Package({deep});
      const sumTypeLinkId = await package["Sum"].localId();
      ```
      #### Use name field to get the name of the Sum link
      ```ts
      const package = new Package({deep});
      const sum = await package["Sum"].name;
      ```
      */
      public "Sum" = this.createEntity("Sum");
      /**
      @example
      #### Use id method to get the id of the TypeOfValueOfSum link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfSumTypeLinkId = await package["TypeOfValueOfSum"].id();
      ```
      #### Use localId method to get the local id of the TypeOfValueOfSum link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfSumTypeLinkId = await package["TypeOfValueOfSum"].localId();
      ```
      #### Use name field to get the name of the TypeOfValueOfSum link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfSum = await package["TypeOfValueOfSum"].name;
      ```
      */
      public "TypeOfValueOfSum" = this.createEntity("TypeOfValueOfSum");
      /**
      @example
      #### Use id method to get the id of the TerminalKey link
      ```ts
      const package = new Package({deep});
      const terminalKeyTypeLinkId = await package["TerminalKey"].id();
      ```
      #### Use localId method to get the local id of the TerminalKey link
      ```ts
      const package = new Package({deep});
      const terminalKeyTypeLinkId = await package["TerminalKey"].localId();
      ```
      #### Use name field to get the name of the TerminalKey link
      ```ts
      const package = new Package({deep});
      const terminalKey = await package["TerminalKey"].name;
      ```
      */
      public "TerminalKey" = this.createEntity("TerminalKey");
      /**
      @example
      #### Use id method to get the id of the TypeOfValueOfTerminalKey link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfTerminalKeyTypeLinkId = await package["TypeOfValueOfTerminalKey"].id();
      ```
      #### Use localId method to get the local id of the TypeOfValueOfTerminalKey link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfTerminalKeyTypeLinkId = await package["TypeOfValueOfTerminalKey"].localId();
      ```
      #### Use name field to get the name of the TypeOfValueOfTerminalKey link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfTerminalKey = await package["TypeOfValueOfTerminalKey"].name;
      ```
      */
      public "TypeOfValueOfTerminalKey" = this.createEntity("TypeOfValueOfTerminalKey");
      /**
      @example
      #### Use id method to get the id of the TerminalPassword link
      ```ts
      const package = new Package({deep});
      const terminalPasswordTypeLinkId = await package["TerminalPassword"].id();
      ```
      #### Use localId method to get the local id of the TerminalPassword link
      ```ts
      const package = new Package({deep});
      const terminalPasswordTypeLinkId = await package["TerminalPassword"].localId();
      ```
      #### Use name field to get the name of the TerminalPassword link
      ```ts
      const package = new Package({deep});
      const terminalPassword = await package["TerminalPassword"].name;
      ```
      */
      public "TerminalPassword" = this.createEntity("TerminalPassword");
      /**
      @example
      #### Use id method to get the id of the TypeOfValueOfTerminalPassword link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfTerminalPasswordTypeLinkId = await package["TypeOfValueOfTerminalPassword"].id();
      ```
      #### Use localId method to get the local id of the TypeOfValueOfTerminalPassword link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfTerminalPasswordTypeLinkId = await package["TypeOfValueOfTerminalPassword"].localId();
      ```
      #### Use name field to get the name of the TypeOfValueOfTerminalPassword link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfTerminalPassword = await package["TypeOfValueOfTerminalPassword"].name;
      ```
      */
      public "TypeOfValueOfTerminalPassword" = this.createEntity("TypeOfValueOfTerminalPassword");
      /**
      @example
      #### Use id method to get the id of the Port link
      ```ts
      const package = new Package({deep});
      const portTypeLinkId = await package["Port"].id();
      ```
      #### Use localId method to get the local id of the Port link
      ```ts
      const package = new Package({deep});
      const portTypeLinkId = await package["Port"].localId();
      ```
      #### Use name field to get the name of the Port link
      ```ts
      const package = new Package({deep});
      const port = await package["Port"].name;
      ```
      */
      public "Port" = this.createEntity("Port");
      /**
      @example
      #### Use id method to get the id of the TypeOfValueOfPort link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfPortTypeLinkId = await package["TypeOfValueOfPort"].id();
      ```
      #### Use localId method to get the local id of the TypeOfValueOfPort link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfPortTypeLinkId = await package["TypeOfValueOfPort"].localId();
      ```
      #### Use name field to get the name of the TypeOfValueOfPort link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfPort = await package["TypeOfValueOfPort"].name;
      ```
      */
      public "TypeOfValueOfPort" = this.createEntity("TypeOfValueOfPort");
      /**
      @example
      #### Use id method to get the id of the Route link
      ```ts
      const package = new Package({deep});
      const routeTypeLinkId = await package["Route"].id();
      ```
      #### Use localId method to get the local id of the Route link
      ```ts
      const package = new Package({deep});
      const routeTypeLinkId = await package["Route"].localId();
      ```
      #### Use name field to get the name of the Route link
      ```ts
      const package = new Package({deep});
      const route = await package["Route"].name;
      ```
      */
      public "Route" = this.createEntity("Route");
      /**
      @example
      #### Use id method to get the id of the TypeOfValueOfRoute link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfRouteTypeLinkId = await package["TypeOfValueOfRoute"].id();
      ```
      #### Use localId method to get the local id of the TypeOfValueOfRoute link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfRouteTypeLinkId = await package["TypeOfValueOfRoute"].localId();
      ```
      #### Use name field to get the name of the TypeOfValueOfRoute link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfRoute = await package["TypeOfValueOfRoute"].name;
      ```
      */
      public "TypeOfValueOfRoute" = this.createEntity("TypeOfValueOfRoute");
      /**
      @example
      #### Use id method to get the id of the @deep-foundation/payments-tinkoff-c2bDependency link
      ```ts
      const package = new Package({deep});
      const @deep-foundation/payments-tinkoff-c2bDependencyTypeLinkId = await package["@deep-foundation/payments-tinkoff-c2bDependency"].id();
      ```
      #### Use localId method to get the local id of the @deep-foundation/payments-tinkoff-c2bDependency link
      ```ts
      const package = new Package({deep});
      const @deep-foundation/payments-tinkoff-c2bDependencyTypeLinkId = await package["@deep-foundation/payments-tinkoff-c2bDependency"].localId();
      ```
      #### Use name field to get the name of the @deep-foundation/payments-tinkoff-c2bDependency link
      ```ts
      const package = new Package({deep});
      const @deep-foundation/payments-tinkoff-c2bDependency = await package["@deep-foundation/payments-tinkoff-c2bDependency"].name;
      ```
      */
      public "@deep-foundation/payments-tinkoff-c2bDependency" = this.createEntity("@deep-foundation/payments-tinkoff-c2bDependency");
      /**
      @example
      #### Use id method to get the id of the DoTest link
      ```ts
      const package = new Package({deep});
      const doTestTypeLinkId = await package["DoTest"].id();
      ```
      #### Use localId method to get the local id of the DoTest link
      ```ts
      const package = new Package({deep});
      const doTestTypeLinkId = await package["DoTest"].localId();
      ```
      #### Use name field to get the name of the DoTest link
      ```ts
      const package = new Package({deep});
      const doTest = await package["DoTest"].name;
      ```
      */
      public "DoTest" = this.createEntity("DoTest");
      /**
      @example
      #### Use id method to get the id of the DoTestInsertHandler link
      ```ts
      const package = new Package({deep});
      const doTestInsertHandlerTypeLinkId = await package["DoTestInsertHandler"].id();
      ```
      #### Use localId method to get the local id of the DoTestInsertHandler link
      ```ts
      const package = new Package({deep});
      const doTestInsertHandlerTypeLinkId = await package["DoTestInsertHandler"].localId();
      ```
      #### Use name field to get the name of the DoTestInsertHandler link
      ```ts
      const package = new Package({deep});
      const doTestInsertHandler = await package["DoTestInsertHandler"].name;
      ```
      */
      public "DoTestInsertHandler" = this.createEntity("DoTestInsertHandler");
      /**
      @example
      #### Use id method to get the id of the HandleDoTest link
      ```ts
      const package = new Package({deep});
      const handleDoTestTypeLinkId = await package["HandleDoTest"].id();
      ```
      #### Use localId method to get the local id of the HandleDoTest link
      ```ts
      const package = new Package({deep});
      const handleDoTestTypeLinkId = await package["HandleDoTest"].localId();
      ```
      #### Use name field to get the name of the HandleDoTest link
      ```ts
      const package = new Package({deep});
      const handleDoTest = await package["HandleDoTest"].name;
      ```
      */
      public "HandleDoTest" = this.createEntity("HandleDoTest");

}

export type PackageOptions = Omit<BasePackageOptions, 'name'>;
