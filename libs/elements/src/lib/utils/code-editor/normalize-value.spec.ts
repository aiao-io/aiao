import { normalizeMonacoEditorValue, normalizeMonacoEditorValueOut } from './normalize-value';

describe('normalizeMonacoEditorValue', () => {
  it('json', () => {
    const val = { a: 1 };
    const jsonString = normalizeMonacoEditorValue('json', val);
    expect(JSON.parse(jsonString)).toEqual(val);
  });

  it('default', () => {
    const val = { a: 1 };
    const jsonString = normalizeMonacoEditorValue('js', val);
    expect(jsonString).toEqual(val);
  });

  it('out', () => {
    const val = { a: 1 };
    const jsonObject = normalizeMonacoEditorValueOut('json', JSON.stringify(val));
    expect(jsonObject).toEqual(val);
  });
  it('out', () => {
    const val = undefined;
    const jsonObject = normalizeMonacoEditorValueOut('json', val);
    expect(jsonObject).toEqual(val);
  });
});
