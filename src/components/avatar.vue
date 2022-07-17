<template>
  <v-avatar id="avatar" :color="getRandomColor" size="90">
    <v-img
      :src="image"
      v-if="!image === false" alt=""></v-img>
    <span class="short-avatar-name" v-else>{{ FirstLetters() }}</span>
  </v-avatar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AvatarView',
  props: {
    image: String,
    username: String,
  },
  computed: {
    getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i += 1) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
  },
  methods: {
    FirstLetters(): string {
      if (this.username) {
        return this.username?.split(' ')
          .map((word) => word[0])
          .join('');
      }
      return '';
    },
  },
});
</script>

<style scoped lang="sass">
.short-avatar-name
  font:
    weight: 900
  margin: 2em
  color: #fff
  mix-blend-mode: difference

#avatar
  min-height: 72px !important
  min-width: 72px !important
</style>
