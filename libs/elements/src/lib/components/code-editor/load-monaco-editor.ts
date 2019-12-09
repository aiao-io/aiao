export class LoadMonacoEditor {
  protected _load: Promise<void>;
  constructor(private baseUrl = '/assets/monaco') {}

  load() {
    if (!this._load) {
      this._load = new Promise<void>((resolve: any) => {
        const win = window as any;
        if (typeof win.monaco === 'object') {
          resolve();
          return;
        }

        const onGotAmdLoader: any = () => {
          win.require.config({ paths: { vs: `${this.baseUrl}/vs` } });
          win.require(['vs/editor/editor.main'], () => resolve());
        };

        if (!win.require) {
          const loaderScript: HTMLScriptElement = document.createElement('script');
          loaderScript.type = 'text/javascript';
          loaderScript.src = `${this.baseUrl}/vs/loader.js`;
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
