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
      <aiao-code-editor language="json" :value="state.data"></aiao-code-editor>
    </ion-content>
  </div>
</template>

<style scoped></style>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
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
  setup() {
    const state = reactive({
      data
    });
    return {
      state
    };
  }
});
</script>
