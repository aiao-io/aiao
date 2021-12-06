import { LoadMonacoEditor } from './load-monaco-editor';

describe('LoadMonacoEditor', () => {
  it('called', () => {
    const loader = new LoadMonacoEditor('/');
    const loaderSpy = jest.spyOn(loader, 'load');
    loader.load();
    expect(loaderSpy).toHaveBeenCalled();
  });
});
