<template>
  <div>
    <f7-block-title>标准按钮样式</f7-block-title>
    <f7-block>
      <f7-row>
        <f7-col>
          <f7-button raised disabled="disabled">{{button_name}}</f7-button>
        </f7-col>
        <f7-col>
          <f7-button fill disabled="disabled">{{button_name}}</f7-button>
        </f7-col>
      </f7-row>
      <f7-row>
        <f7-col>
          <f7-button raised round disabled="disabled">{{button_name}}</f7-button>
        </f7-col>
        <f7-col>
          <f7-button fill round disabled="disabled">{{button_name}}</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
  </div>
</template>
<script>
import { f7Button, f7Row, f7Col, f7Block, f7BlockTitle } from "framework7-vue";
// import axios from "axios";
export default {
  components: {
    [f7Button.name]: f7Button,
    [f7Row.name]: f7Row,
    [f7Col.name]: f7Col,
    [f7Block.name]: f7Block,
    [f7BlockTitle.name]: f7BlockTitle
  },
  props: ["button_name"]
};
</script>
<style lang="scss">
</style>
