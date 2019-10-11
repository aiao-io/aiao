import { Project } from 'ts-morph';

import { parseFiles } from '@nrwl/workspace/src/command-line/shared';

import { CommandBaseConfig } from './interface';

const findLodash = (...path: string[]) => {
  const project = new Project();
  project.addExistingSourceFiles(path);
  const sourceFiles = project.getSourceFiles(path);
  const findFiles = [];
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
      findFiles.push(filePath);
    }
  });
  return findFiles;
};

export const checkLodash = async (conf: CommandBaseConfig) => {
  const config = parseFiles(conf);
  const { files } = config;
  const needFiles = files.filter(
    d => d.endsWith('.ts') && !d.includes('e2e') && !d.includes('tools') && /(spec|po).ts$/.test(d) === false
  );
  if (needFiles.length > 0) {
    const findFiles = findLodash(...needFiles);
    if (findFiles.length > 0) {
      findFiles.forEach((f, i) => console.error(`${i} ${f}`));
      process.exit(1);
    }
  }
};
