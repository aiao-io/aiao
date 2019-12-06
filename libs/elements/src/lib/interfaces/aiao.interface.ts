import { IDomSanitizer } from './context.interface';
import { IImageStoragePlugin } from './img.interface';
import { IPlatformService } from './platform.interface';

export interface IAiaoContexts {
  domSanitizer?: IDomSanitizer;
  imageStorage?: IImageStoragePlugin;
  platformService?: IPlatformService;
}

export interface ILoger {
  log(value: any, ...rest: any[]): void;
  warn(value: any, ...rest: any[]): void;
  error(error: Error): void;
}

export interface IAiaoConfig extends IAiaoContexts {
  animated?: boolean;
  resourcesUrl?: string;
  logger?: ILoger;
  persistConfig?: boolean;
  _testing?: boolean;
  _zoneGate?: (h: () => any) => any;
}
