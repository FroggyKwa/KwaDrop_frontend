<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card id="room-info-content" :elevation="isHovering? 16: 2" v-bind="props"
            class="d-flex flex-column info-card align-center">
      <room-name class="room-name" :name="room_name"></room-name>
      <room-id-input></room-id-input>
      <open-room-settings-btn></open-room-settings-btn>
      <div class="help-text-wrapper align-self-center">
        <p id="help-text">Here you can configure your room!</p>
      </div>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import RoomIdInput from '@/components/RoomIdInput.vue';
import RoomName from '@/components/RoomName.vue';
import openRoomSettingsBtn from '@/components/openRoomSettingsView.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RoomConfiguration',
  components:
    {
      RoomIdInput,
      RoomName,
      openRoomSettingsBtn,
    },
  props:
    {
      room_name: String,
    },
});
</script>

<style scoped lang="sass">
@import "@/assets/css/variables.sass"
#room-info-content
  margin: 4em
  min-width: 30em
  min-height: 30em
  padding: 30px

.help-text-wrapper
  margin-top: 3.6em

  #help-text
    font:
      size: 2em
      weight: 700
    color: $dark-green
</style>
