<template>
  <div>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Code Editor</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <form>
        <aiao-elements-editor :value="data" :config="config"></aiao-elements-editor>
      </form>
    </ion-content>
  </div>
</template>

<style scoped>
aiao-code-editor.form {
  width: 100%;
  height: 100%;
}
aiao-code-editor {
  height: 500px !important;
}
</style>

<script>
import { defineComponent } from 'vue';

const config = [
  {
    tag: 'h1',
    innerText: true,
    defaultOptions: {
      innerText: 'h1h1h1h1'
    }
  }
];
const data = [
  {
    tag: 'ion-button',
    innerText: 'button',
    class: {
      a: true
    },
    attributes: {
      mode: 'ios'
    },
    style: {
      minWidth: '200px'
    }
  },
  {
    tag: 'h1'
  },
  {
    tag: 'div',
    children: [
      {
        tag: 'h1',
        innerText: 'true'
      }
    ]
  },
  {
    tag: 'aiao-img',
    attributes: {
      src: 'http://image-demo.oss-cn-hangzhou.aliyuncs.com/example.jpg'
    }
  }
];

export default defineComponent({
  data: () => ({ config, data })
});
</script>
