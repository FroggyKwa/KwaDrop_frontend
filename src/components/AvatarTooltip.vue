<template>
  <v-tooltip :location="tooltip_place" transition="scroll-y-transition" v-model="showTooltip">
    <template #activator="{props}">
      <v-avatar id="avatar" v-bind="props" :color="getRandomColor" size="72">
        <v-img
          :src="image"
          v-if="!image === false" alt=""></v-img>
        <span class="short-avatar-name" v-else>{{ FirstLetters() }}</span>
      </v-avatar>
    </template>
    <span>{{ username }}</span>
  </v-tooltip>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AvatarTooltipView',
  data() {
    return {
      showTooltip: false,
    };
  },
  props:
    {
      username: String,
      image: String,
      tooltip_place: String,
    },
  methods:
    {
      FirstLetters(): string | undefined {
        return this.username?.split(' ').map((word) => word[0]).join('');
      },
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
});

</script>

<style scoped lang="sass">
.short-avatar-name
  font:
    size: 1em
    weight: 900
  margin: 2em
  color: #fff
  mix-blend-mode: difference

#avatar
  min-height: 72px !important
  min-width: 72px !important
</style>
