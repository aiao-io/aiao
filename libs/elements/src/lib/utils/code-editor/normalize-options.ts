export const normalizeMonacoEditorOptions = (
  opts: monaco.editor.IStandaloneEditorConstructionOptions,
  uri: monaco.Uri,
  language: string,
  value: any
) => {
  const options = { ...opts };
  const hasModel = uri || language || value;
  if (hasModel) {
    const model = monaco.editor.getModel(uri || ('' as any));
    if (model) {
      options.model = model;
      options.model.setValue(value);
    } else {
      options.model = monaco.editor.createModel(value, language, uri);
    }
  }
  options.value = value;
  options.language = language;
  return options;
};
