import type { DynamicModule, ForwardReference, Provider, Type } from '@nestjs/common';

export interface IEnvironment {
  production: boolean;
  appEnv?: 'dev' | 'sta' | 'prod' | string;
  port: number;
  imports: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>;
  providers: Provider[];
  controllers: Type<any>[];
}
