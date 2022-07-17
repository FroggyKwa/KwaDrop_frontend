<template>
  <div id="room-id-wrapper" class="copy-link d-flex">
    <label for="copy-link-input">RoomID
      <input ref="roomIdInput"
             id="copy-link-input"
             type="text"
             class="copy-link-input"
             :value="room_id"
             readonly
             @focusin="$event.target.select()"
      >
    </label>
    <v-btn size="large" icon type="button" :disabled="!copyButton_status" class="copy-link-button" @click="copyRoomId">
      <font-awesome-icon size="2xl" icon="fa-solid fa-copy"></font-awesome-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RoomIdInput',
  data() {
    return {
      room_id: localStorage.room_id,
      copyButton_status: true,
    };
  },
  methods: {
    copyRoomId(event: any) {
      const roomIdInput = this.$refs.roomIdInput as HTMLInputElement;
      navigator.clipboard.writeText(roomIdInput.value);
      roomIdInput.classList.toggle('light-green-text');
      this.copyButton_status = false;
      // eslint-disable-next-line no-return-assign
      setTimeout(() => {
        this.copyButton_status = true;
        roomIdInput.classList.toggle('light-green-text');
      }, 500);
    },
  },
});
</script>

<style scoped lang="sass">
@import "@/assets/css/variables.sass"
.copy-link-input
  flex-grow: 1
  padding: 8px
  border: 2px solid $white-accent
  border-radius: 10px
  font-size: 1.4rem
  outline: none
  cursor: pointer
  margin:
    left: 1em
    right: 1em

.copy-link-button
  color: $light-green
  outline: none

#room-id-wrapper
  margin-top: 30px

#room-id-wrapper label
  font-size: 1.4em

</style>
