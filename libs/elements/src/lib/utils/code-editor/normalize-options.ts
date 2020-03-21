import { editor, Uri } from 'monaco-editor';
/**
 * 正常化 monaco 默认配置
 * @param opts 配置
 * @param uri url
 * @param language 语言
 * @param value 值
 */
export const normalizeMonacoEditorOptions = (
  opts: editor.IStandaloneEditorConstructionOptions,
  uri: Uri,
  language: string,
  value: any
) => {
  const options = { ...opts };
  const hasModel = uri || language || value;
  if (hasModel) {
    const model = editor.getModel(uri || ('' as any));
    if (model) {
      options.model = model;
      options.model.setValue(value);
    } else {
      options.model = editor.createModel(value, language, uri);
    }
  }
  options.value = value;
  options.language = language;
  return options;
};
