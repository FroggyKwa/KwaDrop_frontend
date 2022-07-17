<template>
  <h1 id="room-name"
      :class="{ 'error-detected':is_incorrect_room_name }"
      class="green-border bold textarea light-green-text text-h2"
      contenteditable
      spellcheck="false"
      @keydown.enter.stop="onEnterRoomName"
      @click="selectText"
      @input="onInputHandler"
  >
    {{ current_room_name }}
  </h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ApiService from '@/api/api-service';

export default defineComponent({
  name: 'RoomName',
  data() {
    return {
      is_incorrect_room_name: false,
      last_correct_name: localStorage.room_name,
      current_room_name: localStorage.room_name,
    };
  },
  props:
    {
      name: String,
    },
  methods: {
    onEnterRoomName(event: any) {
      this.validate_room_name(event);
      event.target.blur();
      if (!this.is_incorrect_room_name) {
        this.last_correct_name = this.current_room_name!;
        localStorage.setItem('room_name', this.current_room_name!);
        ApiService.editRoom(this.current_room_name);
      } else {
        this.current_room_name = this.last_correct_name!;
        this.is_incorrect_room_name = false;
      }
    },
    selectText(event: any) {
      window.getSelection()
        ?.selectAllChildren(event.target);
    },
    validate_room_name(event: any) {
      const text = event.target.textContent;
      this.is_incorrect_room_name = text === '' || text.length > 32;
      console.log(this.last_correct_name);
    },
    onInputHandler(event: any) {
      this.current_room_name = event.target.textContent;
      this.validate_room_name(event);
    },
  },
  mounted() {
    setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      ApiService.getRoommates().then((response) => {
        self.current_room_name = response.data.users[0].room.name;
        console.log(response.data);
      });
    }, 10000);
  },
});
</script>

<style scoped lang="sass">
@import "@/assets/css/variables.sass"
.green-border
  outline: 5px dashed $light-green

.error-detected
  outline: 5px dashed $danger-color !important
  color: $danger-color !important

#room-name
  transition: color 0.3s ease-in
  width: fit-content
</style>
