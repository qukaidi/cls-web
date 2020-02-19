<template>
  <div>
    <div class="card">
      <div class="card-box">
        <div class="card-box1">
          <div class="con-text-font">巡查人员：</div>
          <div class="con-text-font2">{{chcker_name}}</div>
        </div>
        <div class="card-box1">
          <div class="con-text-font">巡查地点：</div>
          <div class="con-text-font2">{{room_name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["room_name", "chcker_name"]
};
</script>
<style lang="scss">
.card-content {
  font-size: 17px;
}
.card {
  background: #fff !important;
  position: relative !important;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2) !important;
  .card-box {
    padding-top: 10px;
    padding-bottom: 10px;
    .card-box1 {
      display: flex;
      align-items: center;
      padding-left: 16px;
      display: flex;
      flex-direction: row;

      .con-text-font {
        color: gray;
        height: 20px;
        font-size: 16px;
        min-width:80px;
      }
      .con-text-font2 {
        font-size: 16px;
        display: block;
        word-break: normal;
        width: auto;
        display: block;
        white-space: pre-wrap;
        word-wrap: break-word;
        overflow: hidden;
      }
    }
  }
}
</style>
