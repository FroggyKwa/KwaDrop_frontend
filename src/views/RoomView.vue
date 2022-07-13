<template>
  <header-view>
    <template #profile-info>
      <v-col>
        <avatar-tooltip-view tooltip_place="bottom" image="@/assets/logo.png"
                     username="Hello World"></avatar-tooltip-view>
      </v-col>
    </template>
    <template #search-bar>
      <div id="search-bar" class="d-flex flex-row justify-center">
        <search-input
          placeholder="Click here to add music ..."
          type="search"
          v-model="searchValue"
          :search-icon="false"
          :clear-icon="true"
          shortcut-icon="false"
          :hide-shortcut-icon-on-blur="true"
          :blur-on-esc="true"
          :select-on-focus="false"
          :shortcut-listener-enabled="true"
        >
        </search-input>
        <v-btn @click="queryVideo">
          <font-awesome-icon size="xl" icon="fa-solid fa-magnifying-glass"/>
        </v-btn>
      </div>
    </template>
  </header-view>
  <v-btn icon to="/" size="x-large" class="light-green-text ml-10 mb-16 d-inline-flex">
    <font-awesome-icon size="2xl" icon="fa-solid fa-house"/>
  </v-btn>
  <div class="d-flex justify-space-between flex-sm-column flex-md-row">
    <user-list></user-list>
    <playlist-view :now-playing="now_playing"></playlist-view>
    <room-configuration :room_name="room_name"></room-configuration>
  </div>
  <footer-view>
    <audio-player :option="{
      src: current_video.link,
      title: current_video.title,
      coverImage: current_video.cover_image,
    }"></audio-player>
  </footer-view>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AudioPlayer from 'vue3-audio-player';
import HeaderView from '@/components/header.vue';
import AvatarTooltipView from '@/components/AvatarTooltip.vue';
import FooterView from '@/components/footer.vue';
import UserList from '@/components/user_list.vue';
import SearchInput from '@/components/searchInput/SearchInput.vue';
import RoomConfiguration from '@/components/RoomConfiguration.vue';
import PlaylistView from '@/components/PlaylistView.vue';

const searchValue = ref('');

export default defineComponent({
  name: 'RoomView',
  components: {
    PlaylistView,
    RoomConfiguration,
    UserList,
    FooterView,
    AvatarTooltipView,
    HeaderView,
    AudioPlayer,
    SearchInput,
  },
  data() {
    return {
      current_video: {
        link: 'https://www.youtube.com/watch?v=ZQR0OCczRWM&ab_channel=VladMishustin',
        title: 'BTS ',
        cover_image: 'https://secretmag.ru/thumb/1200x0/filters:quality(75):no_upscale()/imgs/2022/06/16/06/5452378/f29a30e7f02e6e9e9ae31d17e795367aa0f703bd.jpg',
      },
      room_name: 'Room name',
      searchValue,
      now_playing: 1,
    };
  },
  methods: {
    queryVideo() {
      // pass
    },
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
  &:after
    content: ''
    width: 100%
    margin-top: 30px
    border: 1px solid darken($white-accent, 7%)
    position: absolute
    left: 0
    top: 55%
    z-index: 1

.search-input-wrapper
  width: 60%

#search-bar
  width: 100%
</style>
