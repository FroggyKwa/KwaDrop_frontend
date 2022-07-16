<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ApiService from '@/api/api-service';

export default defineComponent({
  room_name: 'App',

  data() {
    return {};
  },
  methods: {
    async initialize_session() {
      ApiService.whoami()
        .catch((response) => {
          if (response.response.status === 401) {
            localStorage.clear();
            ApiService.createSession()
              .catch((error) => {
                console.log(error);
                return false;
              })
              .then((data) => {
                if (!data) return;
                ApiService.whoami();
              });
          }
        });
    },
  },
  created() {
    this.initialize_session();
  },
});
</script>
<style lang="sass">
main
  padding: 0 !important
  margin: 0 !important

body
  min-width: 100vh
</style>
