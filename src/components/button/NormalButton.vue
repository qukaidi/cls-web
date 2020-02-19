<template>
  <div>
    <f7-button raised large  fill :href="href_url">{{button_name}}</f7-button>
  </div>
</template>
<script>
import { f7Button } from "framework7-vue";

export default {
  props: ["button_name","href_url"],
  components: {
    [f7Button.name]: f7Button
  }
};
</script>

<style lang="scss">
.button{
  background-color: #4682B4 !important;
}
</style>
