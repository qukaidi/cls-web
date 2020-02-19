<template>
  <div class="head-row">
    <div class="date-select" @click="onOpenCalendarDialog">
      <div v-if="!startDateVal" class="all">全部</div>
      <div v-else class="label-box">
        <div class="label">{{startDateVal|dateToMonthAndWeek}}</div>
        <div class="label">{{endDateVal|dateToMonthAndWeek}}</div>
      </div>
    </div>
    <form class="searchbar">
      <div class="searchbar-inner">
        <div class="searchbar-input-wrap">
          <input
            type="search"
            placeholder="人员/车间/产线/工作台"
            @keydown="onKeydown"
            style="padding-right: 5px;"
            ref="searchInput"
          />
          <i class="searchbar-icon"></i>
          <span class="input-clear-button"></span>
        </div>
        <span class="searchbar-disable-button if-not-aurora">Cancel</span>
      </div>
    </form>
    <div class="icon-bg popover-open" href="#" data-popover=".popover-links">
      <img src="../../assets/funnel.png" style="width: 20px;" />
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
import { f7Searchbar } from "framework7-vue";

export default {
  components: {
    [f7Searchbar.name]: f7Searchbar
  },
  data() {
    return {
      searchbar: null,
      picker: null,
      startDateVal: null,
      endDateVal: null,
      isInited: false,
      lastDate: null,
      isCurrentLeft: true,
      isActived: true,
      leftDateDoms: null,
      rightDateDoms: null
    };
  },
  methods: {
    onKeydown(e) {
      if (e.keyCode === 13) {
        this.$emit("enter", e.target.value);
        setTimeout(() => {
          this.$refs.searchInput.blur();
        }, 500);
        e.preventDefault();
      }
    },
    showLoad() {
      console.log("close");
    },
    all(value) {
      this.$emit("status", value);
      this.$f7.popover.close(this.$refs.popover);
    },
    onOpenCalendarDialog() {
      this.picker.open();
    },
    getDateWithDays(year, month) {
      let date = new Date();
      year = year ? year : date.getFullYear();
      month = month ? month : date.getMonth() + 1;
      return new Date(year, month, 0);
    },
    getDateValueFromDom(dom) {
      return {
        year: parseInt(dom.year.text()),
        month: parseInt(dom.month.text()),
        day: parseInt(dom.day.text())
      };
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

    let date = new Date();
    this.picker = this.$f7.picker.create({
      value: [date.getFullYear(), date.getMonth() + 1, date.getDate()],
      cols: [
        {
          values: (function() {
            const date = new Date();
            let countYear = date.getFullYear() - 2010;
            console.log(countYear);
            return [...Array(countYear).keys()].map(value => 2011 + value);
          })(),
          displayValues: (function() {
            const date = new Date();
            let countYear = date.getFullYear() - 2010;
            return [...Array(countYear).keys()].map(
              value => 2011 + value + "年"
            );
          })()
        },
        {
          values: (function() {
            const date = new Date();
            return [...Array(date.getMonth() + 1).keys()].map(
              value => value + 1
            );
          })(),
          displayValues: (function() {
            const date = new Date();
            return [...Array(date.getMonth() + 1).keys()].map(
              value => value + 1 + "月"
            );
          })()
        },
        {
          values: (function() {
            const date = new Date();
            return [...Array(new Date().getDate()).keys()].map(
              value => value + 1
            );
          })(),
          displayValues: (function() {
            return [...Array(new Date().getDate()).keys()].map(
              value => value + 1 + "日"
            );
          })()
        }
      ],
      routableModals: false,
      renderToolbar() {
        let date = {};
        if (self.startDateVal) {
          date.start = {
            year: self.startDateVal[0],
            month: self.startDateVal[1],
            day: self.startDateVal[2]
          };
          date.end = {
            year: self.endDateVal[0],
            month: self.endDateVal[1],
            day: self.endDateVal[2]
          };
        } else {
          let dateObj = new Date();
          date.start = {
            year: dateObj.getFullYear(),
            month: dateObj.getMonth() + 1,
            day: dateObj.getDate()
          };
          date.end = {
            year: date.start.year,
            month: date.start.month,
            day: date.start.day
          };
        }
        return `<div class="toolbar calendar-custom-toolbar no-shadow">
          <div class="header"> <div class="left actived">
          <span class="year">${date.start.year}</span>-<span class="month">${date.start.month}</span>-<span class="day">${date.start.day}</span></div>
          <div class="right">
          <span class="year">${date.end.year}</span>-<span class="month">${date.end.month}</span>-<span class="day">${date.end.day}</span>
          </div></div><div class="footer"><button class="button-m cancel">取消</button>
          <button class="button-m all-year">全部</button><button class="button-m commit">确定</button></div></div>`;
      },
      on: {
        change(picker, value, displayValue) {
          if (self.isActived && self.isInited && self.lastDate) {
            self.isActived = false;
            value = [
              parseInt(value[0]),
              parseInt(value[1]),
              parseInt(value[2])
            ];
            let leftDateValue = self.getDateValueFromDom(self.leftDateDoms);
            let rightDateValue = self.getDateValueFromDom(self.rightDateDoms);
            const date = new Date();
            if (self.isCurrentLeft) {
              if (self.lastDate[0] !== value[0]) {
                let monthList = [];
                let endMonthIndex =
                  rightDateValue.year === value[0] ? rightDateValue.month : 12;
                for (let index = 1; index <= endMonthIndex; index++) {
                  monthList.push(index);
                }
                picker.cols[1].replaceValues(
                  monthList,
                  monthList.map(value => value + "月")
                );

                let dayList = [];
                let dayCount = self
                  .getDateWithDays(value[0], value[1])
                  .getDate();
                let endDayIndex =
                  rightDateValue.year === value[0] &&
                  rightDateValue.month === value[1]
                    ? rightDateValue.day
                    : dayCount;
                for (let index = 1; index <= endDayIndex; index++) {
                  dayList.push(index);
                }
                picker.cols[2].replaceValues(
                  dayList,
                  dayList.map(value => value + "日")
                );
                const updateMonth =
                  (rightDateValue.year === value[0]
                    ? rightDateValue.month
                    : 12) >= value[1]
                    ? value[1]
                    : rightDateValue.month;
                const updateDay =
                  (leftDateValue.year === rightDateValue.year &&
                  rightDateValue.month === value[1]
                    ? rightDateValue.day
                    : dayCount) >= value[2]
                    ? value[2]
                    : rightDateValue.day;
                picker.setValue([value[0], updateMonth, updateDay], 0);
                self.leftDateDoms.year.text(value[0]);
                self.leftDateDoms.month.text(updateMonth);
                self.leftDateDoms.day.text(updateDay);
              } else if (self.lastDate[1] !== value[1]) {
                let dayList = [];
                let dayCount = self
                  .getDateWithDays(value[0], value[1])
                  .getDate();
                let endDayIndex =
                  rightDateValue.year === value[0] &&
                  rightDateValue.month === value[1]
                    ? rightDateValue.day
                    : dayCount;
                for (let index = 1; index <= endDayIndex; index++) {
                  dayList.push(index);
                }
                picker.cols[2].replaceValues(
                  dayList,
                  dayList.map(value => value + "日")
                );
                const updateDay =
                  endDayIndex >= value[2] ? value[2] : rightDateValue.day;
                self.leftDateDoms.month.text(value[1]);
                self.leftDateDoms.day.text(updateDay);
                picker.setValue([value[0], value[1], updateDay], 0);
              } else if (self.lastDate[2] !== value[2]) {
                self.leftDateDoms.day.text(value[2]);
              }
              self.lastDate = value;
            } else {
              if (self.lastDate[0] !== value[0]) {
                let monthList = [];
                let startMonthIndex =
                  leftDateValue.year === value[0] ? leftDateValue.month : 1;
                let endMonthIndex =
                  value[0] === date.getFullYear() ? date.getMonth() + 1 : 12;
                for (
                  let index = startMonthIndex;
                  index <= endMonthIndex;
                  index++
                ) {
                  monthList.push(index);
                }
                picker.cols[1].replaceValues(
                  monthList,
                  monthList.map(value => value + "月")
                );
                const updateMonth =
                  (rightDateValue.year === value[0]
                    ? rightDateValue.month
                    : 12) >= value[1]
                    ? value[1]
                    : rightDateValue.month;
                self.rightDateDoms.year.text(value[0]);
                self.rightDateDoms.month.text(updateMonth);
                picker.setValue([value[0], updateMonth, value[2]], 0);
              } else if (self.lastDate[1] !== value[1]) {
                let startDayIndex =
                  leftDateValue.year === value[0] &&
                  leftDateValue.month === value[1]
                    ? leftDateValue.day
                    : 1;
                let dayList = [];
                let dayCount = self
                  .getDateWithDays(value[0], value[1])
                  .getDate();
                let endDayIndex =
                  value[0] === date.getFullYear() &&
                  value[1] === date.getMonth() + 1
                    ? date.getDate()
                    : dayCount;
                for (let index = startDayIndex; index <= endDayIndex; index++) {
                  dayList.push(index);
                }
                picker.cols[2].replaceValues(
                  dayList,
                  dayList.map(value => value + "日")
                );
                self.rightDateDoms.month.text(value[1]);
                const updateDay =
                  value[0] === date.getFullYear() &&
                  value[1] === date.getMonth() + 1
                    ? value[2] <= date.getDate()
                      ? value[2]
                      : date.getDate()
                    : value[2] <= dayCount
                    ? value[2]
                    : 1;
                self.rightDateDoms.day.text(updateDay);
                picker.setValue([value[0], value[1], updateDay], 0);
              } else if (self.lastDate[2] !== value[2]) {
                self.rightDateDoms.day.text(value[2]);
              }
              self.lastDate = value;
            }
            self.isActived = true;
          }
        },
        open: function(picker) {
          if (!self.isInited) {
            let $$ = self.Dom7;
            self.leftDateDoms = {
              box: $$(".calendar-custom-toolbar .header .left"),
              year: $$(".calendar-custom-toolbar .header .left .year"),
              month: $$(".calendar-custom-toolbar .header .left .month"),
              day: $$(".calendar-custom-toolbar .header .left .day")
            };
            self.rightDateDoms = {
              box: $$(".calendar-custom-toolbar .header .right"),
              year: $$(".calendar-custom-toolbar .header .right .year"),
              month: $$(".calendar-custom-toolbar .header .right .month"),
              day: $$(".calendar-custom-toolbar .header .right .day")
            };

            self.rightDateDoms.box.on("click", function() {
              if (self.isCurrentLeft) {
                self.isActived = false;
                self.leftDateDoms.box.removeClass("actived");
                self.rightDateDoms.box.addClass("actived");
                let leftDateValue = self.getDateValueFromDom(self.leftDateDoms);
                let rightDateValue = self.getDateValueFromDom(
                  self.rightDateDoms
                );
                let date = new Date();
                let yearList = [];
                for (
                  let index = leftDateValue.year;
                  index <= date.getFullYear();
                  index++
                ) {
                  yearList.push(index);
                }
                picker.cols[0].replaceValues(
                  yearList,
                  yearList.map(value => value + "年")
                );
                let monthList = [];
                let startMonthIndex =
                  leftDateValue.year === rightDateValue.year
                    ? leftDateValue.month
                    : 1;
                let endMonthIndex =
                  rightDateValue.year === date.getFullYear()
                    ? date.getMonth() + 1
                    : 12;
                for (
                  let index = startMonthIndex;
                  index <= endMonthIndex;
                  index++
                ) {
                  monthList.push(index);
                }
                picker.cols[1].replaceValues(
                  monthList,
                  monthList.map(value => value + "月")
                );
                let startDayIndex =
                  leftDateValue.month === rightDateValue.month
                    ? leftDateValue.day
                    : 1;
                let dayList = [];
                let dayCount = self
                  .getDateWithDays(rightDateValue.year, rightDateValue.month)
                  .getDate();
                let endDayIndex =
                  rightDateValue.year === date.getFullYear() &&
                  rightDateValue.month === date.getMonth() + 1
                    ? date.getDate()
                    : dayCount;
                for (let index = startDayIndex; index <= endDayIndex; index++) {
                  dayList.push(index);
                }
                picker.cols[2].replaceValues(
                  dayList,
                  dayList.map(value => value + "日")
                );
                picker.setValue(
                  [
                    rightDateValue.year,
                    rightDateValue.month,
                    rightDateValue.day
                  ],
                  0
                );
                self.lastDate = [
                  rightDateValue.year,
                  rightDateValue.month,
                  rightDateValue.day
                ];
                self.isActived = true;
                self.isCurrentLeft = false;
              }
            });
            self.leftDateDoms.box.on("click", function() {
              if (!self.isCurrentLeft) {
                self.isActived = false;
                self.rightDateDoms.box.removeClass("actived");
                self.leftDateDoms.box.addClass("actived");

                let leftDateValue = self.getDateValueFromDom(self.leftDateDoms);
                let rightDateValue = self.getDateValueFromDom(
                  self.rightDateDoms
                );
                let yearList = [];
                for (let index = 2011; index <= rightDateValue.year; index++) {
                  yearList.push(index);
                }
                picker.cols[0].replaceValues(
                  yearList,
                  yearList.map(value => value + "年")
                );
                let monthList = [];
                let endMonthIndex =
                  leftDateValue.year === rightDateValue.year
                    ? rightDateValue.month
                    : 12;
                for (let index = 1; index <= endMonthIndex; index++) {
                  monthList.push(index);
                }
                picker.cols[1].replaceValues(
                  monthList,
                  monthList.map(value => value + "月")
                );
                let dayList = [];
                let dayCount = self
                  .getDateWithDays(leftDateValue.year, leftDateValue.month)
                  .getDate();
                let endDayIndex =
                  leftDateValue.year === rightDateValue.year &&
                  leftDateValue.month === rightDateValue.month
                    ? rightDateValue.day
                    : dayCount;
                for (let index = 1; index <= endDayIndex; index++) {
                  dayList.push(index);
                }
                picker.cols[2].replaceValues(
                  dayList,
                  dayList.map(value => value + "日")
                );
                picker.setValue(
                  [leftDateValue.year, leftDateValue.month, leftDateValue.day],
                  0
                );
                self.lastDate = [
                  leftDateValue.year,
                  leftDateValue.month,
                  leftDateValue.day
                ];
                self.isActived = true;
                self.isCurrentLeft = true;
              }
            });
            $$(".calendar-custom-toolbar .footer .cancel").on(
              "click",
              function() {
                picker.close();
              }
            );
            $$(".calendar-custom-toolbar .footer .all-year").on(
              "click",
              function() {
                self.startDateVal = null;
                self.endDateVal = null;
                picker.close();
                self.$emit("date", null);
              }
            );
            $$(".calendar-custom-toolbar .footer .commit").on(
              "click",
              function() {
                let leftDateValue = self.getDateValueFromDom(self.leftDateDoms);
                let rightDateValue = self.getDateValueFromDom(
                  self.rightDateDoms
                );
                self.startDateVal = [
                  leftDateValue.year,
                  leftDateValue.month,
                  leftDateValue.day
                ];
                self.endDateVal = [
                  rightDateValue.year,
                  rightDateValue.month,
                  rightDateValue.day
                ];
                picker.close();
                self.$emit("date", {
                  startDate: new Date(
                    self.startDateVal[0],
                    self.startDateVal[1] - 1,
                    self.startDateVal[2]
                  ),
                  endDate: new Date(
                    self.endDateVal[0],
                    self.endDateVal[1] - 1,
                    self.endDateVal[2]
                  )
                });
              }
            );
          }
        },
        opened(picker) {
          if (!self.isInited) {
            let date = {};
            if (self.startDateVal) {
              date.start = {
                year: self.startDateVal[0],
                month: self.startDateVal[1],
                day: self.startDateVal[2]
              };
              date.end = {
                year: self.endDateVal[0],
                month: self.endDateVal[1],
                day: self.endDateVal[2]
              };
              let yearList = [];
              for (let index = 2011; index <= date.end.year; index++) {
                yearList.push(index);
              }
              picker.cols[0].replaceValues(
                yearList,
                yearList.map(value => value + "年")
              );
              let monthList = [];
              let endMonthIndex =
                date.start.year === date.end.year ? date.end.month : 12;
              for (let index = 1; index <= endMonthIndex; index++) {
                monthList.push(index);
              }
              picker.cols[1].replaceValues(
                monthList,
                monthList.map(value => value + "月")
              );
              let dayList = [];
              let dayCount = self
                .getDateWithDays(date.start.year, date.start.month)
                .getDate();
              let endDayIndex =
                date.start.year === date.end.year &&
                date.start.month === date.end.month
                  ? date.end.day
                  : dayCount;
              for (let index = 1; index <= endDayIndex; index++) {
                dayList.push(index);
              }
              picker.cols[2].replaceValues(
                dayList,
                dayList.map(value => value + "日")
              );
            } else {
              let dateObj = new Date();
              date.start = {
                year: dateObj.getFullYear(),
                month: dateObj.getMonth() + 1,
                day: dateObj.getDate()
              };
              const days = self.getDateWithDays(
                date.start.year,
                date.start.month,
                date.start.day
              );
              date.end = {
                year: date.start.year,
                month: date.start.month,
                day: date.start.day
              };
              let yearList = [
                ...Array(dateObj.getFullYear() - 2010).keys()
              ].map(value => 2011 + value);
              picker.cols[0].replaceValues(
                yearList,
                yearList.map(value => value + "年")
              );
              let monthList = [...Array(dateObj.getMonth() + 1).keys()].map(
                value => value + 1
              );
              picker.cols[1].replaceValues(
                monthList,
                monthList.map(value => value + "月")
              );
              let dayList = [...Array(dateObj.getDate()).keys()].map(
                value => value + 1
              );
              picker.cols[2].replaceValues(
                dayList,
                dayList.map(value => value + "日")
              );
            }
            picker.setValue(
              [date.start.year, date.start.month, date.start.day],
              0
            );
            self.lastDate = [date.start.year, date.start.month, date.start.day];
            self.isInited = true;
          }
        },
        closed() {
          self.isInited = false;
          self.isCurrentLeft = true;
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
          "</div>"
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
  },
  filters: {
    dateToMonthAndWeek(value) {
      let date = new Date(value);
      return `${date.getMonth() + 1}-${date.getDate()}`;
    }
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
.searchbar::after {
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
  width: 45px;
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
.date-select {
  background-color: #f7f7f8;
  width: 50px;
  text-align: center;
  .all {
    line-height: 47px;
  }
  .label-box {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 5px;
    .label {
      font-size: 13px;
    }
  }
}
.calendar-custom-toolbar {
  display: flex;
  flex-direction: column;
  height: 65px !important;
  .header {
    order: 1;
    display: flex;
    height: 50%;
    text-align: center;
    font-size: 19px;
    .left {
      background: #ffffff;
      flex-grow: 1;
      opacity: 0.4;
    }
    .right {
      flex-grow: 1;
      background: #ffffff;
      opacity: 0.4;
    }
    .actived {
      border-bottom: gray 4px solid;
      opacity: 1;
    }
  }
  .footer {
    order: 0;
    display: flex;
    height: 50%;
    text-align: center;
    .button-m {
      align-items: center;
      flex-grow: 1;
      border: none;
      border-right: 1px white solid;
      background-color: #4682b4;
      color: aliceblue;
      font-size: 15px;
    }
  }
}
</style>
