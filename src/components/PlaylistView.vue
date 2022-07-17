<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card id="playlist" :elevation="isHovering? 16: 2" v-bind="props"
            class="d-flex flex-column info-card">
      <perfect-scrollbar>
        <h1>Current playlist: <span>{{
            songs_count
          }} {{ songs_count > 1 || songs_count === 0 ? 'songs' : 'song' }}</span></h1>
        <ul class="playlist">
          <draggable
            :list="songs"
            :disabled="!enabled"
            item-key="id"
            @change="onSongListChange"
            ghost-class="ghost"
            @start="dragging = true"
            @end="dragging = false"
          >
            <template #item="{ element }">
              <div class="song-item d-flex flex-row"
                   :class="{ 'not-draggable': element.status === 1}">
                <v-tooltip location="bottom">
                  <template #activator={props}>
                    <v-badge
                      :color="element.status === 1? '#56b882' :'transparent'"
                      bordered
                      overlap
                      v-bind="props"
                    >
                      <avatar-view :image="element.avatar"></avatar-view>
                    </v-badge>
                  </template>
                  <span>{{ element.user.name }}</span>
                </v-tooltip>
                <v-hover v-slot="{ isHovering, props }">
                  <marquee-text :duration="5" v-bind="props" :paused="isHovering"
                                :repeat="4">
                    <span class="song-name">{{ element.title }}</span>
                  </marquee-text>
                </v-hover>
                <div v-if="element.status !== 1">
                  <v-card-actions class="action-buttons">
                    <v-btn id="delete-btn" class="anger-buttons" variant="outlined"
                           :loading="loading[1]"
                           :disabled="loading[1]" @click="clickTrashBin(element.queue_num)"
                           icon elevation="0">
                      <font-awesome-icon size="xl" icon="fa-regular fa-trash-can"/>
                    </v-btn>
                    <v-btn id="arrow-up" class="light-green-text" variant="outlined"
                           :loading="loading[2]"
                           :disabled="loading[2] || songs.indexOf(element) === 0"
                           @click="upArrowClick(element.queue_num)" icon elevation="0">
                      <font-awesome-icon size="xl" icon="fa-solid fa-arrow-up"/>
                    </v-btn>
                    <v-btn id="arrow-down" class="light-green-text" variant="outlined"
                           :loading="loading[3]"
                           :disabled="loading[3] || songs.indexOf(element) === songs.length - 1"
                           @click="downArrowClick(element.queue_num)" icon elevation="0">
                      <font-awesome-icon size="xl" icon="fa-solid fa-arrow-down"/>
                    </v-btn>
                  </v-card-actions>
                </div>
              </div>
            </template>
          </draggable>
        </ul>
      </perfect-scrollbar>
    </v-card>
  </v-hover>
</template>

<script>
import { defineComponent } from 'vue';
import draggableComponent from 'vuedraggable';
import MarqueeText from 'vue-marquee-text-component';
import AvatarView from '@/components/avatar.vue';
import ApiService from '@/api/api-service';

export default defineComponent({
  name: 'PlaylistView',
  components:
    {
      AvatarView,
      MarqueeText,
      draggable: draggableComponent,
    },
  data() {
    return {
      loading: [],
      enabled: true,
      songs: [],
      dragging: false,
    };
  },
  props:
    {
      songsListToRoom: Function,
    },
  computed: {
    draggingInfo() {
      return this.dragging ? 'under drag' : '';
    },
    songs_count() {
      return this.songs.length;
    },
  },
  methods: {
    onSongListChange(data) {
      const [song_old, song_new] = [this.songs[data.moved.oldIndex], this.songs[data.moved.newIndex]];
      ApiService.swapSongs(song_old.queue_num, song_new.queue_num);
    },
    upArrowClick(queue_num) {
      this.loading[2] = true;
      ApiService.swapSongs(queue_num, queue_num - 1);
    },
    downArrowClick(queue_num) {
      this.loading[3] = true;
      ApiService.swapSongs(queue_num, queue_num + 1);
    },
    getSongs() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      ApiService.getPlaylist()
        .then((response) => {
          self.songs = response.data.songs;
          this.songsListToRoom(this.songs);
          return self.songs;
        });
    },
    clickTrashBin(queue_num) {
      ApiService.deleteSong(queue_num);
      this.loading[1] = true;
    },
  },
  mounted() {
    this.getSongs();
    setInterval(() => (this.getSongs()), 5000);
  },

  watch: {
    songs(newArr, oldArr) {
      if (oldArr.length > newArr.length) {
        this.loading[1] = false;
      } else if (oldArr.length === newArr.length) {
        this.loading[2] = false;
        this.loading[3] = false;
      }
    },
  },
});
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
<style scoped lang="sass">
@import "@/assets/css/variables.sass"
ul
  list-style: none

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

.ghost
  opacity: 0.5
  background: lighten($light-green, 10%)
  color: $not-white

.not-draggable
  cursor: no-drop

#playlist
  min-height: 30em
  min-width: 30em
  margin: 4em

.action-buttons
  border: 3px dashed $white-accent
    radius: 20px

.anger-buttons
  color: $danger-color
  background-color: transparent

</style>
