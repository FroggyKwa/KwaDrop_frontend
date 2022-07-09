<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card :elevation="isHovering? 16: 2" v-bind="props" id="users-list"
            class="d-flex flex-column">
      <perfect-scrollbar>
        <v-card-title class="bold text-h6">Users:</v-card-title>
        <div class="user-item d-flex flex-row" :key="user.username" v-for="user in users">
          <avatar-view id="avatar" tooltip_place="end" :image="user.avatar_url"
                       :username="user.username"></avatar-view>
          <v-card-actions class="action-buttons">
            <v-btn class="anger-buttons" variant="outlined" :loading="loading[1]"
                   :disabled="loading[1]" @click="load(1)" icon elevation="0">
              <font-awesome-icon size="xl" icon="fa-solid fa-ban"/>
            </v-btn>
            <v-btn class="anger-buttons" variant="outlined" :loading="loading[2]" :disabled="loading[1]"
                   @click="load(2)" icon elevation="0">
              <font-awesome-icon icon="fa-solid fa-bolt-lightning"/>
            </v-btn>
          </v-card-actions>
        </div>
      </perfect-scrollbar>
    </v-card>
  </v-hover>
</template>

<script>
import AvatarView from '@/components/avatar.vue';

export default {
  name: 'UserList',
  components: { AvatarView },
  data() {
    return {
      users: [
        {
          username: 'FroggyKwa',
          avatar_url: 'https://www.kaleido.ai/packs/media/images/ukraine_dove-b9f00234cf153bae7c4e6bc5331a043e.png',
        },
        {
          username: 'Den Bakushev',
          // avatar_url: 'https://www.kaleido.ai/packs/media/images/ukraine_dove-b9f00234cf153bae7c4e6bc5331a043e.png',
        },
      ],
      loading: [],
    };
  },
  methods: {
    load(i) {
      this.loading[i] = true;
      // eslint-disable-next-line no-return-assign
      setTimeout(() => (this.loading[i] = false), 3000);
    },
  },
};
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
@import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
@import "@/assets/css/variables.sass"

#users-list
  display: inline-flex !important
  flex-direction: column
  margin:
    left: 4em
  padding: 10px
  width: 30em
  height: 20em
  border-radius: 30px 5px 30px 5px
  background-color: $not-white

.ps
  height: inherit
  width: inherit

.user-item
  align-items: center
  margin: 30px
  justify-content: space-between

#avatar
  font-weight: 900
  font-size: 3em

.action-buttons
  border: 3px dashed $white-accent
    radius: 20px

.anger-buttons
  color: #c86a70
  background-color: transparent
  margin-left: auto

</style>
