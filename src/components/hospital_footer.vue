<script setup lang="ts">
// import { defineOptions } from "vue";
// defineOptions({
//   name: "hospitalFooter",
// });
</script>

<template>
  <div class="footer">
    <div class="container">
      <div class="left">京ICP备 13018369号 &nbsp;&nbsp;&nbsp; 电话挂号010-56253825</div>
      <div class="right"><a href="">联系我们</a><a href="">合作伙伴</a><a href="">用户协议</a><a href="">隐私协议</a></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.footer {
  display: flex;
  justify-content: center;
  height: 5vh;
  width: 100%;
  background-color: #f5f5f5;

  .container {
    width: 1300px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right{
      a{
        margin: 0 10px;
      }
    }
  }
}
</style>
