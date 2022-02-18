import { build } from 'tsup';

import { ExecutorContext } from '@nrwl/devkit';

import { BuildExecutorSchema } from './schema';

export const sleep = (time: number) => new Promise<void>(resolve => setTimeout(() => resolve(), time));

export async function buildExecutor(options: BuildExecutorSchema, context: ExecutorContext) {
  console.log('options', options);
  const { main, outputPath, tsConfig } = options;

  const { sourceRoot, root } = context.workspace.projects[context.projectName!];
  if (!sourceRoot) {
    throw new Error(`${context.projectName} does not have a sourceRoot.`);
  }
  if (!root) {
    throw new Error(`${context.projectName} does not have a root.`);
  }

  await build({
    entry: [main],
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    outDir: outputPath,
    tsconfig: tsConfig
  });
  await sleep(10000);
  return {
    success: true
  };
}

export default buildExecutor;
