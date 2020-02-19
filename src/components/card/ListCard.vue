<template>
  <div class="card" @click="$f7router.navigate(`/inspectionreportdetails?id=${id}`)">
    <div class="top-box">
      <div class="name" v-html="hightText(tbInfraFacility.name)"></div>
      <div
        :class="['status',checkStatus=='true'?'status-green':'status-red']"
      >{{checkStatus=='true'?' 正 常':'异 常'}}</div>
    </div>
    <div class="box">
      巡检单号：
      <div v-html="hightText(checkNo)"></div>
    </div>
    <div class="box">
      巡检时间：
      <div>{{checkDtime|dateFormat}}</div>
    </div>
    <div class="box">
      巡检人员：
      <div v-html="hightText(checker)"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: Number
    },
    checkNo: {
      type: String
    },
    checker: {
      type: String
    },
    checkDtime: {
      type: String
    },
    tbInfraFacility: {
      computerName: {
        type: String
      }
    },
    checkStatus: {
      type: String
    },
    queryText: {
      type: String,
      default: ""
    }
  },
  methods: {
    hightText(text) {
      let filterText = text;
      if (this.queryText != "" && filterText.length >= this.queryText.length) {
        let beginIndex = filterText
          .toLowerCase()
          .indexOf(this.queryText.toLowerCase());
        if (beginIndex != -1) {
          let leftText = "";
          let centerText = "";
          let rightText = "";
          if (beginIndex == 0) {
            centerText = filterText.substring(0, this.queryText.length);
            rightText = filterText.substring(this.queryText.length);
          } else {
            leftText = filterText.substring(0, beginIndex);
            centerText = filterText.substring(
              beginIndex,
              beginIndex + this.queryText.length
            );
            rightText = filterText.substring(
              beginIndex + this.queryText.length
            );
          }
          filterText = `${leftText}<span style='color:red'>${centerText}</span>${rightText}`;
        }
      }
      return filterText;
    }
  }
};
</script>
<style lang="scss">
.card {
  background: #fff !important;
  position: relative !important;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2) !important;
  padding: 10px;
  display: flex;
  flex-direction: column;
  .top-box {
    display: flex;
    align-items: center;
    .name {
      flex-basis: 85%;
      font-size: 20px;
      word-break: break-all;
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
  .box {
    display: flex;
    font-size: 14px;
    color: gray;
    padding-top: 3px;
    padding-bottom: 3px;
  }
}
</style>
