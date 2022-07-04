<template>
  <header-view app-bar-title="KwaDrop"/>
  <div id="logo-img-wrapper" class="d-flex justify-space-between flex-row">
    <v-img width="800" :src="svgLogo" alt="Logo" class="d-md-block d-none ml-16"></v-img>
    <div class="d-flex flex-column align-self-center mr-16">
      <div id="motive-wrapper" class="align-self-end">
        <p id="motive" class="justify-end">
          Light up your party with kwadrop! Let everyone decide what will play today!
        </p>
      </div>
      <span id="hidden-text" class="align-self-end">Start your <span class="rainbow">party</span> with us!
        <font-awesome-icon icon="fa-solid fa-balloons"/>
      </span>
      <v-btn class="button-primary mt-5 mb-5" depressed rounded block="true" to="create">
        Create room
      </v-btn>
      <span id="spacer-text" class="align-self-center">OR</span>
      <v-btn class="button-secondary mt-5" depressed rounded block="true" to="connect">
        Connect to existing room
      </v-btn>
      <!--TODO: что делают кнопки connect и create-->
    </div>
  </div>
  <footer-view></footer-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import HeaderView from '@/components/header.vue';
import FooterView from '@/components/footer.vue';

import svgLogo from '@/assets/logo.svg';

export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      svgLogo,
    };
  },

  components: {
    FooterView,
    HeaderView,
  },
});
</script>

<style lang="sass">
@import "@/assets/css/variables"
#logo-img-wrapper
  padding: 100px 100px 0 0

.button
  font:
    size: 2em
  padding: 1em 1em 1em 1em

.button-primary
  @extend .button
  color: $not-white !important
  background-color: $light-green

.button-secondary
  @extend .button
  color: $semi-gray !important
  background-color: $not-white

#spacer-text
  font:
    weight: 700
    size: 3em
  color: $dark-green

#motive-wrapper
  width: 60%
  margin-bottom: 2em

  #motive
    font:
      size: 3.6em
      weight: 700
    color: $dark-green

#hidden-text
  font:
    weight: 700
    size: 1.6em
  color: $light-gray

  .rainbow
    background: linear-gradient(to right, #ef5350, #f48fb1, #7e57c2, #2196f3, #26c6da, #43a047, #eeff41, #f9a825, #ff5722)
    -webkit-background-clip: text
    -webkit-text-fill-color: transparent

</style>
