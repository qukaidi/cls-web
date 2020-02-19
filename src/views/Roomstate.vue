<template>
  <f7-page name="roomstate">
    <div class="card">
      <div class="room-title">{{timeYear()}}年{{timeMonth()}}月检查状态</div>
    </div>
    <div class="card">
      <div class="item-box" v-for="(item,index) in items" :key="index">
        <div class="name">{{item.name}}</div>
        <div
          :class="['status',item.num>=1?'status-green':'status-red']"
        >{{item.num>=1? '已巡检':'未巡检'}}</div>
        <div class="type">{{item.type}}</div>
      </div>
    </div>
  </f7-page>
</template>

<script>
import { f7Page } from "framework7-vue";
import { fetchStatus } from "@/api/InfraFacility.js";
export default {
  data() {
    return {
      items: []
    };
  },
  components: {
    [f7Page.name]: f7Page
  },
  methods: {
    getRoomStatus() {
      fetchStatus().then(result => {
        this.items = result.data;
      });
    },
    timeYear() {
      return new Date().getFullYear();
    },
    timeMonth() {
      return new Date().getMonth() + 1;
    }
  },
  mounted() {
    document.title = "Infra-Facility Routine Check";
    this.id = this.$f7route.query.id;
    this.getRoomStatus();
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
.item-box {
  height: 35px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  display: inline-block;
  .name {
    float: left;
    margin-top: 2%;
  }
  .type {
    float: right;
    font-size: 10px;
    color: gray;
    border: 1px solid gray;
    border-radius: 3px;
    text-align: center;
    margin-right: 10px;
    margin-top: 2%;
    padding: 2px;
    width: 51px;
  }
  .status {
    float: right;
    font-size: 10px;
    margin-top: 2%;
    text-align: center;
    border-radius: 3px;
    padding: 2px;
  }
  .status-green {
    border: 1px solid green;
    color: green;
  }
  .status-red {
    border: 1px solid red;
    color: red;
  }
}
</style>
<style scoped>
li {
}
li:last-child {
  border-bottom: none;
}
</style>


