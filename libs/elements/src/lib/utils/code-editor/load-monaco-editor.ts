import { urlJoin } from '@aiao/url';

/**
 * moaco 加载器
 */
export class LoadMonacoEditor {
  #load?: Promise<void>;
  protected supportLanguages = ['de', 'es', 'fr', 'it', 'ja', 'ko', 'ru', 'zh-cn', 'zh-tw'];

  constructor(private baseUrl: string, private localizeCode?: string) {}

  protected currentLanguage() {
    try {
      const lang = navigator.language.toLocaleLowerCase();
      const findLang = this.supportLanguages.find(l => lang === l) || '';
      if (lang && !findLang) {
        console.error(`not support language ${lang}`);
      }
      return findLang;
    } catch (error) {
      console.error(error);
      return '';
    }
  }

  load() {
    if (!this.#load) {
      this.#load = new Promise<void>(resolve => {
        const win = window as any;
        if (typeof win.monaco === 'object') {
          resolve();
          return;
        }
        const onGotAMDLoader = () => {
          win.require.config({
            paths: { vs: urlJoin(this.baseUrl, '/vs') },
            'vs/nls': {
              availableLanguages: {
                '*': this.localizeCode || this.currentLanguage()
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
          loaderScript.addEventListener('load', onGotAMDLoader);
          document.body.appendChild(loaderScript);
        } else {
          onGotAMDLoader();
        }
      });
    }
    return this.#load;
  }
}
