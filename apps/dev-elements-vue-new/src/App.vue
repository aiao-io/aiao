<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import { AiaoElementsVue } from '@aiao/elements-vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    AiaoElementsVue,
    IonRouterOutlet
  }
});
</script>
