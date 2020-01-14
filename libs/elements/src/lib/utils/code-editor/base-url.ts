import { config } from '../../global/config';

export const getBaseUrl = (baseUrl: string) => {
  return baseUrl || config.get('codeEditorBaseUrl') || 'https://cdn.jsdelivr.net/npm/monaco-editor@0.19.2/min';
};
