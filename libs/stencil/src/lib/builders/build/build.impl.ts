import { readJson, removeSync } from 'fs-extra';
import { join, resolve } from 'path';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import { OutputTargetDist } from '@stencil/core/dist/declarations';

import { copyAssets } from './copy-assets';
import { requireConfigFile } from './load-ts-config-file';
import { run } from './runner';

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

      const distOutputTargetDir = distOutputTarget.dir || 'dist';
      const esmLoaderPath = distOutputTarget.esmLoaderPath;
      const projectRoot = resolve(workspaceRoot, projectConfig.root);
      const distPath = resolve(projectRoot, distOutputTargetDir);
      const output = resolve(workspaceRoot, outputPath);
      const distOutputPath = resolve(workspaceRoot, outputPath, distOutputTargetDir);

      const loaderPath = resolve(distPath, esmLoaderPath);
      const loaderOutPath = resolve(workspaceRoot, outputPath, distOutputTargetDir, esmLoaderPath);

      const assets = [
        {
          glob: '**/*',
          input: distPath,
          output: distOutputPath
        },
        {
          glob: 'package.json',
          input: projectRoot,
          output
        },
        {
          glob: '**/*',
          input: loaderPath,
          output: loaderOutPath
        }
      ];

      console.log('assets', assets);
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
