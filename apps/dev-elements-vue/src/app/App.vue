<template>
  <div class="ion-page">
    <div class="page">
      <div class="pane-left">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-title>Elements Vue</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list class="pane-left">
            <ion-item :class="{ selected: currentLocation.path === m.url }" v-for="m in menus" :href="m.url">
              <ion-icon v-if="m.icon" slot="start" :name="m.icon"></ion-icon>
              <ion-label>{{ m.title }} </ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<style scoped>
.pane-left {
  width: 300px;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.13);
}
.content {
  width: 100%;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  position: relative;
  z-index: 0;
  box-shadow: none !important;
}
.page {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}
</style>

<script lang="ts">
import { defineComponent, inject, computed } from 'vue';
import { useRoute } from 'vue-router';

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
  data: () => ({ menus }),

  setup() {
    const route = useRoute();
    const router = inject('router');
    const currentLocation = computed(() => {
      const { ...rest } = route.value;
      return rest;
    });

    const state = inject('state');

    return {
      currentLocation,
      router,
      state
    };
  }
});
</script>
