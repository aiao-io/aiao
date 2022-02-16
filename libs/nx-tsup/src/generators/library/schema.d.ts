export interface NxTsupGeneratorSchema {
  name: string;
  directory?: string;
  skipFormat?: boolean;
  tags?: string;
  simpleModuleName?: boolean;
  skipTsConfig?: boolean;
  unitTestRunner?: 'jest' | 'none';
  linter?: Linter;
  testEnvironment?: 'jsdom' | 'node';
  importPath?: string;
  js?: boolean;
  pascalCaseFiles?: boolean;
  strict?: boolean;
  buildable?: boolean;
  setParserOptionsProject?: boolean;
  config?: 'workspace' | 'project' | 'npm-scripts';
  compiler?: Compiler;
  skipTypeCheck?: boolean;
}
