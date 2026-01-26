// import { Module, DynamicModule } from '@nestjs/common';
// import { CreateDatabaseProviders } from './database.providers';
// import { ConnectionProviders } from './connection.provider';

// @Module({
//   providers: [ConnectionProviders],
//   exports: [ConnectionProviders],
// })
// export class DatabaseModule {
//   static forRoot(entities = [], options?): DynamicModule {
//     // const providers = CreateDatabaseProviders(entities, options);
//     // return {
//     //   global: true, // Make the module global
//     //   module: DatabaseModule,
//     //   providers: providers,
//     //   exports: providers,
//     // };
//   }
// }
