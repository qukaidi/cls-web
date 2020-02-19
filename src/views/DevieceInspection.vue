<template>
  <f7-page name="roominspection">
    <div class="ri-page">
      <div class="card">
        <div class="card-box">
          <div class="card-box1">
            <div class="con-text-font">车&nbsp;&nbsp;&nbsp;&nbsp;间：{{wordName.facilityName}}</div>
            <div class="con-text-font2"></div>
          </div>
          <div class="card-box1">
            <div class="con-text-font">产&nbsp;&nbsp;&nbsp;&nbsp;线：{{wordName.productLine}}</div>
            <div class="con-text-font2"></div>
          </div>
          <div class="card-box1">
            <div class="con-text-font">工作台：{{wordName.workshopName}}</div>
            <div class="con-text-font2"></div>
          </div>
          <div class="card-box1">
            <div class="con-text-font">巡检员：{{userInfo.displayName}}</div>
            <div class="con-text-font2"></div>
          </div>
        </div>
      </div>
      <div>
        <div class="card" style="padding-top: 0px;padding-bottom: 0px;">
          <div class="card-content card-content-padding">
            <div class="list media-list">
              <question-card
                v-for="(item,index) in items"
                :key="item.radio_name"
                :index="index+1"
                :label="item.article_name"
                :fieldName="item.radio_name"
                :checked.sync="item.checked"
                :memo.sync="item.memo"
                :class="index == 1 ? 'no-border-bottom':' '"
              ></question-card>
            </div>
          </div>
        </div>
        <div class="ri_buttom">
          <f7-button raised large fill @click="onSubmit">提交</f7-button>
        </div>
      </div>
    </div>
  </f7-page>
</template>
<script>
import { f7Page, f7List, f7Button } from "framework7-vue";
import RoomCrad from "@/components/card/RoomCrad";
import QuestionCard from "@/components/card/QuestionCard";
import { addShopfloorList, fetchShopfloorRoom } from "@/api/computercheck.js";
import { fetchUserInfo } from "@/api/user.js";
export default {
  data() {
    return {
      id: null,
      wordName: {},
      userInfo: {},
      items: [
        {
          article_name: "设备告警",
          radio_name: "equipmentAlarm",
          checked: false,
          memo: ""
        },
        {
          article_name: "硬盘状态",
          radio_name: "hardware",
          checked: false,
          memo: ""
        }
      ],
      toast: null
    };
  },
  components: {
    QuestionCard,
    RoomCrad,
    [f7Page.name]: f7Page,
    [f7List.name]: f7List,
    [f7Button.name]: f7Button
  },
  mounted() {
    document.title = "Shopfloor IT Devices Check";
    this.id = this.$f7route.query.id;
    this.getShopfloorRoom();
    this.getUserInfo();
    this.toastCenter = this.$f7.toast.create({
      text: "提交成功",
      position: "center",
      closeTimeout: 2000
    });
    this.toast = this.$f7.toast.create({
      text: "异常的备注不能为空",
      position: "top",
      closeTimeout: 1000
    });
  },
  methods: {
    onSubmit() {
      let obj = {};
      let isExist = true;
      let isSubmit = true;
      this.items.forEach(value => {
        obj[value.radio_name] = value.checked;
        if (value.checked!=='true') {
          if (value.memo == "") {
            isSubmit = false;
          }
          isExist = false;
        }
        obj[`${value.radio_name}Memo`] = value.memo;
      });
      if (!isSubmit) {
        this.toast.open();
        return;
      }
      obj.facilityId = parseInt(this.id);
      obj.checker = this.userInfo.displayName;
      obj.checkStatus = isExist;
      this.$f7.dialog.confirm("确定要提交吗？", "提示", () => {
        this.$f7.preloader.show();
        addShopfloorList(obj)
          .then(data => {
            if (data.status === 200) {
              this.$f7router.navigate(`/deviecedetails?id=${data.data.id}`, {
                pushState: false
              });
              this.toastCenter.open();
            } else {
              if(!data.msg){
                data.msg="请勿重复提交！";
              }
              this.$f7.dialog.alert(data.msg, "温馨提示", () => {
                WeixinJSBridge.invoke("closeWindow", {}, function(res) {});
              });
            }
          })
          .catch(error => {
            alert(error);
          })
          .finally(() => {
            this.$f7.preloader.hide();
          });
      });
    },
    getShopfloorRoom() {
      fetchShopfloorRoom(this.id).then(result => {
        if (result.status === 201) {
          this.wordName = result.data;
          this.$f7.dialog.alert(result.msg, "温馨提示", () => {
            WeixinJSBridge.invoke("closeWindow", {}, function(res) {});
          });
        } else {
          this.wordName = result.data;
        }
      });
    },
    getUserInfo() {
      this.$f7.preloader.show();
      fetchUserInfo()
        .then(result => {
          this.userInfo = result.data;
        })
        .catch(error => {})
        .finally(() => {
          this.$f7.preloader.hide();
        });
    }
  }
};
</script>
<style lang="scss">
.ri-page {
  margin-bottom: 10px;
  .ri_buttom {
    margin: 10px;
  }
}
.page {
  background-color: #efeff4 !important;
}
.box_num {
  padding-top: 5px;
}
.card-content-padding {
  padding-top: 5px !important;
  padding-bottom: 5px !important;
}

.card {
  background: #fff !important;
  position: relative !important;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2) !important;
}

input:not(.item-input-outline) .item-input-wrap::after {
  height: 0px !important;
}
.md .input:not(.input-outline)::after,
.md .item-input:not(.item-input-outline) .item-input-wrap::after {
  height: 0px !important;
}
.md {
  --f7-radio-size: 18px !important;
  --f7-radio-border-width: 1px !important;
}
.row {
  align-items: center !important;
}
.list .item-content {
  padding-left: 0px !important;
}
.button {
  background-color: #4682b4 !important;
}
.no-border-bottom {
  border-bottom-width: 0px;
}
</style>
