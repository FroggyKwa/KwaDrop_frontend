<template>
  <v-btn @click.stop="dialog = true" size="x-large" icon class="mt-5">
    <font-awesome-icon size="2xl" icon="fa-solid fa-gear" />
  </v-btn>
  <Modal v-model="dialog" :title="text" @before-open="beforeOpen" @before-close="beforeClose">
    <v-form>
      <div id="form-wrapper">
        <v-text-field v-model="new_room_name" color="#56b882" variant="outlined" id="input-room-id"
                      label="Enter new room name"></v-text-field>
        <v-text-field v-model="new_room_password" type="password" color="#56b882" variant="outlined" id="input-room-id"
                      label="Enter new room password"></v-text-field>
        <v-text-field v-model="new_user_name" color="#56b882" variant="outlined" id="input-username"
                      label="Enter your new username"></v-text-field>
        <v-file-input v-model="new_user_avatar" prepend-icon="mdi-alien-outline" chips="true" show-size color="#56b882" variant="outlined" id="input-username"
                      label="Choose your avatar picture"></v-file-input>
        <div class="float-right">
          <v-btn class="button-primary ml-4 mr-4" type="button" @click="onBtnClicked">Ok <!--TODO: PATCH-->
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
import { defineComponent } from 'vue';
import VueModal from '@kouts/vue-modal';
import bodyScroll from 'body-scroll-freezer';
import ApiService from '@/api/api-service';

export default defineComponent({
  name: 'openRoomSettingsBtn',
  data() {
    return {
      dialog: false,
      new_room_name: '',
      new_room_password: '',
      new_user_name: '',
      new_user_avatar: '',
      text: 'Room settings',
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
    onBtnClicked() {
      this.dialog = false;
      ApiService.editRoom(this.new_room_name, this.new_room_password);
    },
  },
  components:
    {
      Modal: VueModal,
    },
});
</script>

<style scoped lang="sass">
@import "@/assets/css/variables.sass"
#form-wrapper
  padding: 2em

</style>
