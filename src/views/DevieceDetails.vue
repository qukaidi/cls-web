<template>
  <f7-page name="devicedetails">
    <div class="card-page" v-if="data">
      <div class="card">
        <div class="top-box">
          <div class="name">设备检查</div>
          <div
            :class="['status',data.checkStatus==='true'?'status-green':'status-red']"
          >{{data.checkStatus==='true'?' 正 常':'异 常'}}</div>
        </div>
        <div class="text-box">
          <div>车&nbsp;&nbsp;&nbsp;&nbsp;间：{{wordName.facilityName}}</div>
          <div></div>
        </div>
        <div class="text-box">
          <div>产&nbsp;&nbsp;&nbsp;&nbsp;线：{{wordName.productLine}}</div>
          <div></div>
        </div>
        <div class="text-box">
          <div>工作台：{{wordName.workshopName}}</div>
          <div></div>
        </div>
        <div class="text-box">
          <div>巡检员：{{data.checker}}</div>
          <div></div>
        </div>
        <div class="text-box">
          <div>巡检单号：{{data.checkNo}}</div>
          <div></div>
        </div>
        <div class="text-box">
          <div>提交时间：{{data.checkDtime|dateFormat}}</div>
          <div></div>
        </div>
      </div>
      <div class="card">
        <div class="card-content card-content-padding">
          <div class="list media-list">
            <ul>
              <li>
                <a href="#" class="item-link item-content">
                  <div class="item-inner">
                    <div class="item-subtitle-box">
                      <inspection-card
                        :index="1"
                        :name="'设备警告'"
                        :isWork="data.equipmentAlarm"
                        :memo="data.equipmentAlarmMemo"
                      ></inspection-card>
                      <div class="mb"></div>
                      <inspection-card
                        :index="2"
                        :name="'硬盘状态'"
                        :isWork="data.hardware"
                        :memo="data.hardwareMemo"
                      ></inspection-card>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </f7-page>
</template>

<script>
import { f7Page, f7PageContent } from "framework7-vue";
import InspectionCard from "@/components/card/InspectionCard";
import {
  fetchShopfloorRoom,
  fetchShopfloorCheck
} from "@/api/computercheck.js";
export default {
  components: {
    [f7Page.name]: f7Page,
    [f7PageContent.name]: f7PageContent,
    InspectionCard
  },
  data() {
    return {
      data: null,
      wordName: {}
    };
  },
  methods: {
    getShopfloorCheck() {
      this.$f7.preloader.show();
      fetchShopfloorCheck(this.id)
        .then(result => {
          if (result.status === 200) {
            this.data = result.data;
            this.wordName = result.data.tbShopfloorFacility;
          }
        })
        .finally(() => {
          this.$f7.preloader.hide();
        });
    }
  },
  mounted() {
    document.title = "Shopfloor IT Devices Check";
    this.id = this.$f7route.query.id;
    this.getShopfloorCheck();
  }
};
</script>
<style lang="scss">
.page {
  background-color: #efeff4 !important;
}
.card-page {
  margin-bottom: 54px;
}
.list .item-inner {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
.card {
  background: #fff !important;
  position: relative !important;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2) !important;
}
.item-subtitle-box {
  padding-left: 10px;
}
</style>