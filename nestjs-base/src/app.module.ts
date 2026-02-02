import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from 'src/config/config.module';
// import { ConfigModuleDefinition } from './config/config.module-definition';

@Module({
  // imports: [ConfigModule],
  imports: [
    ConfigModule.register({ folder: './config' }),
    // or alternatively:
    // ConfigModuleDefinition.registerAsync({
    //   useFactory: () => {
    //     return { folder: './config' };
    //   },
    //   inject: [...any extra dependencies...]
    // }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: 'ASYNC_CONNECTION',
    //   useFactory: async () => {
    //     const connection = await createConnection();
    //     return connection;
    //   },
    // },
    // 异步提供程序像其他任何提供程序一样，通过其令牌注入到其他组件中。在上面的示例中，您将使用@Inject('ASYNC_CONNECTION')构造。
  ],
})
export class AppModule {}
