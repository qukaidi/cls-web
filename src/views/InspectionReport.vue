<template>
  <f7-page name="roominspectiondetails" :page-content="false">
    <search @enter="onEnter" @status="onStatus"></search>
    <div class="page-content infinite-scroll-content" ref="scrollList">
      <div :class="['searchbar-backdrop', isInput?'searchbar-backdrop-in':'']"></div>
      <div class="container">
        <list-card v-for="(item) in listData" :key="item.id" v-bind="item" :queryText="queryText"></list-card>
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
import Search from "@/components/search/Search";
import ListCard from "@/components/card/ListCard";
import { fetchList } from "@/api/infraFacilityCheck.js";
export default {
  data() {
    return {
      listData: [],
      queryText: "",
      page: {
        current: 1,
        limit: 10
      },
      isFinish: false,
      allowInfinite: true,
      isNotFound: false,
      isInput: false,
      status: -1,
      lastTime: 0
    };
  },
  components: {
    [f7Page.name]: f7Page,
    [f7Icon.name]: f7Icon,
    Search,
    ListCard
  },
  mounted() {
    document.title = "Infra-Facility Routine Check";
    this.getCheckList();
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
        this.getCheckList();
      });
    });
  },
  methods: {
    onEnter(value) {
      let time = new Date().getTime();
      console.log(time - this.lastTime);
      if (time - this.lastTime < 1000) {
        console.log("不能重复搜索");
        return;
      }
      this.lastTime = time;
      this.queryText = value;
      this.page.current = 1;
      this.isNotFound = false;
      this.isFinish = false;
      this.getCheckList();
    },
    getCheckList() {
      let queryParams = {
        currentPage: this.page.current,
        limit: this.page.limit
      };
      if (this.queryText != "") {
        queryParams.searchText = this.queryText;
      }
      queryParams.status = this.status;
      fetchList(queryParams)
        .then(data => {
          if (this.page.current === 1) {
            this.listData = [];
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
    }
  }
};
</script>
<style lang="scss">
.page {
  background-color: #efeff4 !important;
}
</style>
<style scoped>
.page-content {
  height: 93vh !important;
}
</style>
