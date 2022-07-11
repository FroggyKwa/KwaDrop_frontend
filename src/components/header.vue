<template>
  <v-app-bar absolute="true" density="compact" shrink-on-scroll id="bar" elevation="0">
    <v-btn v-ripple="false" @click="drawer = !drawer"
           class="d-flex d-sm-none">
      <font-awesome-icon id="dropdown-caret-icon" size="2x" icon="fa-solid fa-caret-down"/>
    </v-btn>
    <router-link to="/">
      <div id="logo">KwaDrop</div>
    </router-link>
      <slot name="search-bar"></slot>
    <v-container class="d-none d-sm-block">
      <v-row class="float-end nav-buttons align-center">
        <v-col v-for="item in items" :key="item">
          <router-link to="about">{{ item }}</router-link>
        </v-col>
        <slot name="profile-info"></slot>
      </v-row>
    </v-container>
  </v-app-bar>
  <v-navigation-drawer color="$not-white" v-model="drawer" absolute temporary>
    <v-item-group id="left-menu">
      <v-list-item v-for="item in items" :key="item">
        <v-list-item-title>
          <router-link :to="`/${item.toLowerCase()}`" class="left-menu-item">{{
              item
            }}
          </router-link>
        </v-list-item-title>
      </v-list-item>
    </v-item-group>
  </v-navigation-drawer>
</template>
<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderView',

  data() {
    return {
      drawer: false,
      items: ['About', 'Contacts'],
    };
  },
});
</script>

<style scoped lang="sass">
@import "../assets/css/variables"

header
  margin:
    bottom: 3em !important
  position: inherit !important

#logo
  font:
    family: Rajdhani
    weight: 900
    size: 3em
  letter-spacing: 10px
  color: $light-green

v-app-bar-title
  overflow: unset

#bar
  background-color: #fbfbfb
  padding: 3em

.nav-buttons
  font:
    size: 1.5em
    family: Rajdhani
  letter-spacing: 2px
  color: $light-green

#left-menu
  padding-top: 7em

#dropdown-caret-icon
  color: $dark-green

.left-menu-item
  color: $dark-green
  font:
    family: Rajdhani
    size: 1.2rem !important
    weight: 500

</style>
