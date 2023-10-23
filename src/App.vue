<script setup lang="ts">
import {useLogin} from "@/store/login";
const store = useLogin();

</script>

<template>
  <div class="container">
    <hospitalHeader></hospitalHeader>
    <div class="content">
      <router-view></router-view>
    </div>
    <hospitalFooter></hospitalFooter>

    <login v-if="store.loginVisible"></login>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 515vh;
  align-items: center;

  .content {
    width: 1300px;
    margin-top: 10vh;
    min-height: 85vh;
    max-height: 500vh;
  }
}
</style>
