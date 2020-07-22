import Ora from 'ora';
import { exit } from 'process';
import { Project } from 'ts-morph';
import yargs from 'yargs';

import { getAffectedFiles } from '../util/get-affected-files';
import { prettierSync } from '../util/pretter';

/**
 * 改变 ts 文件夹 lodash 导入方式，达到缩小 lodash 方法最小目的；
 * import { isString } from 'lodash'; 代码会变成 import isString from 'lodash/isString';
 * @param path ts 文件路径
 */
// TODO: angular 9 ivy 已经可以正常树摇 lodash, 待进一步测试
const fixLodash = (paths: string[], mode: 'check' | 'write' = 'check') => {
  const ora = Ora();
  const project = new Project();
  project.addSourceFilesAtPaths(paths);
  const sourceFiles = project.getSourceFiles(paths);
  const findFiles: string[] = [];
  sourceFiles.forEach(file => {
    const imports = file.getImportDeclarations().filter(d => {
      const name = d.getModuleSpecifier().getText().replace(/^'|'$/g, '');
      return name === 'lodash';
    });

    if (imports.length > 0) {
      const filePath = file.getFilePath();
      if (mode === 'write') {
        imports.forEach(d => {
          d.getNamedImports().forEach(e => {
            const name = e.getName();
            file.addImportDeclaration({
              defaultImport: name,
              moduleSpecifier: `lodash/${name}`
            });
          });
        });
        imports.forEach(imp => imp.remove());
        file.saveSync();
      }
      ora.succeed(filePath);
      findFiles.push(filePath);
    }
  });
  ora.stop();
  return findFiles;
};

const options = yargs.option('mode', { type: 'string', choices: ['check', 'write'], default: 'check' }).argv;

const autoFixLodash = async () => {
  const { mode } = options;
  const files = await getAffectedFiles(options);
  const needFiles = files.filter(
    d =>
      d.endsWith('.ts') &&
      !d.endsWith('.d.ts') &&
      !d.includes('e2e') &&
      !d.includes('tools') &&
      /(spec|po).ts$/.test(d) === false
  );

  if (needFiles.length > 0) {
    const fixFiles = fixLodash(needFiles, mode as any);
    if (fixFiles.length > 0) {
      switch (mode) {
        case 'write':
          prettierSync(fixFiles);
          break;
        case 'check':
          fixFiles.forEach((f, i) => console.error(`${i} ${f}`));
          process.exit(1);
      }
    }
  }
};

// ts-node --project ./tools/tsconfig.tools.json -r tsconfig-paths/register tools/scripts/affected-lodash --mode=write
autoFixLodash().then(() => exit());
