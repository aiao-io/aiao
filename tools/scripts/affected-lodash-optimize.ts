import Ora from 'ora';
import { exit } from 'process';
import { Project } from 'ts-morph';
import { argv } from 'yargs';

import { YargsAffectedOptions } from '@nrwl/workspace/src/command-line/run-tasks/affected';
import { parseFiles } from '@nrwl/workspace/src/command-line/shared';

const fixLodash = (...path: string[]) => {
  const ora = Ora();
  const project = new Project();
  project.addSourceFilesAtPaths(path);
  const sourceFiles = project.getSourceFiles(path);
  sourceFiles.forEach(file => {
    const imports = file.getImportDeclarations().filter(d => {
      const name = d
        .getModuleSpecifier()
        .getText()
        .replace(/^'|'$/g, '');
      return name === 'lodash';
    });

    if (imports.length > 0) {
      const filePath = file.getFilePath();
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
      ora.succeed(filePath);
    }
  });
  ora.stop();
};

export const autoFixLodash = async (conf: YargsAffectedOptions) => {
  const config = parseFiles(conf);
  const { files } = config;
  const needFiles = files.filter(
    d => d.endsWith('.ts') && !d.includes('e2e') && !d.includes('tools') && /(spec|po).ts$/.test(d) === false
  );
  if (needFiles.length > 0) {
    fixLodash(...needFiles);
  }
  exit();
};

autoFixLodash(argv);
