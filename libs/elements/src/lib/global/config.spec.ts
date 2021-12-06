import { config } from './config';

describe('config', () => {
  it('config', () => {
    const codeEditorBaseUrl = 'codeEditorBaseUrl';
    config.reset({ codeEditorBaseUrl });
    expect(config.get(codeEditorBaseUrl)).toEqual(codeEditorBaseUrl);
  });
});
