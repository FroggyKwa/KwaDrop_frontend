<template>
  <v-btn @click.stop="dialog = true" :class="buttonStyle" depressed rounded
         block="true">
    {{ text }}
  </v-btn>
  <Modal v-model="dialog" :title="text" @before-open="beforeOpen" @before-close="beforeClose">
    <v-form>
      <div id="form-wrapper">
        <v-text-field v-model="room_name" color="#56b882" variant="outlined" id="input-room-name"
                      label="Enter room name"></v-text-field>
        <v-text-field v-model="username" color="#56b882" variant="outlined" id="input-username"
                      label="Enter your username"></v-text-field>
        <v-switch
          v-model="is_closed_room"
          label="Closed room"
          color="#56b882">
        </v-switch>
        <v-text-field v-model="room_password" color="#56b882" variant="outlined"
                      :disabled="!is_closed_room" id="password" label="Password"></v-text-field>
        <div class="float-right">
          <v-btn class="button-primary ml-4 mr-4" type="button" @click="onSubmitBtn">
            Ok
          </v-btn>
          <v-btn class="button-secondary" type="button" @click="dialog = false">
            Cancel
          </v-btn>
        </div>
      </div>
    </v-form>
  </Modal>
</template>
<script>
import VueModal from '@kouts/vue-modal';
import bodyScroll from 'body-scroll-freezer';
import ApiService from '@/api/api-service';

export default {
  name: 'CreateRoomDialogButton',
  data() {
    return {
      dialog: false,
      room_name: '',
      username: '',
      is_closed_room: false,
      room_password: '',
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
    async createNewRoom() {
      try {
        await ApiService.createRoom(this.room_name, this.room_password)
          .then(async (result) => {
            console.log(result);
            if (result.status === 409) {
              await ApiService.disconnect();
              await ApiService.whoami();
              await ApiService.createRoom(this.room_name, this.password);
            }
            await this.$router.push({
              name: 'room',
              params: { room_id: localStorage.room_id },
            });
          });
      } catch (e) {
        console.log(e);
      }
    },
    onSubmitBtn() {
      this.dialog = false;
      ApiService.whoami()
        .then(async (data) => {
          if (data.userid === null) {
            await ApiService.createUser(this.username);
            await this.createNewRoom();
          } else {
            await ApiService.renameUser(this.username);
            await this.createNewRoom();
          }
        });
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
