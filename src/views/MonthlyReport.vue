<template>
  <f7-page name="roominspectiondetails">
    <div class="list-box" ref="listBox">
      <picker-navbar
        @checkStatus="onCheckStatus"
        :numShowcheck="checkedNum"
      ></picker-navbar>
    <date-picker @submit="search"></date-picker>
    <f7-list>
      <f7-list-item
        :title="item.list_name"
        v-for="(item,index) in items"
        :key="index"
        @change="onChange(item)"
        :checkbox="true"
        :checked="item.isChecked==='true'"
      ></f7-list-item>
    </f7-list>
    </div>
    <transition name="footer-box">
      <div class="list_foot" v-show="isCheckedInAll">
        <div class="bar_foot" @click="push">推送到邮箱</div>
      </div>
    </transition>
  </f7-page>
</template>

<script>
import { f7Page } from "framework7-vue";
import DatePicker from "@/components/picker/DatePicker";
import PickerNavbar from "@/components/navbar/PickerNavbar";
import { list, pushMail } from "@/api/report";

export default {
  data() {
    return {
      items: []
    };
  },
  components: {
    DatePicker,
    PickerNavbar,
    [f7Page.name]: f7Page
  },
  mounted() {
    document.title = 'Infra-Facility Routine Check'; 
    let dateObj = new Date();
    let date = {
      year: dateObj.getFullYear(),
      month: dateObj.getMonth()
    };
    this.search(date);
  },
  methods: {
    search(data) {
      this.$f7.preloader.show();
      list(data)
        .then(res => {
          this.items = [];
          res.data.forEach(element => {
            this.items.push({
              id: element.id,
              list_name:
                element.reportYear + "年" + element.reportMonth + "月报表",
              isChecked: 'false',
              file: element.reportName
            });
          });
        })
        .finally(() => {
          this.$f7.preloader.hide();
        });
    },
    push() {
      let data = new Array();
      this.items
        .filter(item => item.isChecked==='true')
        .forEach(item => {
          data.push(item.id);
        });
      this.$f7.preloader.show();
      pushMail({ ids: data.join(";") }).then(res => {
        if (res.status == 200) {
          this.$f7.preloader.hide();
          this.$f7ready(f7 => {
            f7.dialog.alert(
              "亲，报表Excel已经在抵达你的邮箱的路上了！",
              "提示"
            );
            this.items.forEach(item => {
              item.isChecked = 'false';
            });
          });
        }
      });
    },
    onChange(item) {
      item.isChecked = item.isChecked==='true'?'false':'true';
    },
    onCheckStatus(value) {
      if (value) {
        this.items.forEach(item => {
          item.isChecked = 'true';
        });
      } else {
        this.items.forEach(item => {
          item.isChecked = 'false';
        });
      }
    }
  },
  computed: {
    checkedNum() {
      return this.items.filter(item => item.isChecked==='true').length;
    },
    isCheckedInAll() {
      return this.items.filter(item => item.isChecked==='true').length > 0;
    }
  },
  watch:{
    isCheckedInAll(value){
      this.$refs.listBox.style.transform=value?"translateY(0px)":"translateY(-44px)"
    }
  }
};
</script>
<style lang="scss">
.list {
  margin-top: 0px !important;
  margin-bottom: 0px !important;
}
.list-box{
 transition: all .5s;
 transform: translateY(-44px)
}
.item-checkbox {
  .icon-checkbox {
    position: absolute !important;
    left: 90% !important;
  }
  .item-title {
    margin-left: 17px;
    padding-top: 0px;
  }
  .checkbox i,
  .icon-checkbox {
    border: 1px solid var(--f7-checkbox-inactive-color) !important;
    border-radius: 50% !important;
  }
}

.picker-navbar-enter-active,
.picker-navbar-leave-active,
.footer-box-enter-active,
.footer-box-leave-active {
  transition: all 0.3s ease;
}
.picker-navbar-enter,
.picker-navbar-leave-to {
  transform: translatey(-44px);
  opacity: 1;
}
.footer-box-enter,
.footer-box-leave-to {
  transform: translatey(45px);
  opacity: 1;
}
.list_foot {
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: 100%;
  .bar_foot {
    background-color: #4682b4 !important;
    text-align: center;
    font-size: 17px;
    color: #ffffff;
    padding: 10px;
    cursor: pointer;
  }
}
.md .checkbox i::after, .md .icon-checkbox::after {
    padding-top: 1px;
    padding-left: 1px;
}
</style>