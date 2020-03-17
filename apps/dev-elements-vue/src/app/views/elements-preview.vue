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
            :value="data"
            @change="formChange($event)"
          ></aiao-code-editor>
          <aiao-code-editor class="editor-item" language="json" :value="config"></aiao-code-editor>
        </form>
        <aiao-elements-preview id="preview" :value="data" :config="config"></aiao-elements-preview>
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
  data: () => ({ config, data }),
  methods: {
    formChange: e => {
      console.log(e.data);
    }
  }
});
</script>
