import { CommonModule, DOCUMENT } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule, NgZone } from '@angular/core';

import {
  AiaoCodeDiffEditor,
  AiaoCodeEditor,
  AiaoElementsEditor,
  AiaoElementsForm,
  AiaoElementsPreview,
  AiaoElementsView,
  AiaoImg,
  AiaoTextEditor,
  AiaoTree
} from './directives/proxies';
import { initialize } from './elements-initialize';
import { AiaoElementsOptions } from './interface';
import { TextValueAccessor } from './providers/control-value-accessors/text-value-accessor';
import { AIAO_ELEMENTS_CONFIG } from './util/config';

const DECLARATIONS = [
  // components
  AiaoCodeDiffEditor,
  AiaoCodeEditor,
  AiaoElementsEditor,
  AiaoElementsPreview,
  AiaoElementsForm,
  AiaoElementsView,
  AiaoImg,
  AiaoTextEditor,
  AiaoTree,
  // accessor
  TextValueAccessor
];

@NgModule({
  imports: [CommonModule],
  declarations: DECLARATIONS,
  exports: DECLARATIONS
})
export class AiaoElementsModule {
  static forRoot(opts?: AiaoElementsOptions): ModuleWithProviders<AiaoElementsModule> {
    return {
      ngModule: AiaoElementsModule,
      providers: [
        {
          provide: AIAO_ELEMENTS_CONFIG,
          useValue: opts
        },
        {
          provide: APP_INITIALIZER,
          useFactory: initialize,
          multi: true,
          deps: [AIAO_ELEMENTS_CONFIG, DOCUMENT, NgZone]
        }
      ]
    };
  }
}
