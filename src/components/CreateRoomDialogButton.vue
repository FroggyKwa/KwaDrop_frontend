<template>
  <v-btn @click.stop="dialog = true" :class="buttonStyle" depressed rounded
         block>
    {{ text }}
  </v-btn>
  <Modal v-model="dialog" :title="text" @before-open="beforeOpen" @before-close="beforeClose">
    <v-form>
      <div id="form-wrapper">
        <v-text-field color="#56b882" variant="outlined" id="input-room-name" label="Enter room name"></v-text-field>
        <v-text-field color="#56b882" variant="outlined" id="input-username" label="Enter your username"></v-text-field>
        <v-switch
          v-model="is_closed_room"
          label="Closed room"
          color="#56b882">
        </v-switch>
        <v-text-field color="#56b882" variant="outlined" :disabled="!is_closed_room" id="password" label="Password"></v-text-field>
        <div class="float-right">
          <v-btn class="button-primary ml-4 mr-4" type="button" @click="dialog = false">Ok
          </v-btn>
          <v-btn class="button-secondary" type="button" @click="dialog = false">
            Cancel
          </v-btn>
        </div>
      </div>
    </v-form>
  </Modal>
</template>
<!--TODO: MAKE SEPARATELY-->
<script>
import VueModal from '@kouts/vue-modal';
import bodyScroll from 'body-scroll-freezer';

export default {
  name: 'CreateRoomDialogButton',
  data() {
    return {
      dialog: false,
      room_name: String,
      username: String,
      is_closed_room: false,
      password: String,
    };
  },
  mounted() {
    bodyScroll.init();
  },
  methods: {
    beforeOpen() {
      bodyScroll.freeze();
    },
    beforeClose() {
      bodyScroll.unfreeze();
    },
  },
  props:
    {
      buttonStyle: String,
      text: String,
    },
  components:
    {
      Modal: VueModal,
    },
};
</script>

<style scoped lang="sass">
@import "../assets/css/variables"

#form-wrapper
  padding: 2em
</style>
