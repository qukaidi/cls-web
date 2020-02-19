<template>
  <f7-page name="roominspectiondetails">
    <div class="list-box" ref="listBox">
      <picker-navbar @checkStatus="onCheckStatus" :numShowcheck="checkedNum"></picker-navbar>
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
import { list2, pushMail2 } from "@/api/report";

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
    document.title = "Shopfloor IT Devices Check";
    let dateObj = new Date();
    let date = {
      year: dateObj.getFullYear(),
      month: dateObj.getMonth()+1
    };
    this.search(date);
  },
  methods: {
    search(data) {
      this.$f7.preloader.show();
      list2(data)
        .then(res => {
          this.items = [];
          res.data.forEach(element => {
            this.items.push({
              id: element.id,
              list_name: element.reportName,
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
      pushMail2({ ids: data.join(";") }).then(res => {
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
      item.isChecked = !item.isChecked;
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
  watch: {
    isCheckedInAll(value) {
      this.$refs.listBox.style.transform = value
        ? "translateY(0px)"
        : "translateY(-44px)";
    }
  }
};
</script>