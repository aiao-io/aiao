(function () {
  // test config
  const win = window;
  const aiao = (win.aiao = win.aiao || {});
  const elements = (aiao['elements'] = aiao['elements'] || {});

  const AIS = aiao['image-storage'];
  const ImageStorage = AIS.ImageStorage;
  const adapters = AIS.adapters;

  const imageStorage = new ImageStorage({
    defaultOptions: {
      format: 'src'
    },
    defaultAdapter: 'aliyun',
    adapters: [new adapters.aliyun.ImageStorageAdapterAliyun()]
  });
  elements.config = {
    resourcesUrl: '/dist/aiao-elements',
    imageStorage,
    codeEditorBaseUrl: '/vendors/monaco-editor'
  };
  if (window.location.search.indexOf('rtl=true') > -1) {
    document.documentElement.setAttribute('dir', 'rtl');
  }

  if (window.location.search.indexOf('ionic:_testing=true') > -1) {
    const style = document.createElement('style');
    style.innerHTML = `
* {
caret-color: transparent !important;
}`;
    document.head.appendChild(style);
  }

  window.Ionic = window.Ionic || {};
  window.Ionic.config = window.Ionic.config || {};
})();
