<template>
  <f7-page name="roominspection">
    <div class="ri-page">
      <room-crad :room_name="submitData.name" :chcker_name="userInfo.displayName"></room-crad>
      <div>
        <div class="card" style="padding-top: 0px;padding-bottom: 0px;">
          <div class="card-content card-content-padding">
            <div class="list media-list">
              <question-card
                v-for="(item,index) in items"
                :key="item.radioName"
                :index="index+1"
                :label="item.name"
                :fieldName="item.radioName"
                :checked.sync="item.checked"
                :memo.sync="item.memo"
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
import { addCheckList, fetchComputerRoom } from "@/api/computercheck.js";
import { fetchUserInfo } from "@/api/user.js";
import { fetchOne } from "@/api/InfraFacility.js";
import { addOne } from "@/api/infraFacilityCheck.js";
export default {
  data() {
    return {
      id: null,
      userInfo: {},
      items: null,
      toast: null,
      submitData: {}
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
    document.title = "Infra-Facility Routine Check";
    this.id = this.$f7route.query.id;
    this.getComputerRoom();
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
      let isSubmit = true;
      let isExist = true;
      let listData = [];
      this.items.forEach(value => {
        if (value.checked!=='true') {
          if (value.memo == "") {
            isSubmit = false;
          }
          isExist = false;
        }
        listData.push({
          [value.name]: {
            memo: value.memo,
            status: value.checked
          }
        });
      });
      if (!isSubmit) {
        this.toast.open();
        return;
      }
      obj.checker = this.userInfo.displayName;
      obj.facilityId = parseInt(this.id);
      obj.checkStatus = isExist;
      obj.content = JSON.stringify(listData);
      this.$f7.dialog.confirm("确定要提交吗？", "提示", () => {
        this.$f7.preloader.show();
        addOne(obj)
          .then(data => {
            if (data.status === 200) {
              this.$f7router.navigate(`/roomdetails?id=${data.data.id}`, {
                pushState: false
              });
               this.toastCenter.open();
            } else {
              const dialog = this.$f7.dialog.create({
                text:data.msg ,
                on: {
                  closed: function() {
                    window.close();
                  }
                }
              });
               dialog.open();
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
    getComputerRoom() {
      fetchOne(this.id).then(response => {
        const data = response.data;
        this.submitData = data;
        if (data) {
          this.items = JSON.parse(data.tbInfraFacilityType.template).map(
            value => {
              return {
                name: value,
                radioName: value,
                checked: 'false',
                memo: ""
              };
            }
          );
          this.roomName = data.name;
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
.question-card:last-child {
  border-bottom-width: 0px;
}
</style>
