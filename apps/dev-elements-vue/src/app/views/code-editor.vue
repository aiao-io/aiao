<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Code Editor</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen scrollEvents="false" scrollX="false" scrollY="false">
      <aiao-code-editor language="json" :value="data"></aiao-code-editor>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AiaoCodeEditor } from '@aiao/elements-vue';
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
      src: 'https://image-demo.oss-cn-hangzhou.aliyuncs.com/example.jpg'
    }
  }
];
import { IonButtons, IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/vue';

export default defineComponent({
  components: {
    AiaoCodeEditor,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar
  },
  setup() {
    return { data };
  }
});
</script>
<style scoped></style>
