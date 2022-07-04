<template>
  <footer class="d-flex flex-row">
    <v-container class="d-flex flex-row justify-center">
      <span class="">
        Copyright <font-awesome-icon icon="fa-regular fa-copyright"/> KwaDrop 2022
      </span>
    </v-container>
  </footer>
</template>

<script lang="ts">
export default {
  name: 'FooterView',
};
</script>

<style scoped lang="sass">
@import "@/assets/css/variables"
footer
  background-color: $not-white
</style>
