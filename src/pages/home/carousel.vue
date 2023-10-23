<script setup lang="ts"></script>

<template>
  <div>
    <el-carousel :interval="4000" height="350px">
      <el-carousel-item v-for="item in 4" :key="item">
        <img src="@/assets/images/web-banner-1.png" alt="" class="bannerImg" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style lang="less" scoped>
.bannerImg {
  width: 100%;
  height: 350px;
}
</style>
