<template>
  <div>
    <f7-navbar>
      <f7-nav-left>
        <f7-link @click="notAll">取消</f7-link>
      </f7-nav-left>
      <f7-nav-title>已选中{{numShowcheck}}个文件</f7-nav-title>
      <f7-nav-right>
        <f7-link @click="all">全选</f7-link>
      </f7-nav-right>
    </f7-navbar>
  </div>
</template>
<script>
import { f7Navbar, f7NavLeft, f7NavRight, f7NavTitle } from "framework7-vue";
export default {
  props: ["numShowcheck"],
  components: {
    [f7Navbar.name]: f7Navbar,
    [f7NavLeft.name]: f7NavLeft,
    [f7NavRight.name]: f7NavRight,
    [f7NavTitle.name]: f7NavTitle
  },
  methods: {
    notAll() {
      this.$emit("checkStatus", false);
    },
    all() {
      this.$emit("checkStatus", true);
    }
  }
};
</script>
<style lang="scss">
.navbar {
  background-color: #fff !important;
}
</style>
