<template>
  <v-tooltip :location="tooltip_place" transition="scroll-y-transition" v-model="showTooltip">
    <template #activator="{props}">
      <v-avatar v-bind="props" :color="getRandomColor" size="72">
        <v-img
          :src="('https://www.kaleido.ai/packs/media/images/ukraine_dove-b9f00234cf153bae7c4e6bc5331a043e.png')"
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
  name: 'AvatarView',
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
      FirstLetters(): string {
        return this.username!.split(' ')
          .map((word) => word[0])
          .join('');
      },
    },
  computed:
    {
      getRandomColor() {
        return `#${Math.floor(Math.random() * 16777215)
          .toString(16)}`;
      },
    },
});

</script>

<style lang="sass">
.short-avatar-name
  font:
    size: 2em
    weight: 900
  margin: 2em
</style>
