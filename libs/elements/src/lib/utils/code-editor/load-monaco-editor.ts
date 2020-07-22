import { urlJoin } from '@aiao/url';

/**
 * moaco 加载器
 */
export class LoadMonacoEditor {
  protected _load?: Promise<void>;
  protected supportLanguages = ['de', 'es', 'fr', 'it', 'ja', 'ko', 'ru', 'zh-cn', 'zh-tw'];

  constructor(private baseUrl: string, private localizeCode?: string) {}

  protected getLanguage() {
    const lang = navigator.language.toLocaleLowerCase();
    const findLang = this.supportLanguages.find(l => lang === l);
    return findLang || '';
  }

  load() {
    if (!this._load) {
      this._load = new Promise<void>((resolve: any) => {
        const win = window as any;
        if (typeof win.monaco === 'object') {
          resolve();
          return;
        }
        const onGotAmdLoader: any = () => {
          win.require.config({
            paths: { vs: urlJoin(this.baseUrl, '/vs') },
            'vs/nls': {
              availableLanguages: {
                '*': this.localizeCode || this.getLanguage()
              }
            }
          });
          win.require(['vs/editor/editor.main'], () => resolve());
        };
        if (!win.require) {
          const loaderScript: HTMLScriptElement = document.createElement('script');
          loaderScript.id = 'aiao-load-monaco-script';
          loaderScript.type = 'text/javascript';
          loaderScript.src = urlJoin(this.baseUrl, '/vs/loader.js');
          loaderScript.addEventListener('load', onGotAmdLoader);
          document.body.appendChild(loaderScript);
        } else {
          onGotAmdLoader();
        }
      });
    }
    return this._load;
  }
}
