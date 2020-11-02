import { readJSONSync, removeSync, statSync } from 'fs-extra';
import { join, resolve } from 'path';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';

import { copyAssets } from '../../util/copy-assets';
import { run } from '../../util/runner';

export interface StencilBuildOptions extends JsonObject {
  config: string;
  outputPath: string;
  stats: boolean;
  docs: boolean;
  assets: any[];
}

export default createBuilder<StencilBuildOptions>(stencilBuild);

function stencilBuild(options: StencilBuildOptions, context: BuilderContext): Observable<BuilderOutput> {
  const { config: config_path, docs, outputPath, stats, assets } = options;
  const { workspaceRoot, target } = context;
  if (!target) {
    throw new Error('项目不存在');
  }
  return from(context.getProjectMetadata(target.project)).pipe(
    map(projectConfig => {
      const { root } = projectConfig as any;
      const args = ['build', `--config ${join(workspaceRoot, config_path)}`];
      if (docs) {
        args.push('--docs');
      }
      if (stats) {
        args.push('--stats');
      }
      const cmd = resolve(workspaceRoot, 'node_modules/.bin/stencil');
      return { cmd, args, root };
    }),
    switchMap(({ cmd, args, root }) => {
      const runPromise = run(cmd, args);
      return runPromise.then(() => {
        if (!outputPath) {
          return;
        }
        const projectRoot = resolve(workspaceRoot, root);
        const projectPkg = readJSONSync(resolve(projectRoot, 'package.json'));
        const output = resolve(workspaceRoot, outputPath);
        projectPkg.files.forEach((file: string) => {
          const fp = resolve(projectRoot, file);
          const stat = statSync(fp);
          const fileIsInProject = fp.includes(projectRoot);
          const input = fileIsInProject ? projectRoot : workspaceRoot;
          const filePath = fp.replace(input, '').replace(/^\//, '').replace(/^\\/, '');
          if (stat.isDirectory()) {
            assets.push({
              glob: join(filePath, '**/*'),
              input,
              output
            });
          } else {
            assets.push({
              glob: filePath,
              input,
              output
            });
          }
        });
        try {
          removeSync(output);
        } catch {}
        return copyAssets(assets, [''], output);
      });
    }),
    map(d => ({ success: true }))
  );
}
