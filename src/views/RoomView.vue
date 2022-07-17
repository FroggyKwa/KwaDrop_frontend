<template>
  <header-view>
    <template #profile-info>
      <v-col>
        <avatar-tooltip-view tooltip_place="bottom" :image="getImg(this.current_user.avatar)"
                             :username="this.current_user.name"></avatar-tooltip-view>
      </v-col>
    </template>
    <template #search-bar>
      <div id="search-bar" class="d-flex flex-row justify-between">
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
        <Modal v-model="search_modal" title="Choose song:">
          <div id="form-wrapper">
            <perfect-scrollbar>
              <div class="songs" :key="song.id" v-for="song in search_results">
                <div class="song-item d-flex flex-row">
                  <avatar-view :image="song.img"></avatar-view>
                  <v-hover v-slot="{ isHovering, props }">
                    <marquee-text :duration="5" v-bind="props" :paused="isHovering" :repeat="4">
                      <span class="song-name">{{ song.title }}</span>
                    </marquee-text>
                  </v-hover>
                  <v-btn class="button-primary ml-4 mr-4" type="button"
                         @click="searchClick(song.link)">
                    Choose
                  </v-btn>
                </div>
              </div>
            </perfect-scrollbar>
          </div>
        </Modal>
        <v-btn @click="searchClick">
          <font-awesome-icon size="xl" icon="fa-solid fa-magnifying-glass"/>
        </v-btn>
      </div>
    </template>
  </header-view>
  <v-btn icon @click="api.disconnect" to="/" size="x-large"
         class="light-green-text ml-10 mb-16 d-inline-flex">
    <font-awesome-icon size="2xl" icon="fa-solid fa-house"/>
  </v-btn>
  <div class="d-flex justify-space-between flex-sm-column flex-md-row">
    <user-list :get-img="getImg" :users-list-to-room="getUsers"></user-list>
    <playlist-view :songs-list-to-room="getSongs"></playlist-view>
    <room-configuration :room_name="room_name"></room-configuration>
  </div>
  <audio-player @ended="onSongEnded" :option="{
      src: current_song.link,
      title: current_song.title,
      coverImage: current_song.cover_image,
    }"></audio-player>
  <footer-view>
  </footer-view>
</template>

<script>
import { defineComponent } from 'vue';
import AudioPlayer from 'vue3-audio-player';
import HeaderView from '@/components/header.vue';
import AvatarTooltipView from '@/components/AvatarTooltip.vue';
import FooterView from '@/components/footer.vue';
import UserList from '@/components/user_list.vue';
import SearchInput from '@/components/searchInput/SearchInput.vue';
import RoomConfiguration from '@/components/RoomConfiguration.vue';
import PlaylistView from '@/components/PlaylistView.vue';
import ApiService from '@/api/api-service';
import VueModal from '@kouts/vue-modal';
import AvatarView from '@/components/avatar.vue';
import MarqueeText from 'vue-marquee-text-component';

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
    Modal: VueModal,
    MarqueeText,
    AvatarView,
  },
  data() {
    return {
      search_results: [],
      search_modal: false,
      current_song: {
        link: '',
        title: '',
        cover_image: '',
      },
      current_user: {},
      room_name: localStorage.room_name,
      searchValue: '',
      users: [],
      songs: [],
      api: ApiService,
      user_id: localStorage.user_id,
      host_id: localStorage.host_id,
    };
  },
  title() {
    return `Room ${localStorage.room_id}`;
  },
  props: {
    room_id: {
      type: Number,
      required: true,
    },
  },

  methods: {
    searchClick(url) {
      if (url) {
        ApiService.addSong(url).then((response) => console.log(response));
        this.search_modal = false;
      }
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      try {
        ApiService.addSong(this.searchValue)
          .then((response) => {
            if (response.response.status === 449) {
              self.search_results = response.response.data;
              this.search_modal = true;
            }
          });
      } catch (e) {
        // console.log(e);
      }
    },
    getImg(url) {
      return `http://localhost:7721/get_img?path=${url}`;
    },
    onSongEnded() {
      this.loadSongsToPlayer();
    },
    getUsers(value) {
      this.users = value;
      for (let i = 0; i < value.length; i += 1) {
        if (String(value[i].user.id) === localStorage.user_id) {
          this.current_user = value[i].user;
        }
      }
      this.room_name = this.users[0].room.name;
    },
    getSongs(value) {
      this.songs = value;
      if (this.current_song.link === '') {
        this.loadSongsToPlayer();
      }
    },
    loadSongsToPlayer() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      if (this.songs.length) {
        ApiService.PlayNext()
          .then((song_response) => {
            self.current_song.link = song_response.data.link;
            self.current_song.title = song_response.data.title;
            self.current_song.cover_image = song_response.data.avatar;
          });
      }
    },
  },

  beforeRouteEnter(to, from, next) {
    if (to.params.room_id !== localStorage.getItem('host_room')) {
      try {
        ApiService.disconnect();
      } catch (error) {
        console.log(error);
      }
      if (localStorage.user_id !== 'null') {
        const data = ApiService.connectToRoom(to.params.room_id, localStorage.room_password)
          .then((result) => {
            if (result.status !== 200) {
              next({ name: 'home' });
            } else {
              next();
            }
          });
      } else {
        next({ name: 'home' });
      }
    } else {
      next();
    }
  },
  beforeRouteLeave(to, from, next) { // todo: if host => delete room
    const answer = window.confirm('Do you really want to leave? You will be disconnected!');
    if (answer) {
      next();
    } else {
      next(false);
    }
    ApiService.disconnect();
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

.search-input-wrapper
  width: 60%

#search-bar
  width: 100%

.ps
  height: 30em
  width: inherit

.song-item
  font-size: 1.3em
  cursor: move
  padding-bottom: 20px
  margin:
    top: 2em
    left: 2em
    right: 2em
  border-bottom: 1px solid $white-accent
  justify-content: space-between
  align-items: center
  gap: 30px
  white-space: nowrap

#playlist
  min-height: 30em
  min-width: 30em
  margin: 4em
</style>
