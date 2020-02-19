<template>
  <f7-page name="roominspectiondetails" :page-content="false">
    <sic-search @enter="onEnter" @status="onStatus" @date="onUpdateDate"></sic-search>
    <div class="page-content infinite-scroll-content" ref="scrollList">
      <div :class="['searchbar-backdrop', isInput?'searchbar-backdrop-in':'']"></div>
      <div class="container">
        <div v-for="(item) in listData" :key="item.id" v-bind="item" :queryText="queryText">
          <div class="card" @click="$f7router.navigate(`/sicreportdetails?id=${item.id}`)">
            <div class="top-box">
              <div class="name" v-html="hightText(item.tbShopfloorFacility.facilityName)"></div>
              <div
                :class="['status',item.checkStatus==='true'?'status-green':'status-red']"
              >{{item.checkStatus==='true'?' 正 常':'异 常'}}</div>
            </div>
            <div class="top-box-2">
              <div class="name" v-html="hightText(item.tbShopfloorFacility.productLine)"></div>
              <div class="name" v-html="hightText(item.tbShopfloorFacility.workshopName)"></div>
            </div>
            <div class="box">
              巡检单号：
              <div v-html="hightText(item.checkNo)"></div>
            </div>
            <div class="box">
              巡检时间：
              <div>{{item.checkDtime|dateFormat}}</div>
            </div>
            <div class="box">
              巡检人员：
              <div v-html="hightText(item.checker)"></div>
            </div>
          </div>
        </div>
        <div class="preloader infinite-scroll-preloader" v-show="!allowInfinite"></div>
        <div class="block" v-show="isNotFound">
          <div class="block-inner">Nothing found</div>
        </div>
      </div>
    </div>
    <div class="block searchbar-not-found">
      <div class="block-inner">Nothing found</div>
    </div>
  </f7-page>
</template>

<script>
import { f7Page, f7Icon } from "framework7-vue";
import SicSearch from "@/components/search/SicSearch";
import { fetchShopfloorList } from "@/api/computercheck.js";
export default {
  data() {
    return {
      listData: [],
      queryText: "",
      date: null,
      page: {
        current: 1,
        limit: 10
      },
      lastTime: 0,
      status: -1,
      isFinish: false,
      allowInfinite: true,
      isNotFound: false,
      isInput: false
    };
  },
  components: {
    [f7Page.name]: f7Page,
    [f7Icon.name]: f7Icon,
    SicSearch
  },
  mounted() {
    document.title = 'Shopfloor IT Devices Check'; 
    this.getShopfloorList();
    this.$f7.searchbar.create({
      el: ".searchbar",
      searchContainer: ".list",
      searchIn: ".item-subtitle"
    });
    this.$nextTick(() => {
      this.$refs.scrollList.addEventListener("infinite", () => {
        if (this.isFinish || !this.allowInfinite) {
          return;
        }
        this.allowInfinite = false;
        this.getShopfloorList();
      });
    });
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
    },
    onEnter(value) {
      let time = new Date().getTime();
      console.log(time - this.lastTime)
      if (time - this.lastTime < 1000) {
        console.log("不能重复搜索");
        return;
      }
      this.lastTime = time;
      this.queryText = value;
      this.page.current = 1;
      this.isNotFound = false;
      this.isFinish = false;
      this.getShopfloorList();
    },
    getShopfloorList() {
      let queryParams = {
        currentPage: this.page.current,
        limit: this.page.limit
      };
      if (this.queryText != "") {
        queryParams.searchText = this.queryText;
      }
      if (this.date) {
        queryParams.after = this.date.after;
        queryParams.before = this.date.before;
      }
      queryParams.status = this.status;
      fetchShopfloorList(queryParams)
        .then(data => {
          if (this.page.current === 1) {
            this.listData = [];
            console.log(this.listData);
          }
          if (data.total < 1) {
            this.isNotFound = true;
            return;
          }
          this.page.current++;
          data.data.forEach(element => {
            this.listData.push(element);
          });
          if (this.listData.length >= data.total) {
            this.isFinish = true;
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.allowInfinite = true;
        });
    },
    onStatus(value) {
      this.status = value;
      this.onEnter(this.queryText);
    },
    extractDate(date, value) {
      let month = date.getMonth() + 1;
      return `${date.getFullYear()}-${month < 10 ? "0" + month : month}-${
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
      } ${value}`;
    },
    onUpdateDate(value) {
      this.date = value
        ? {
            after: this.extractDate(value.startDate, "00:00:00"),
            before: this.extractDate(value.endDate, "23:59:59")
          }
        : null;
      this.onEnter(this.queryText);
    }
  }
};
</script>
<style lang="scss">
.page {
  background-color: #efeff4 !important;
}
.top-box-2 {
  display: flex;
  flex-direction: row;
  .name {
    font-size: 20px;
    margin-right: 10px;
  }
}
</style>
<style scoped>
.page-content {
  height: 93vh !important;
}
</style>
