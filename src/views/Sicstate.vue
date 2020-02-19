<template>
  <f7-page name="roomstate">
    <div class="card">
      <div class="room-title">{{getCurrWeekDays().starttime}}到{{getCurrWeekDays().endtime}}各设备检查状态</div>
    </div>
    <div class="card" style="padding-top: 0px;padding-bottom: 0px;">
      <div class="list links-list">
        <ul>
          <li v-for="(item,index) in items" :key="index">
            <div class="top-box">
              <div class="name list-font-size">
                {{item.facilityName +
                " " +
                item.productLine +
                " " +
                item.workshopName}}
              </div>
              <div
                v-if="item.num>0"
                :class="['status',item.okNum===item.num?'status-green':'status-red','left-status']"
              >{{item.okNum===item.num? '正常':'异常'}}</div>
              <div
                :class="['status',item.num>0?'status-green':'status-red']"
              >{{item.num>0? '已巡检':'未巡检'}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </f7-page>
</template>

<script>
import { f7Page } from "framework7-vue";
import { fetchShopfloorStatus } from "@/api/computercheck.js";
import moment from "moment";
export default {
  data() {
    return {
      checkNum: {
        type: Number,
        default: true
      },
      items: []
    };
  },
  components: {
    [f7Page.name]: f7Page
  },
  methods: {
    getShopfloorStatus() {
      fetchShopfloorStatus().then(result => {
        this.items = result.data;
      });
    },
    getCurrWeekDays() {
      let obj = {
        starttime: "",
        endtime: ""
      };
      obj.starttime = moment(
        moment()
          .week(moment().week())
          .startOf("week")
          .add(1, "days")
          .valueOf()
      ).format("YYYY-MM-DD");
      obj.endtime = moment(
        moment()
          .week(moment().week())
          .endOf("week")
          .add(1, "days")
          .valueOf()
      ).format("YYYY-MM-DD");
      return obj;
    }
  },
  mounted() {
    document.title = "Shopfloor IT Devices Check";
    this.id = this.$f7route.query.id;
    this.getShopfloorStatus();
  }
};
</script>
<style lang="scss">
.room-title {
  text-align: center;
  font-size: 16px;
}
.list-font-size {
  font-size: 14px !important;
  line-height: 2.5;
}
</style>
<style scoped>
li {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
li:last-child {
  border-bottom: none;
}
.left-status {
  margin-right: 10px;
}
</style>


