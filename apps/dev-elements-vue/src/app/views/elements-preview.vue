<template>
  <div>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Elements Preview</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <div class="container">
        <form class="editor">
          <aiao-code-editor
            class="editor-item"
            language="json"
            name="data"
            :value="state.data"
            @input="setData($event)"
          ></aiao-code-editor>
          <aiao-code-editor
            class="editor-item"
            language="json"
            name="config"
            :value="state.config"
            @input="setConfig($event)"
          ></aiao-code-editor>
        </form>
        <aiao-elements-preview id="preview" :value="state.data" :config="state.config"></aiao-elements-preview>
      </div>
    </ion-content>
  </div>
</template>

<style scoped>
.editor {
  width: 50%;
  height: 100%;
}

.editor-item {
  width: 100%;
  height: 50%;
}

#preview {
  flex: 1;
  margin-left: 20px;
}

.container {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>

<script>
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

import { defineComponent, reactive } from 'vue';
export default defineComponent({
  setup() {
    const state = reactive({
      config,
      data
    });

    const setConfig = e => {
      state.config = JSON.parse(e.target.value);
    };
    const setData = e => {
      // state.data = JSON.parse(e.target.value);
    };

    return {
      state,
      setData,
      setConfig
    };
  },
  methods: {}
});
</script>
