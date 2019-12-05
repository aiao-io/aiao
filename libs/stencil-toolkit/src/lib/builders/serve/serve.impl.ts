import { join, resolve } from 'path';
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
  const cmd = resolve(workspaceRoot, 'node_modules/.bin/stencil');
  return from(run(cmd, args)).pipe(map(() => ({ success: true })));
}
