import { Provider } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { ANGULAR_UNIVERSAL_OPTIONS } from './constants';
import { setupUniversal } from './utils';
import { NgUniversalFastifyOptions } from './interface';

export const angularUniversalProviders: Provider[] = [
  {
    provide: 'UNIVERSAL_INITIALIZER',
    useFactory: (host: HttpAdapterHost, options: NgUniversalFastifyOptions) =>
      host && host.httpAdapter && setupUniversal(host.httpAdapter.getInstance(), options),
    inject: [HttpAdapterHost, ANGULAR_UNIVERSAL_OPTIONS]
  }
];
