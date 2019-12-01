import { Observable } from 'rxjs';

import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonArray, JsonObject } from '@angular-devkit/core';

export interface StencilBuilderOptions extends JsonObject {
  config: string;
  outputPath: string;
  watch?: boolean;
  prerender?: boolean;
  debug?: boolean;
  serve?: boolean;
  dev?: boolean;
  assets?: JsonArray;
}

export default createBuilder<StencilBuilderOptions>(run);

function run(options: StencilBuilderOptions, context: BuilderContext): Observable<BuilderOutput> {
  console.log(options, context);
  return null;
}
