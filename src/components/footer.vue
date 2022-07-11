<template>
    <v-footer app bottom absolute padless class="footer">
      <v-row
        justify="center"
        no-gutters
      >
        <v-btn
          v-for="link in links"
          :key="link"
          variant="text"
          class="mx-2"
          rounded
        >
          {{ link }}
        </v-btn>
        <v-col
          class="text-center mt-4"
          cols="12"
        >
          <font-awesome-icon icon="fa-regular fa-copyright"/>
          {{ new Date().getFullYear() }} — <strong>KwaDrop</strong>
        </v-col>
      </v-row>
    </v-footer>
</template>

<script lang="ts">
export default {
  name: 'FooterView',
  data: () => ({
    links: [
      'Home',
      'About Us',
      'Team',
      'Services',
      'Blog',
      'Contact Us',
    ],
  }),
};
</script>

<style scoped lang="sass">
@import "@/assets/css/variables"
.footer
  margin-top: 3em
  background-color: $not-white
  color: $dark-green
</style>
