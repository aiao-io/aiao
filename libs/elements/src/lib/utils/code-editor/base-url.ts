import { config } from '../../global/config';

export const BASE_MONACO_URL = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.20.0/min';

/**
 * 获取默认 monaco 编辑器资源链接
 * @param baseUrl 默认url
 */
export const getBaseMonacoUrl = (baseUrl?: string) => baseUrl || config.get('codeEditorBaseUrl') || BASE_MONACO_URL;
