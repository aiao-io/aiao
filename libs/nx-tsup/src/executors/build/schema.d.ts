export interface BuildExecutorSchema {
  main: string;
  outputPath: string;
  tsConfig: string;
  packageJson: string;
  assets?: any[];
}


export interface NormalizedBuildExecutorSchema  extends BuildExecutorSchema {
  root: string;
  sourceRoot: string;
  projectRoot: string;

}
