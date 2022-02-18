export interface BuildExecutorSchema {
  main: string;
  outputPath: string;
  tsConfig: string;
  packageJson: string;
  assets?: any[];
}
