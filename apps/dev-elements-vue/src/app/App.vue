<template>
  <ion-app>
    <ion-split-pane contentId="mainContent">
      <ion-menu contentId="mainContent" type="overlay">
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
            <ion-item v-for="(p, i) in menus" :key="i" routerDirection="root" :routerLink="p.url">
              <ion-label>{{ p.title }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>
      <!-- <ion-router-outlet id="mainContent"></ion-router-outlet> -->
      <div id="mainContent" style="flex: 1">
        <router-view />
      </div>
    </ion-split-pane>
  </ion-app>
</template>
<script lang="ts">
import { IonApp, IonContent, IonItem, IonLabel, IonList, IonMenu, IonSplitPane } from '@ionic/vue';
import { defineComponent } from 'vue';

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
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
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
