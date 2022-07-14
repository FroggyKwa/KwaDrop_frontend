<template>
  <v-footer id="test" app bottom absolute padless class="footer">
    <v-row
      justify="center"
      no-gutters
    >
      <slot></slot>
      <v-col class="text-center mt-4">
        <v-btn
          v-for="link in links"
          :key="link"
          variant="text"
          class="mx-2"
          rounded
        >
          {{ link }}
        </v-btn>
      </v-col>
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

<style lang="sass">
body
  min-height: 100vh
  margin: 0
  position: relative

body::after
  content: ''
  display: block
  height: 100px

footer
  position: absolute
  bottom: 0
  width: 100%
  height: 20px
  background: rgb(0, 0, 0)

</style>
