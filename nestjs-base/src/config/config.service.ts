import { Injectable, Inject } from '@nestjs/common';
import fs from 'node:fs';
import path from 'node:path';
import dotEnv from 'dotenv';
import { EnvConfig } from './config.interface';
import { CONFIG_OPTIONS } from 'src/constants/config';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(@Inject(CONFIG_OPTIONS) private options: Record<string, any>) {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
    this.envConfig = dotEnv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
