import { NgSetupOptions } from '@aiao/universal-fastify-engine';

// 配置文件
export interface NestUniversalOptions extends NgSetupOptions {
  production: boolean;
  disableRender?: boolean;
  // only production false
  browserHost?: string;
  browserPort?: number;
}
