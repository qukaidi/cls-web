<template>
  <div>
    <f7-navbar>
       <f7-nav-left back-link="返回"></f7-nav-left>
      <f7-nav-title>{{navName}}</f7-nav-title>
      <f7-nav-right>
        <f7-link icon="icon-bars" panel-open="right"></f7-link>
      </f7-nav-right>
    </f7-navbar>
  </div>
</template>
<script>
import { f7Navbar, f7NavLeft, f7NavRight, f7NavTitle } from "framework7-vue";
export default {
    props: ["navName"],
  components: {
    [f7Navbar.name]: f7Navbar,
    [f7NavLeft.name]: f7NavLeft,
    [f7NavRight.name]: f7NavRight,
    [f7NavTitle.name]: f7NavTitle
  }
};
</script>
<style lang="scss">
.navbar {
  height: 44px !important;
  .navbar-inner {
    height: 44px !important;
  }
}
.navbar .title {
  text-align: center !important;
}
.md .navbar .right {
  margin-left: 10px !important;
}
.md .navbar-inner {
  justify-content: space-between !important;
  height: 44px !important;
}
.navbar a {
  color: #737373 !important;
}
.navbar::before {
  height: 1px !important;
}
.navbar {
  font-size: 17px !important;
}
</style>
