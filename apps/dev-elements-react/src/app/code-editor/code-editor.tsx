import './code-editor.scss';

import React from 'react';

import { AiaoCodeEditor } from '@aiao/elements-react';

export const CodeEditor = () => {
  return (
    <AiaoCodeEditor
      base-url="https://cdn.jsdelivr.net/npm/monaco-editor@0.19.2/min"
      language="typescript"
      value="const a = 'react';"
    ></AiaoCodeEditor>
  );
};

export default CodeEditor;
