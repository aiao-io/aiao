import { config } from '../../global/config';
import { BASE_MONACO_URL, getBaseMonacoUrl } from './base-url';

describe('getBaseMonacoUrl', () => {
  it('BASE_MONACO_URL', () => {
    const url = getBaseMonacoUrl();
    expect(url).toEqual(BASE_MONACO_URL);
  });

  it('baseUrl', () => {
    const url = getBaseMonacoUrl('aaa');
    expect(url).toEqual('aaa');
  });

  it('codeEditorBaseUrl', () => {
    config.reset({});
    config.set('codeEditorBaseUrl', 'bbb');
    const url = getBaseMonacoUrl();
    expect(url).toEqual('bbb');
  });
});
