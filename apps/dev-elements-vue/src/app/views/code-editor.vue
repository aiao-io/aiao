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
      <aiao-code-editor base-url="assets/monaco" language="json"></aiao-code-editor>
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

export default defineComponent({});
</script>
