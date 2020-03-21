import { normalizeMonacoEditorOptions } from './normalize-options';

describe('normalizeMonacoEditorValue', () => {
  it('json', () => {
    const opts = normalizeMonacoEditorOptions({}, undefined, 'json', 123);
    console.log(opts);
  });
});
