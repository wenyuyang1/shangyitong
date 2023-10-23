<script setup lang='ts'>
import left from "./left.vue"
import {useLogin} from "@/store/login"
const store = useLogin()

</script>

<template>
        <el-dialog
        v-model="store.loginVisible"
        title='推荐使用微信登录'
        custom-class="loginDialog"
        width="50%"
  >
  <div class="container">   
      <left></left> 
        <div class="right">
 
          <div class="QRCode">
            <div class="attention">
        <img src="@/assets/images/code_login_wechat.png" alt="">
        <svg t="1697278518345" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4177" width="28" height="28"><path d="M352.814545 385.396364m-33.512727 0a33.512727 33.512727 0 1 0 67.025455 0 33.512727 33.512727 0 1 0-67.025455 0Z" fill="#50B674" p-id="4178"></path><path d="M502.690909 384.465455m-33.512727 0a33.512727 33.512727 0 1 0 67.025454 0 33.512727 33.512727 0 1 0-67.025454 0Z" fill="#50B674" p-id="4179"></path><path d="M576.232727 534.341818m-23.272727 0a23.272727 23.272727 0 1 0 46.545455 0 23.272727 23.272727 0 1 0-46.545455 0Z" fill="#50B674" p-id="4180"></path><path d="M694.458182 536.203636m-23.272727 0a23.272727 23.272727 0 1 0 46.545454 0 23.272727 23.272727 0 1 0-46.545454 0Z" fill="#50B674" p-id="4181"></path><path d="M512 0C229.003636 0 0 229.003636 0 512s229.003636 512 512 512 512-229.003636 512-512S794.996364 0 512 0z m-87.505455 630.225455c-26.996364 0-48.407273-5.585455-75.403636-11.17091l-75.403636 37.236364 21.410909-64.232727c-53.992727-37.236364-85.643636-85.643636-85.643637-145.221818 0-102.4 96.814545-182.458182 215.04-182.458182 105.192727 0 198.283636 64.232727 216.901819 150.807273-6.516364-0.930909-13.963636-0.930909-20.48-0.93091-102.4 0-182.458182 76.334545-182.458182 170.356364 0 15.825455 2.792727 30.72 6.516363 44.683636-7.447273 0-13.963636 0.930909-20.48 0.93091z m314.647273 75.403636l15.825455 53.992727-58.647273-32.581818c-21.410909 5.585455-42.821818 11.170909-64.232727 11.170909-102.4 0-182.458182-69.818182-182.458182-155.461818s80.058182-155.461818 182.458182-155.461818c96.814545 0 182.458182 69.818182 182.458182 155.461818 0 47.476364-31.650909 90.298182-75.403637 122.88z" fill="#50B674" p-id="4182"></path></svg>
        <p>快速扫一扫关注  </p> <p> "快速预约挂号"</p>
      </div>
      <div class="download">
        <img src="@/assets/images/code_app.png" alt="">
        <p>扫一扫下载 </p> <p>"预约挂号"APP</p>
      </div>
          </div>

      <div class="tagline">
        <p>官 方 指 定 平 台</p>
      <p>快 速 挂 号 &nbsp;&nbsp;安 全 放 心</p>
      </div>
    </div>

    </div>

  </el-dialog>
</template>

<style lang='less' scoped>
.loginDialog{
  background-color: red;
}


.container{
  display: flex;
}
   .right{
    height: 100%;
      width: 46%;
      margin: 0 2%;
      margin-top: 20px;
   }
   .QRCode{
    display: flex;
    height: 70%;
    margin-bottom: 60px;
    .attention{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
    width: 40%; 
    margin-left: 6%;
    img{
      width: 100%;
      margin-bottom: 10px;
    }
   }
   .download{
    display: flex;
        flex-direction: column;
        align-items: center;
    width: 40%;
    margin-left: 8%;
    img{
      width: 100%;
      margin-bottom: 38px;

    }
   }
   }
 .tagline{
   display: flex;
   flex-direction: column;
   align-items: center;
   font-size: 25px;
   font-style: oblique;
   p{
    margin: 3px 0;
   }
 }
</style>