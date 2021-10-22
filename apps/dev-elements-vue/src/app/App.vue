<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-title>Elements Vue</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-item v-for="(p, i) in menus" :key="i" router-direction="root" :router-link="p.url">
              <ion-label>{{ p.title }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>
      <!-- <ion-router-outlet id="main-content"></ion-router-outlet> -->
      <div id="main-content" style="flex: 1">
        <router-view />
      </div>
    </ion-split-pane>
  </ion-app>
</template>
<script lang="ts">
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';

const selectedIndex = ref(0);

const menus = [
  {
    title: 'Code Editor',
    url: '/code-editor',
    icon: 'link'
  },
  {
    title: 'Elements Editor',
    url: '/elements-editor',
    icon: 'link'
  },
  {
    title: 'Elements Preview',
    url: '/elements-preview',
    icon: 'link'
  },
  {
    title: 'Text Editor',
    url: '/text-editor',
    icon: 'link'
  }
];

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonRouterOutlet,
    IonSplitPane
  },
  setup() {
    return {
      menus
    };
  }
});
</script>
<style scoped></style>
