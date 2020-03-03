import { config } from '../../global/config';

export const getBaseUrl = (baseUrl: string) =>
  baseUrl || config.get('codeEditorBaseUrl') || 'https://cdn.jsdelivr.net/npm/monaco-editor@0.20.0/min';
