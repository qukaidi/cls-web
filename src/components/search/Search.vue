<template>
  <div class="head-row">
    <form class="searchbar">
      <div class="searchbar-inner">
        <div class="searchbar-input-wrap">
          <input type="search" placeholder="搜索巡检单号、巡检人员、巡检名称 " @keydown="onKeydown"  ref="searchInput" />
          <i class="searchbar-icon"></i>
          <span class="input-clear-button"></span>
        </div>
        <span class="searchbar-disable-button if-not-aurora">Cancel</span>
      </div>
    </form>
    <div class="icon-bg popover-open" href="#" data-popover=".popover-links">
        <img src="../../assets/funnel.png" style="width: 20px;"/>
    </div>
    <div class="popover popover-links" ref="popover">
      <div class="popover-inner">
        <div class="list list-text-color">
          <ul>
            <li @click="all(-1)">
              <a class="list-button item-link" href="#">全部</a>
            </li>
            <li @click="all(1)">
              <a class="list-button item-link" href="#">正常</a>
            </li>
            <li @click="all(0)">
              <a class="list-button item-link" href="#">异常</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { f7Searchbar, f7List, f7ListItem } from "framework7-vue";

export default {
  components: {
    [f7Searchbar.name]: f7Searchbar,
    [f7List.name]: f7List,
    [f7ListItem.name]: f7ListItem
  },
  data() {
    return {
      searchbar: null
    };
  },
  methods: {
    onKeydown(e) {
      if (e.keyCode === 13) {
        this.$emit("enter", e.target.value);
        this.$refs.searchInput.blur();
        e.preventDefault();
      }
    },
    showLoad() {
      console.log("close");
    },
    all(value) {
      this.$emit("status",value);
      this.$f7.popover.close(this.$refs.popover)
    }
  },
  mounted() {
    let self = this;
    this.searchbar = this.$f7.searchbar.create({
      el: ".searchbar",
      on: {
        disable() {
          self.$emit("enter", "");
        }
      }
    });
    this.$f7ready(f7 => {
      var $$ = this.Dom7;
      $$(".popover-about").on("popover:open", function(e, popover) {
        console.log("About popover open");
      });
      $$(".popover-about").on("popover:opened", function(e, popover) {
        console.log("About popover opened");
      });
      var dynamicPopover = f7.popover.create({
        targetEl: "a.dynamic-popover",
        content:
          '<div class="popover">' +
          '<div class="popover-inner">' +
          '<div class="block">' +
          "<p>Popover created dynamically.</p>" +
          '<p><a href="#" class="link popover-close">Close me</a></p>' +
          "</div>" +
          "</div>" +
          "</div>",
        on: {
          open: function(popover) {
            console.log("Popover open");
          },
          opened: function(popover) {
            console.log("Popover opened");
          }
        }
      });
      dynamicPopover.on("close", function(popover) {
        console.log("Popover close");
      });
      dynamicPopover.on("closed", function(popover) {
        console.log("Popover closed");
      });
      $$(".dynamic-popover").on("click", function() {
        dynamicPopover.open();
      });
    });
  },
  destroyed() {
    this.searchbar.destroyed();
  }
};
</script>


<style lang="scss">
.searchbar-inner {
  padding-left: 8px !important;
}
.searchbar-input-wrap {
  display: flex;
  align-items: center;
  height: 75% !important;
}
.searchbar input[type="search"],
.searchbar input[type="text"] {
  border-radius: 8px !important;
  font-size: 15px !important;
  padding-left: calc(var(--f7-searchbar-input-padding-horizontal)) !important;
}
.searchbar {
  background-color: #f7f7f8 !important;
}
.searchbar::after{
  height: 0px;
}
.page-content {
  overflow-x: hidden !important;
}
.searchbar:not(.searchbar-inline) {
  border-radius: 0 !important;
  margin: 0 !important;
}
.searchbar:not(.searchbar-inline) {
  box-shadow: none !important;
}
.md .searchbar-disable-button::after {
  padding-left: 8px;
}
.head-row {
  display: flex;
  flex-direction: row;
}
.icon-bg {
  background-color: #f7f7f8;
  justify-content: center;
  width: 40px;
  display: flex;
  align-items: center;
}
:root {
  --f7-popover-width: 100px !important;
}
.ios {
  --f7-popover-bg-color: rgba(0, 0, 0, 0.7) !important;
  --f7-popover-border-radius: 4px !important;
}
.md {
  --f7-popover-bg-color: rgba(0, 0, 0, 0.7) !important;
}
.list-text-color {
  color: #ffffff !important;
}
.ios .popover-angle::after {
  width: 22px !important;
  height: 22px !important;
}
.ios .popover-angle {
  left: 74px !important;
}
</style>
