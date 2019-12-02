import { readFileSync } from 'fs';
import { resolve } from 'path';
import ts from 'typescript';

import { Config } from '@stencil/core';

// copy from @stencil/core

interface NodeModuleWithCompile extends NodeModule {
  _compile(code: string, filename: string): any;
}

function convertSourceConfig(sourceText: string, configFilePath: string) {
  if (configFilePath.endsWith('.ts')) {
    // looks like we've got a typed config file
    // let's transpile it to .js quick
    sourceText = transpileTypedConfig(sourceText, configFilePath);
  } else {
    // quick hack to turn a modern es module
    // into and old school commonjs module
    sourceText = sourceText.replace(/export\s+\w+\s+(\w+)/gm, 'exports.$1');
  }

  return sourceText;
}

export function requireConfigFile(configFilePath: string): Config {
  // ensure we cleared out node's internal require() cache for this file
  delete require.cache[resolve(configFilePath)];

  // let's override node's require for a second
  // don't worry, we'll revert this when we're done
  // tslint:disable-next-line: deprecation
  require.extensions['.ts'] = (module: NodeModuleWithCompile, filename: string) => {
    let sourceText = readFileSync(filename, { encoding: 'utf8' });
    sourceText = convertSourceConfig(sourceText, filename);
    module._compile(sourceText, filename);
  };

  // let's do this!
  const config = require(configFilePath);

  // all set, let's go ahead and reset the require back to the default
  // tslint:disable-next-line: deprecation
  require.extensions['.ts'] = undefined;

  // good work team
  return config.config;
}

function transpileTypedConfig(sourceText: string, filePath: string) {
  // let's transpile an awesome stencil.config.ts file into
  // a boring stencil.config.js file

  const opts: ts.TranspileOptions = {
    fileName: filePath,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      esModuleInterop: true,
      target: ts.ScriptTarget.ES5
    },
    reportDiagnostics: false
  };

  const output = ts.transpileModule(sourceText, opts);

  return output.outputText;
}
