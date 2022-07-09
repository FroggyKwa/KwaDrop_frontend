<template>
  <header-view app-bar-title="room name">
    <template #profile-info>
      <v-col>
        <avatar-view tooltip_place="bottom" image="@/assets/logo.png" username="Hello World"></avatar-view>
      </v-col>
    </template>
    <user-list></user-list>
  </header-view>
  <user-list></user-list>
  <div id="player">
    <audio-player :option="{
      src: current_video.link,
      title: current_video.title,
      coverImage: current_video.cover_image,
    }"></audio-player>
  </div>
  <footer-view></footer-view>
</template>

<script lang="ts">
import AudioPlayer from 'vue3-audio-player';
import HeaderView from '@/components/header.vue';
import AvatarView from '@/components/avatar.vue';
import FooterView from '@/components/footer.vue';
import UserList from '@/components/user_list.vue';

export default {
  name: 'RoomView',
  components: {
    UserList,
    FooterView,
    AvatarView,
    HeaderView,
    AudioPlayer,
  },
  data() {
    return {
      current_video: {
        link: 'https://www.youtube.com/watch?v=ZQR0OCczRWM&ab_channel=VladMishustin',
        title: 'BTS ',
        cover_image: 'https://secretmag.ru/thumb/1200x0/filters:quality(75):no_upscale()/imgs/2022/06/16/06/5452378/f29a30e7f02e6e9e9ae31d17e795367aa0f703bd.jpg',
      },
    };
  },
};
</script>

<style scoped lang="sass">
@import "@/assets/css/variables.sass"
@import 'vue3-audio-player/dist/style.css'

.audio__player
  position: inherit
  margin: 10em

</style>
