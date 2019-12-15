import { readJson, readJSONSync, removeSync, statSync } from 'fs-extra';
import { join, resolve } from 'path';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';

import { copyAssets } from '../../util/copy-assets';
import { runCommandAsync } from '../../util/runner';

export interface StencilBuildOptions extends JsonObject {
  config: string;
  outputPath: string;
  stats?: boolean;
  docs?: boolean;
}

export default createBuilder<StencilBuildOptions>(stencilBuild);

function stencilBuild(options: StencilBuildOptions, context: BuilderContext): Observable<BuilderOutput> {
  const { config: config_path, docs, outputPath, stats } = options;
  const {
    workspaceRoot,
    target: { project }
  } = context;

  return from(readJson(join(workspaceRoot, 'angular.json'))).pipe(
    map(c => c.projects[project]),
    switchMap(projectConfig => {
      const args = ['build', `--config ${join(workspaceRoot, config_path)}`];
      if (docs) {
        args.push('--docs');
      }
      if (stats) {
        args.push('--stats');
      }
      const cmd = resolve(workspaceRoot, 'node_modules/.bin/stencil');
      return runCommandAsync(`${cmd} ${args.join(' ')}`).then(() => {
        if (!outputPath) {
          return;
        }
        const projectRoot = resolve(workspaceRoot, projectConfig.root);
        const projectPkg = readJSONSync(resolve(projectRoot, 'package.json'));
        const output = resolve(workspaceRoot, outputPath);
        const assets = [];
        projectPkg.files.forEach((file: string) => {
          const fp = resolve(projectRoot, file);
          const stat = statSync(fp);
          const fileIsInProject = fp.includes(projectRoot);
          const input = fileIsInProject ? projectRoot : workspaceRoot;
          const filePath = fp.replace(input + '/', '');
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
