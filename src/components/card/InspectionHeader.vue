<template>
  <div class="card">
    <div class="top-box">
      <div
        :class="['status',isWork==='true'?'status-green':'status-red']"
      >{{isWork==='true'?' 正 常':'异 常'}}</div>
    </div>
    <div class="text-box">
      <div>巡检单号:</div>
      <div>{{checkNo}}</div>
    </div>
    <div class="text-box">
      <div>巡检人员:</div>
      <div>{{checker}}</div>
    </div>
    <div class="text-box">
      <div>巡检地点:</div>
      <div>{{computerName}}</div>
    </div>
    <div class="text-box">
      <div>巡检时间:</div>
      <div>{{checkDtime|dateFormat}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isWork: {
      type: String,
      default: 'true'
    },
    checkNo: {
      type: String,
      default: ""
    },
    checker: {
      type: String,
      default: ""
    },
    computerName: {
      type: String,
      default: ""
    },
    checkDtime: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="scss">
.card {
  background: #fff !important;
  position: relative !important;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2) !important;
  display: flex;
  flex-direction: column;
  .top-box {
    display: flex;
    .name {
      font-size: 20px;
    }
    .status {
      flex-basis: 12%;
      border-radius: 3px;
      line-height: 15px;
      font-size: 10px;
      text-align: center;
    }
    .status-green {
      color: green;
      border: 1px solid green;
    }
    .status-red {
      color: red;
      border: 1px solid red;
    }
  }
  .text-box {
    margin-top: 5px;
    display: flex;
    font-size: 15px;
    div:first-child {
      color: gray;
      white-space: nowrap;
    }
    div:last-child {
      margin-left: 6px;
      word-break: break-all;
    }
  }
}
</style>
