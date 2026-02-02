// import { Inject, Injectable } from '@nestjs/common';
// import {connection} from "./connection"

// @Injectable()
// export class CustomRepository {
//   constructor(@Inject('CONNECTION') connection: Connection) {}
// }

// const configFactory = {
//   provide: 'CONFIG',
//   useFactory: () => {
//     return process.env.NODE_ENV === 'development' ? devConfig : prodConfig;
//   },
// };

// @Module({
//   providers: [configFactory],
// })
// export class AppModule {}

// const connectionFactory = {
//   provide: 'CONNECTION',
//   useFactory: (optionsProvider: OptionsProvider) => {
//     const options = optionsProvider.get();
//     return new DatabaseConnection(options);
//   },
//   inject: [OptionsProvider],
// };

// @Module({
//   providers: [connectionFactory],
//   exports: ['CONNECTION'],
// })
// export class AppModule {}

// const connectionFactory = {
//   provide: 'CONNECTION',
//   useFactory: (optionsProvider: OptionsProvider) => {
//     const options = optionsProvider.get();
//     return new DatabaseConnection(options);
//   },
//   inject: [OptionsProvider],
// };

// @Module({
//   providers: [connectionFactory],
//   exports: [connectionFactory],
// })
// export class AppModule {}
