import { IImageStorage } from '@aiao/image-storage';

import { IDomSanitizer } from './context.interface';
import { IPlatformService } from './platform.interface';

export interface ILoger {
  log(value: any, ...rest: any[]): void;
  warn(value: any, ...rest: any[]): void;
  error(error: Error): void;
}

export interface IAiaoContexts {
  domSanitizer?: IDomSanitizer;
  imageStorage?: IImageStorage;
  platformService?: IPlatformService;
}

export interface IAiaoConfig extends IAiaoContexts {
  animated?: boolean;
  resourcesUrl?: string;
  logger?: ILoger;
  persistConfig?: boolean;
  _testing?: boolean;
  _zoneGate?: (h: () => any) => any;
}
