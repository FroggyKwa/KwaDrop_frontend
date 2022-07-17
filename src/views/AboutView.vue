<template>
  <header-view></header-view>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <footer-view></footer-view>
</template>
<script lang="ts">
import HeaderView from '@/components/header.vue';
import FooterView from '@/components/footer.vue';

export default {
  components: {
    HeaderView,
    FooterView,
  },
  title: 'About',
};
</script>
<style lang="sass">

</style>
