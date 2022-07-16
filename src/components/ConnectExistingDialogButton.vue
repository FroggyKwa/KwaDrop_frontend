<template>
  <v-btn @click.stop="dialog = true" :class="buttonStyle" depressed rounded
         block>
    {{ text }}
  </v-btn>
  <Modal v-model="dialog" :title="text" @before-open="beforeOpen" @before-close="beforeClose">
    <v-form>
      <div id="form-wrapper">
        <v-text-field v-model="room_id" color="#56b882" variant="outlined" id="input-room-id"
                      label="Enter roomID"></v-text-field>
        <v-text-field v-model="password" type="password" color="#56b882" variant="outlined"
                      id="input-username"
                      label="Enter room password"
                      placeholder="Keep empty if there is no password"></v-text-field>
        <v-text-field v-model="username" color="#56b882" variant="outlined" id="input-username"
                      label="Enter your username"></v-text-field>
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
import bodyScroll from 'body-scroll-freezer';
import VueModal from '@kouts/vue-modal';
import ApiService from '@/api/api-service';

export default {
  name: 'ConnectExistingDialogButton',
  data() {
    return {
      dialog: false,
      room_id: '',
      password: '',
      username: '',
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
    async connectToRoom() {
      await ApiService.connectToRoom(this.room_id, this.password)
        .then(async (result) => {
          if (result.status === 409) {
            await ApiService.disconnect();
            await ApiService.connectToRoom(this.room_id, this.password);
          }
          await this.$router.push({
            name: 'room',
            params: { room_id: localStorage.room_id },
          });
        });
    },
    onSubmitBtn() {
      this.dialog = false;
      ApiService.whoami()
        .then(async (data) => {
          if (data.userid === null) {
            await ApiService.createUser(this.username);
            await this.connectToRoom();
          } else {
            await ApiService.renameUser(this.username);
            await this.connectToRoom();
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
