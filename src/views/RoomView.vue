<template>
  <header-view>
    <template #profile-info>
      <v-col>
        <avatar-view tooltip_place="bottom" image="@/assets/logo.png"
                     username="Hello World"></avatar-view>
      </v-col>
    </template>
  </header-view>
  <div class="d-flex justify-space-between">
    <user-list></user-list>
    <div id="room-info-content" class="d-flex flex-column align-center">
      <room-name :name="room_name"></room-name>
      <room-id-input></room-id-input>
    </div>
  </div>
  <footer-view></footer-view>
  <audio-player :option="{
      src: current_video.link,
      title: current_video.title,
      coverImage: current_video.cover_image,
    }"></audio-player>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AudioPlayer from 'vue3-audio-player';
import HeaderView from '@/components/header.vue';
import AvatarView from '@/components/avatar.vue';
import FooterView from '@/components/footer.vue';
import UserList from '@/components/user_list.vue';
import RoomName from '@/components/RoomName.vue';
import RoomIdInput from '@/components/RoomIdInput.vue';

export default defineComponent({
  name: 'RoomView',
  components: {
    RoomIdInput,
    RoomName,
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
      room_name: 'Room name',
    };
  },
});
</script>

<style scoped lang="sass">
@import "@/assets/css/variables.sass"
@import 'vue3-audio-player/dist/style.css'

.audio__player
  position: initial
  margin:
    bottom: 4em
  width: 100%
#room-info-content
  margin: 30px 100px 0 0
</style>
