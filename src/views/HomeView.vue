<template>
  <header-view app-bar-title="KwaDrop" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import HeaderView from '@/components/header.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    HeaderView,
  },
});
</script>
