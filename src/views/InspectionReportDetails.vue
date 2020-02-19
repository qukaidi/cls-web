<template>
  <f7-page name="roominspectiondetails">
    <back-navbar navName="巡检详情"></back-navbar>
    <div class="card-page" v-if="data">
        <inspection-header
          :isWork="data.checkStatus"
          :checkNo="data.checkNo"
          :checker="data.checker"
          :checkDtime="data.checkDtime"
          :computerName="data.tbInfraFacility.name"
        ></inspection-header>
      <div class="card">
        <div class="card-content card-content-padding">
          <div class="list media-list">
            <ul>
              <li>
                <a href="#" class="item-link item-content">
                  <div class="item-inner">
                    <div class="item-subtitle-box">
                      <inspection-card v-for="(item,index) in data.list"
                      :key="index"
                        :index="index"
                        :name="item.name"
                        :isWork="item.status"
                        :memo="item.memo"
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
import BackNavbar from "@/components/navbar/BackNavbar";
import InspectionCard from "@/components/card/InspectionCard";
import InspectionHeader from "@/components/card/InspectionHeader";
import { fetchComputerRoom, fetchComputerCheck } from "@/api/computercheck.js";
import {fetchList,fetchOne} from "@/api/infraFacilityCheck.js"
export default {
  components: {
    BackNavbar,
    [f7Page.name]: f7Page,
    [f7PageContent.name]: f7PageContent,
    InspectionCard,
    InspectionHeader
  },
  data() {
    return {
      data: null
    };
  },
  methods: {
    getComputerRoom() {
      fetchComputerRoom(this.computerRoomId).then(result => {
        this.roomName = result.data.computerName;
      });
    },
    getComputerCheck() {
      this.$f7.preloader.show();
      fetchOne(this.id).then(result => {
        if (result.status === 200) {
          this.data=result.data;
          const strToJsonData=JSON.parse(result.data.content);
          if(strToJsonData){
           this.data.list=strToJsonData.map(value=>{
              let fieldName=Object.keys(value)[0];
              return {
                name:fieldName,
                memo:value[fieldName].memo,
                status:value[fieldName].status
              }
            });
          }
        }
      }).finally(() => {
          this.$f7.preloader.hide();
        });
    }
  },
  mounted() {
    document.title = 'Infra-Facility Routine Check'; 
    this.id = this.$f7route.query.id;
    this.getComputerCheck();
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
.item-subtitle-box {
  padding-left: 10px;
}
</style>