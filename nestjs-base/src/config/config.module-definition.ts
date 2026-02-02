import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './config.module-definition-base';
import { ConfigService } from './config.service';

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModuleDefinition extends ConfigurableModuleClass {}
