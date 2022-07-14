<template>
  <header-view></header-view>
  <h1 class="display-1">NOT FOUND 404</h1>
  <footer-view></footer-view>
</template>

<script>
import HeaderView from '@/components/header.vue';
import FooterView from '@/components/footer.vue';

export default {
  components: { FooterView, HeaderView },

  title: 'Page not found <404>',
  name: 'NotFoundView',
};
</script>

<style scoped lang="sass">
h1
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
</style>
