import { readJson, readJSONSync, removeSync, statSync } from 'fs-extra';
import { join, resolve } from 'path';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import { OutputTargetDist } from '@stencil/core/dist/declarations';

import { copyAssets } from '../../util/copy-assets';
import { requireConfigFile } from '../../util/load-ts-config-file';
import { run } from '../../util/runner';

export interface StencilBuilderOptions extends JsonObject {
  config: string;
  outputPath: string;
  docs?: boolean;
}

export default createBuilder<StencilBuilderOptions>(stencilBuild);

function stencilBuild(options: StencilBuilderOptions, context: BuilderContext): Observable<BuilderOutput> {
  const { config: config_path, docs, outputPath } = options;
  const {
    workspaceRoot,
    target: { project }
  } = context;

  return from(readJson(join(workspaceRoot, 'angular.json'))).pipe(
    map(c => c.projects[project]),
    switchMap(projectConfig => {
      const args = ['build'];
      const configPath = join(workspaceRoot, config_path);
      args.push(`--config ${configPath}`);
      if (docs) {
        args.push('--docs');
      }
      const config = requireConfigFile(configPath);

      const distOutputTarget: OutputTargetDist = config.outputTargets.find(d => d.type === 'dist') as OutputTargetDist;

      const esmLoaderPath = distOutputTarget.esmLoaderPath;
      const projectRoot = resolve(workspaceRoot, projectConfig.root);
      const output = resolve(workspaceRoot, outputPath);

      const projectPkg = readJSONSync(resolve(projectRoot, 'package.json'));
      const files = projectPkg.files || [];
      const assets = [];

      files.forEach((file: string) => {
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
      if (esmLoaderPath.startsWith('../')) {
      }
      return run('node_modules/.bin/stencil', args)
        .then(() => {
          try {
            removeSync(output);
          } catch (error) {}
          return copyAssets(assets, [''], output);
        })
        .then(() => ({ success: true }));
    })
  );
}
