import { join } from 'path';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';

import { run } from '../../util/runner';

export interface StencilServeOptions extends JsonObject {
  config: string;
}

export default createBuilder<StencilServeOptions>(stencilServe);

function stencilServe(options: StencilServeOptions, context: BuilderContext): Observable<BuilderOutput> {
  const { config: config_path } = options;
  const { workspaceRoot } = context;
  const args = ['build', `--config ${join(workspaceRoot, config_path)}`, '--dev', '--watch', '--serve'];
  const scri = run('node_modules/.bin/stencil', args);
  console.log('123');
  return from(scri).pipe(map(() => ({ success: true })));
}
