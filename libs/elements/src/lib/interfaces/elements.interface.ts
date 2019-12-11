import { IImageStorage } from '@aiao/image-storage';

import { IDomSanitizer } from './context.interface';

export interface IAiaoContexts {
  domSanitizer?: IDomSanitizer;
  imageStorage?: IImageStorage;
}

export interface IAiaoElementsConfig extends IAiaoContexts {
  codeEditorBaseUrl?: string;
  animated?: boolean;
  resourcesUrl?: string;
  _testing?: boolean;
  _zoneGate?: (h: () => any) => any;
}
