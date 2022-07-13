<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card id="playlist" :elevation="isHovering? 16: 2" v-bind="props"
            class="d-flex flex-column info-card">
      <perfect-scrollbar>
        <h1>Current playlist:</h1>
        <ul class="playlist">
          <draggable
            :list="songs"
            :disabled="!enabled"
            item-key="name"
            ghost-class="ghost"
            :move="checkMove"
            @start="dragging = true"
            @end="dragging = false"
          >
            <template #item="{ element }">
              <div class="song-item d-flex flex-row"
                   :class="{ 'not-draggable': !enabled, 'textarea': NowPlaying }">
                <v-tooltip location="bottom">
                  <template #activator = {props}>
                    <v-badge avatar
                             bordered
                             overlap
                             v-bind="props"
                    >
                      <avatar-view :image="element.cover_image"></avatar-view>
                    </v-badge>
                  </template>
                  <span>{{element.user.name}}</span>
                </v-tooltip>
                <v-hover v-slot="{ isHovering, props }">
                  <marquee-text :duration="10" v-bind="props" :paused="isHovering" :reverse="true"
                                :repeat="2">
                    <span class="song-name">{{ element.name }}</span>
                  </marquee-text>
                </v-hover>
                <div v-if="element.id !== NowPlaying">
                  <v-card-actions class="action-buttons">
                    <v-btn id="ban-btn" class="anger-buttons" variant="outlined"
                           :loading="loading[1]"
                           :disabled="loading[1]" @click="load(1)" icon elevation="0">
                      <font-awesome-icon size="xl" icon="fa-regular fa-trash-can"/>
                    </v-btn>
                    <v-btn id="kick-btn" class="light-green-text" variant="outlined"
                           :loading="loading[2]"
                           :disabled="loading[2]"
                           @click="load(2)" icon elevation="0">
                      <font-awesome-icon size="xl" icon="fa-solid fa-arrow-up"/>
                    </v-btn>
                    <v-btn id="kick-btn" class="light-green-text" variant="outlined"
                           :loading="loading[3]"
                           :disabled="loading[3]"
                           @click="load(3)" icon elevation="0">
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
      songs: [
        {
          id: 0,
          link: 'string',
          status: 0,
          name: 'BTS: Dynamite 2022',
          cover_image: 'https://img.youtube.com/vi/ATIFWDTjKM8/hqdefault.jpg',
          user: {
            id: 0,
            avatar: 'https://img.youtube.com/vi/ATIFWDTjKM8/hqdefault.jpg',
            name: 'string',
            session_id: 'string',
          },
        },
        {
          id: 1,
          link: 'string',
          status: 0,
          avatar: 'https://img.youtube.com/vi/ATIFWDTjKM8/hqdefault.jpg',
          name: 'BTS: Dynamite 2020',
          cover_image: 'https://img.youtube.com/vi/ATIFWDTjKM8/hqdefault.jpg',
          user: {
            id: 0,
            name: 'string',
            session_id: 'string',
          },
        },
        {
          id: 1,
          link: 'string',
          status: 0,
          name: 'BTS: Dynamite 2020',
          cover_image: 'https://img.youtube.com/vi/ATIFWDTjKM8/hqdefault.jpg',
          user: {
            id: 0,
            name: 'string',
            session_id: 'string',
          },
        },
      ],
      dragging: false,
    };
  },
  props:
    {
      NowPlaying: Number,
    },
  computed: {
    draggingInfo() {
      return this.dragging ? 'under drag' : '';
    },
  },
  methods: {
    checkMove(event) {
      window.console.log(`Future index: ${event.draggedContext.futureIndex}`);
    },
    load(i) {
      this.loading[i] = true;
      // eslint-disable-next-line no-return-assign
      setTimeout(() => (this.loading[i] = false), 3000);
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
