import { Observable } from 'rxjs';

import { FeatureDetects } from './modernizr.interface';
import { IBrowser, ICPU, IDevice, IEngine, IOS } from './ua.interface';

export interface IPlatform {
  ua: string;
  feature: FeatureDetects;
  browser: IBrowser;
  device: IDevice;
  engine: IEngine;
  os: IOS;
  cpu: ICPU;
  // 浏览器切换 tab
  visibilitychange$: Observable<boolean>;
  // 浏览器关闭前 https://developer.mozilla.org/zh-CN/docs/Web/API/BeforeUnloadEvent
  beforeunload$: Observable<BeforeUnloadEvent>;
  online$: Observable<boolean>;
}
