<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="end">
        <ion-button @click="$emit('onClose')">CLOSE MODAL</ion-button>
      </ion-buttons>
      <ion-title>About Modal</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <h1>THIS IS MY MODAL</h1>
  </ion-content>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { IonContent, IonButton, IonButtons, IonBackButton, IonHeader, IonTitle, IonToolbar } from '@ionic/vue';
export default defineComponent({
  name: 'AboutModal',
  components: {
    IonHeader,
    IonButton,
    IonButtons,
    IonBackButton,
    IonContent,
    IonTitle,
    IonToolbar
  },
  emits: ['onClose'],
  setup: () => {}
});
</script>
