<template>
  <v-btn @click.stop="dialog = true" v-bind="props" :class="buttonStyle" depressed rounded
         block>
    <slot></slot>
  </v-btn>
  <v-overlay v-model="dialog">
    <slot></slot>
  </v-overlay>
</template>

<script>
export default {
  name: 'CreateRoomDialog',
  data() {
    return {
      dialog: false,
      room_name: String,
      username: String,
      is_secret: false,
      password: String,
    };
  },
  props:
    {
      buttonStyle: String,
    },
};
</script>

<style scoped lang="sass">
@import "../assets/css/variables"

.button
  font:
    size: 2em
  padding: 1em 1em 1em 1em
  margin:
    top: 1em
    bottom: 1em

.button-primary
  @extend .button
  color: $not-white !important
  background: rgb(51, 103, 115)
  background: -moz-linear-gradient(45deg, rgba(51, 103, 115, 1) 0%, rgba(86, 184, 130, 1) 62%, rgba(146, 231, 109, 1) 100%)
  background: -webkit-linear-gradient(45deg, rgba(51, 103, 115, 1) 0%, rgba(86, 184, 130, 1) 62%, rgba(146, 231, 109, 1) 100%)
  background: linear-gradient(45deg, rgba(51, 103, 115, 1) 0%, rgba(86, 184, 130, 1) 62%, rgba(146, 231, 109, 1) 100%)
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#336773", endColorstr="#92e76d", GradientType=1)

.button-secondary
  @extend .button
  color: $semi-gray !important
  background-color: $not-white
</style>
