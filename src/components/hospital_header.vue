<script setup lang="ts">
// vue3更新了可不用加name
// import { defineOptions } from "vue";
// defineOptions({
//   name: "hospitalHeader",
// });
import {useLogin} from "@/store/login";
const store = useLogin();
import {useRouter} from "vue-router";
const $router = useRouter();
const goHome = () => {
  $router.push({
    path: "/"
  });
}
// 是否显示登录框表单
function visibleLoginForm(){
      store.changeLoginVisible(true)
}

/* 退出登录 */
function loginOut(){
  store.loginOut()
  location.reload()
}
</script>

<template>
  <div class="top">
    <div class="container">
      <div class="left" @click="goHome">
        <img src="@/assets/images/logo.png" alt="" />
        <p>预约挂号 统一平台</p>
      </div>
      <div class="right">
        <div class="helpCenter">帮助中心</div>
        <div  @click="visibleLoginForm" v-if="!store.token">登录/注册</div>

        <el-dropdown v-else>
      <div class="myCenter">
        {{store.name}}<el-icon class="el-icon--right">
          <svg t="1697344122920" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4100" width="16" height="16"><path d="M857.088 224.256q28.672-28.672 69.12-28.672t69.12 28.672q29.696 28.672 29.696 68.608t-29.696 68.608l-382.976 380.928q-12.288 14.336-30.72 19.968t-38.912 4.608-40.448-8.704-34.304-22.016l-376.832-374.784q-29.696-28.672-29.696-68.608t29.696-68.608q14.336-14.336 32.256-21.504t36.864-7.168 37.376 7.168 32.768 21.504l313.344 309.248z" p-id="4101"></path></svg>
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item  @click="$router.push('/user/realName')" >实名认证</el-dropdown-item>
          <el-dropdown-item  @click="$router.push('/user/registrationList')">挂号订单</el-dropdown-item>
          <el-dropdown-item  @click="$router.push('/user/clientList')">就诊人管理</el-dropdown-item>
          <hr>
          <el-dropdown-item style="color:red;" @click="loginOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.top {
  height: 10vh;
  width: 100%;
  background-color: #fff;
  border-bottom: 2px solid #f0f0f0;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;

  .container {
    width: 1300px;
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;
       
      img {
        width: 80px;
        height: 80px;
      }

      p {
        margin-left: 10px;
        color: #7cbbfe;
        font-size: 20px;
      }
    }

    .right {
      display: flex;
      align-items: center;
      color: darkgray;

      .helpCenter {
        margin-right: 10px;
      }
    }
  }
}
.myCenter{
  display: flex;
  align-items: center;
  position: relative;
  top: 1px;
}
</style>
