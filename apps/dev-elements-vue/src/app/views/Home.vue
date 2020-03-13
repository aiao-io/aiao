<template>
  <div>{{ hw }}</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  data: () => ({
    hw: 'hello world'
  })
});
</script>
