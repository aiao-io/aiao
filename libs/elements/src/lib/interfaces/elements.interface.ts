import { IImageStorage } from '@aiao/image-storage';

import { IDomSanitizer } from './context.interface';

/**
 * 环境支持
 */
export interface IAiaoContexts {
  domSanitizer?: IDomSanitizer;
  imageStorage?: IImageStorage;
}

/**
 * 配置
 */
export interface IAiaoElementsConfig extends IAiaoContexts {
  codeEditorBaseUrl?: string;
  animated?: boolean;
  resourcesUrl?: string;
  _testing?: boolean;
  _zoneGate?: (h: () => any) => any;
}
