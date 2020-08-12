import { Provider } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { NEST_ANGULAR_UNIVERSAL_OPTIONS } from './constants';
import { NestUniversalOptions } from './interface';
import { setupUniversal } from './setup-universal';

export const angularUniversalProviders: Provider[] = [
  {
    provide: 'UNIVERSAL_INITIALIZER',
    useFactory: (host: HttpAdapterHost, options: NestUniversalOptions) =>
      host?.httpAdapter && setupUniversal(host.httpAdapter.getInstance(), options),
    inject: [HttpAdapterHost, NEST_ANGULAR_UNIVERSAL_OPTIONS]
  }
];
