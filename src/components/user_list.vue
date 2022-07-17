<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card :elevation="isHovering? 16: 2" v-bind="props" id="users-list"
            class="d-flex flex-column info-card">
      <perfect-scrollbar>
        <v-card-title id="card-title" class="bold text-h6">
          {{ users_count }} users connected
        </v-card-title>
        <div class="user-item d-flex flex-row" :key="user.user.name" v-for="user in users">
          <avatar-view :class="{ 'rainbow': user.usertype === 0 }" id="avatar"
                       :image="user.user.avatar_url"
                       :username="user.user.name">
          </avatar-view>
          <span
            :class="{ 'light-green-text textarea':user.user.id === Number(user_id),  'rainbow': user.usertype === 0 }"
            class="bold user-item-username">{{ user.user.name }}
            <v-chip class="ma-2" v-if="user.user.id === Number(user_id)" color="#56b882">
              <v-avatar left>
                <v-icon color="#56b882">mdi-account-circle</v-icon>
              </v-avatar>
              You
            </v-chip>
          </span>
          <!--          <div v-if="user.user.id !== Number(user_id)">
                      <v-card-actions class="action-buttons">
                        <v-btn id="ban-btn" class="anger-buttons" variant="outlined" :loading="loading[1]"
                               :disabled="loading[1]" @click="load(1)" icon elevation="0">
                          <font-awesome-icon size="xl" icon="fa-solid fa-ban"/>
                        </v-btn>
                        <v-btn id="kick-btn" class="anger-buttons" variant="outlined" :loading="loading[2]"
                               :disabled="loading[2]"
                               @click="load(2)" icon elevation="0">
                          <font-awesome-icon icon="fa-solid fa-bolt-lightning"/>
                        </v-btn>
                      </v-card-actions>
                    </div>-->
        </div>
      </perfect-scrollbar>
    </v-card>
  </v-hover>
</template>

<script>
import AvatarView from '@/components/avatar.vue';
import ApiService from '@/api/api-service';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';

export default {
  room_name: 'UserList',
  components: {
    AvatarView,
    PerfectScrollbar,
  },
  data() {
    return {
      loading: [],
      users: [],
      user_id: localStorage.user_id,
    };
  },
  computed: {
    users_count() {
      return this.users.length;
    },
  },
  methods: {
    load(i) {
      this.loading[i] = true;
      // eslint-disable-next-line no-return-assign
      setTimeout(() => (this.loading[i] = false), 3000);
    },
    getUsers() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      ApiService.getRoommates()
        .then((response) => {
          self.users = response.data.users;
          return self.users;
        });
    },
  },
  mounted() {
    this.getUsers();
    setInterval(() => (this.getUsers()), 10000);
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
  margin: 4em
  min-height: 30em
  min-width: 30em

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
  color: $danger-color
  background-color: transparent

.user-item-username
  font-size: 1.2em
  letter-spacing: 1px
</style>
