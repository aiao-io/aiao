import type { IImageStorage } from '@aiao/image-storage';

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

  // INTERNAL configs
  _testing?: boolean;
  _zoneGate?: (h: () => any) => any;
  _ael?: (el: any, name: string, cb: any, opts: any) => any;
  _rel?: (el: any, name: string, cb: any, opts: any) => any;
}
