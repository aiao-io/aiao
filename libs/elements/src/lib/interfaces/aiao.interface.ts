import { IImageStorage } from '@aiao/image-storage';

import { IDomSanitizer } from './context.interface';

export interface IAiaoContexts {
  domSanitizer?: IDomSanitizer;
  imageStorage?: IImageStorage;
}

export interface IAiaoConfig extends IAiaoContexts {
  animated?: boolean;
  resourcesUrl?: string;
  persistConfig?: boolean;
  _testing?: boolean;
  _zoneGate?: (h: () => any) => any;
}
