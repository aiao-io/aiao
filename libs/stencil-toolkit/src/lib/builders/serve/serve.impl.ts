import { join, resolve } from 'path';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';

import { copyAssets } from '../../util/copy-assets';
import { run } from '../../util/runner';

export interface StencilServeOptions extends JsonObject {
  outputPath: string;
  config: string;
  assets: any[];
}

export default createBuilder<StencilServeOptions>(stencilServe);

function stencilServe(options: StencilServeOptions, context: BuilderContext): Observable<BuilderOutput> {
  const { config: config_path, assets } = options;
  const { workspaceRoot, target } = context;
  if (!target) {
    throw new Error('项目不存在');
  }
  const args = ['build', `--config ${join(workspaceRoot, config_path)}`, '--dev', '--watch', '--serve'];
  const cmd = resolve(workspaceRoot, 'node_modules/.bin/stencil');

  return from(context.getProjectMetadata(target.project)).pipe(
    switchMap(({ root }) => {
      return copyAssets(assets, [join(workspaceRoot, `${root}`)], workspaceRoot);
    }),
    switchMap(() => run(cmd, args)),
    map(() => ({ success: true }))
  );
}
