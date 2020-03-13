<template>
  <h1>Hello Vue 3!</h1>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'App',
  setup() {
    const route = useRoute();
    const currentLocation = computed(() => {
      const { matched, ...rest } = route.value;
      return rest;
    });
    const state = inject('state');

    return {
      currentLocation,
      state
    };
  }
});
</script>
