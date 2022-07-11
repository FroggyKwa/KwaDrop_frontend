<template>
    <h1 id="room-name"
        :class="{ 'error-detected':is_incorrect_room_name }"
        class="green-border bold textarea light-green-text text-h2"
        contenteditable
        @keydown.enter.stop="onEnterRoomName"
        @click="selectText"
        @input="onInputHandler"
    >
      {{current_room_name}}
    </h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RoomName',
  data() {
    return {
      is_incorrect_room_name: false,
      last_correct_name: '',
      current_room_name: this.name,
    };
  },
  props:
    {
      name: String,
    },
  methods: {
    onEnterRoomName(event: any) {
      event.target.blur();
      if (!this.is_incorrect_room_name) {
        this.last_correct_name = this.current_room_name!;
        // TODO: patch room-name request
      } else {
        this.current_room_name = this.last_correct_name;
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
