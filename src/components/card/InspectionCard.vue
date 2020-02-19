<template>
  <div class="item-subtitle">
    <f7-row>
      <f7-col width="5">{{index}}.</f7-col>
      <f7-col width="20">
        <span>{{name}}</span>
      </f7-col>
      <f7-col width="75">
        <span v-if="isWork==='true'">正常</span>
        <span class="exc-status" v-else>异常</span>
      </f7-col>
    </f7-row>
    <f7-row>
      <f7-col width="5"></f7-col>
      <f7-col width="20">
        <span>备注</span>
      </f7-col>
      <f7-col width="75">
        <span v-if="memo==''">-</span>
        <span class="memo-text-wrap" v-else>{{memo}}</span>
      </f7-col>
    </f7-row>
  </div>
</template>

<script>
import { f7Row, f7Col } from "framework7-vue";
export default {
  components: {
    [f7Row.name]: f7Row,
    [f7Col.name]: f7Col
  },
  props: {
    index: {
      type: Number,
      default: 1
    },
    name: {
      type: String,
      default: ""
    },
    isWork: {
      type: String,
      default: 'true'
    },
    memo: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
.memo-text-wrap {
  display: block;
  word-break: normal;
  width: auto;
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
}
.exc-status{
  color:red;
}
</style>
