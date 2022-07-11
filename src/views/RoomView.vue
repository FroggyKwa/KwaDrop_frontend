<template>
  <header-view>
    <template #profile-info>
      <v-col>
        <avatar-view tooltip_place="bottom" image="@/assets/logo.png"
                     username="Hello World"></avatar-view>
      </v-col>
    </template>
    <template #search-bar>
      <div id="search-bar" class="d-flex flex-row justify-center">
        <search-input
          placeholder="Click here to add music ..."
          type="search"
          v-model="searchValue"
          search-icon="false"
          clear-icon="true"
          shortcut-icon="false"
          hide-shortcut-icon-on-blur="true"
          blur-on-esc="true"
          select-on-focus="false"
          shortcut-listener-enabled="true"
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
  <div class="d-flex justify-space-between">
    <user-list></user-list>
    <v-hover v-slot="{ isHovering, props }">
      <v-card id="room-info-content" :elevation="isHovering? 16: 2" v-bind="props"
              class="d-flex flex-column info-card align-center">
        <room-name :name="room_name"></room-name>
        <room-id-input></room-id-input>
        <open-room-settings-btn></open-room-settings-btn>
        <div class="help-text-wrapper align-self-center">
          <p id="help-text">Here you can configure your room!</p>
        </div>
      </v-card>
    </v-hover>
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
import AvatarView from '@/components/avatar.vue';
import FooterView from '@/components/footer.vue';
import UserList from '@/components/user_list.vue';
import RoomName from '@/components/RoomName.vue';
import RoomIdInput from '@/components/RoomIdInput.vue';
import SearchInput from '@/components/searchInput/SearchInput.vue';
import openRoomSettingsBtn from '@/components/openRoomSettingsView.vue';

const searchValue = ref('');

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
    SearchInput,
    openRoomSettingsBtn,
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

#room-info-content
  margin: 0px 100px 0 0
  padding: 40px

.search-input-wrapper
  width: 60%

#search-bar
  width: 100%

.help-text-wrapper
  margin-top: 3.6em

  #help-text
    font:
      size: 2em
      weight: 700
    color: $dark-green

</style>
