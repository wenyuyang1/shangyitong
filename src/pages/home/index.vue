<script setup lang="ts">
import carousel from "./carousel.vue";
import search from "./search.vue";
import container from "./container/container.vue";

</script>

<template>
  <div class="home">
    <carousel></carousel>
    <search></search>
    <div  class="container">
      <container></container>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home {
  width: 1300px;

  .container {
    margin: 10px 0;
    min-height: 60vh;
    max-height: 160vh;
  }
}
</style>
