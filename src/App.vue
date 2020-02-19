<template>
  <f7-app :params="f7params">
    <f7-view main :push-state="true"></f7-view>
  </f7-app>
</template>
<script>
import { f7App, f7View } from "framework7-vue";
import RoomInspection from "./views/RoomInspection.vue";

import RoomDetails from "./views/RoomDetails.vue";
import InspectionReport from "./views/InspectionReport.vue";
import InspectionReportDetails from "./views/InspectionReportDetails.vue";
import MonthlyReport from "./views/MonthlyReport.vue";
import Roomstate from "./views/Roomstate.vue";
import { comroomAuth, shopfloorAuth } from "@/utils/auth";
import Error from "./views/Error.vue";
import Test from "./views/Del.vue";
import DevieceInspection from "./views/DevieceInspection.vue";
import DevieceDetails from "./views/DevieceDetails.vue";
import SicReport from "./views/SicReport.vue";
import SicReportDetails from "./views/SicReportDetails.vue";
import Sicstate from "./views/Sicstate";
import WeekReport from "./views/WeekReport";
import AnnualReport from "./views/AnnualReport";
export default {
  components: {
    [f7App.name]: f7App,
    [f7View.name]: f7View
  },
  data() {
    return {
      f7params: {
        name: "My App",
        id: "com.myapp.test",
        touch: {
          mdTouchRipple: false
        },
        dialog: {
          buttonOk: "确定",
          buttonCancel: "取消"
        },
        routes: [
          {
            path: "/roominspection",
            name: "roominspection",
            component: RoomInspection,
            beforeEnter: comroomAuth
          },
          {
            path: "/devieceinspection",
            name: "devieceinspection",
            component: DevieceInspection,
            beforeEnter: shopfloorAuth
          },
          {
            path: "/roomdetails",
            name: "/roomdetails",
            component: RoomDetails,
            beforeEnter: comroomAuth
          },
          {
            path: "/deviecedetails",
            name: "deviecedetails",
            component: DevieceDetails,
            beforeEnter: shopfloorAuth
          },
          {
            path: "/inspectionreport",
            name: "inspectionreport",
            component: InspectionReport,
            beforeEnter: comroomAuth
          },
          {
            path: "/sicreport",
            name: "sicreport",
            component: SicReport,
            beforeEnter: shopfloorAuth
          },
          {
            path: "/inspectionreportdetails",
            name: "inspectionreportdetails",
            component: InspectionReportDetails,
            beforeEnter: comroomAuth
          },
          {
            path: "/sicreportdetails",
            name: "sicreportdetails",
            component: SicReportDetails,
            beforeEnter: shopfloorAuth
          },
          {
            path: "/monthlyreport",
            name: "monthlyreport",
            component: MonthlyReport,
            beforeEnter: comroomAuth
          },
          {
            path: "/weekreport",
            name: "weekreport",
            component: WeekReport,
            beforeEnter: shopfloorAuth
          },
          {
            path: "/roomstate",
            name: "roomstate",
            component: Roomstate,
            beforeEnter: comroomAuth
          },
          {
            path: "/sicstate",
            name: "sicstate",
            component: Sicstate,
            beforeEnter: shopfloorAuth
          },
          {
            path: "/error",
            name: "Error",
            component: Error
          },
          {
            path: "/test",
            name: "Test",
            component: Test
          },
          {
            path: "/annual_report",
            name: "AnnualReport",
            component: AnnualReport,
            beforeEnter: shopfloorAuth
          }
        ]
      }
    };
  }
};
</script>

