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
    <ion-content fullscreen scrollEvents="false" scrollX="false" scrollY="false">
      <aiao-text-editor :value="hello"></aiao-text-editor>
    </ion-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  setup() {
    const state = reactive({
      hello: '<p>hello world</p>'
    });
    return {
      ...toRefs(state)
    };
  }
});
</script>

<style scoped>
aiao-code-editor.form {
  width: 100%;
  height: 100%;
}
aiao-code-editor {
  height: 500px !important;
}
</style>
