<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  room_name: 'App',

  data() {
    return {
    };
  },
});
</script>
<style lang="sass">
main
  padding: 0 !important
  margin: 0 !important

body
  min-width: 100vh
  //min-height: 100vh
</style>
