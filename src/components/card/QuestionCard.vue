<template>
  <div class="question-card">
    <f7-row>
      <f7-col width="5">{{index}}</f7-col>
      <f7-col width="25" class="label">{{label}}</f7-col>
      <f7-col width="70" class="check-box">
        <div class="card_box_check" @click="updateCheckedStatus('true')">
          <f7-radio :checked="checked==='true'" :name="fieldName"></f7-radio>
          <div class="span-size">正常</div>
        </div>
        <div class="card_box_check" @click="updateCheckedStatus('false')">
          <f7-radio :name="fieldName" :checked="checked==='false'"></f7-radio>
          <div class="span-size">异常</div>
        </div>
      </f7-col>
    </f7-row>
    <f7-row v-show="checked">
      <f7-col width="25" class="label left">备注</f7-col>
      <f7-col width="70">
        <f7-input
          type="text"
          placeholder=""
          :value="memo"
          @input="updateMemo($event.target.value)"
          maxlength="100"
        ></f7-input>
      </f7-col>
    </f7-row>
    <f7-row v-show="!checked">
      <f7-col width="25" class="label left">备注</f7-col>
      <f7-col width="70">
        <f7-input
          type="text"
          placeholder=""
          :value="memo"
          @input="updateMemo($event.target.value)"
          maxlength="100"
        ></f7-input>
      </f7-col>
    </f7-row>
  </div>
</template>
<script>
import { f7Input, f7Radio, f7Row, f7Col } from "framework7-vue";
export default {
  components: {
    [f7Input.name]: f7Input,
    [f7Radio.name]: f7Radio,
    [f7Row.name]: f7Row,
    [f7Col.name]: f7Col
  },
  props: {
    index: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: ""
    },
    fieldName: {
      type: String,
      default: ""
    },
    checked: {
      type: String,
      default: "true"
    },
    memo: {
      type: String,
      default: ""
    }
  },
  methods: {
    updateCheckedStatus(value) {
      this.$emit("update:checked", value);
    },
    updateMemo(value) {
      this.$emit("update:memo", value);
    }
  }
};
</script>
<style lang="scss">
.question-card {
  border-bottom: 1px solid #a9a9a9;
  font-size: 16px;
  padding: 14px 12px 0px 12px;
  .check-box {
    display: flex;
    flex-direction: row;
    font-size: 16px;
    line-height: 16px;
    .card_box_check {
      display: flex;
      flex-direction: row;
      align-self: center;
      .span-size {
        margin-left: 5px;
        align-self: center;
      }
      &:last-child {
        margin-left: 28%;
      }
    }
  }
  .left {
    margin-left: 5.5%;
  }
}
.radio {
  --f7-touch-ripple-color: #fff !important;
}
input[type="text"] {
  font-size: 16px !important;
  height: 48px !important;
}
</style>
