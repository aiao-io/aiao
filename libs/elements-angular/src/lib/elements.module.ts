import { IAiaoElementsConfig } from '@aiao/elements';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ModuleWithProviders, NgModule, APP_INITIALIZER, NgZone } from '@angular/core';

import {
  AiaoCodeEditor,
  AiaoElementsEditor,
  AiaoElementsEditorPreview,
  AiaoElementsForm,
  AiaoElementsView,
  AiaoImg
} from './directives/proxies';
import { AIAO_ELEMENTS_CONFIG } from './providers/config';
import { initialize } from './elements-initialize';

const DECLARATIONS = [
  AiaoCodeEditor,
  AiaoElementsEditor,
  AiaoElementsEditorPreview,
  AiaoElementsForm,
  AiaoElementsView,
  AiaoImg
];

@NgModule({
  imports: [CommonModule],
  declarations: DECLARATIONS,
  exports: DECLARATIONS
})
export class AiaoElementsModule {
  static forRoot(config?: IAiaoElementsConfig): ModuleWithProviders {
    return {
      ngModule: AiaoElementsModule,
      providers: [
        {
          provide: AIAO_ELEMENTS_CONFIG,
          useValue: config
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
