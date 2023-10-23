<script setup lang='ts'>
import { reqWeixinLogin} from '@/api/login'
import { ref } from 'vue'
import {  reqSMS  } from '@/api/login/index'
import {useLogin} from '@/store/login'
import { useRouter,useRoute } from 'vue-router'
const route = useRoute()
const $router = useRouter()
const store = useLogin()
import {ElMessage} from 'element-plus'
// 是否为微信，如果为微信则为1，默认phoneLogin为0
const scene = ref<number>(0)
const phoneNumber = ref<string>('')
const hasSMS = ref<boolean>(false)
const SMSCode = ref<string>('')
const phoneNumberRule = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
// 提交手机号码
async function submitPhoneNumber(){
    if(phoneNumberRule.test(phoneNumber.value)){
      let res = await reqSMS(phoneNumber.value)
      hasSMS.value = true
      ElMessage({
    message: '手机号格式正确，但短信服务尚在处理，已为您输入好验证码，点击登录即可',
    type: 'success',
  })
  SMSCode.value = res.data
    }else{
        ElMessage({
    message: '请输入正确的手机号！！！',
    type: 'warning',
  })
    }
}


// 用手机登录
 function LoginNow() {
store.changeToken(SMSCode.value,phoneNumber.value)

  $router.push(route.fullPath)

}


// 用微信登录
async function useWeixinLogin() {
  scene.value = 1
  // 存储当前域名地址并转码
  const url =encodeURIComponent(location.origin)
  let {data} = await reqWeixinLogin(url)
   new WxLogin({
 self_redirect:true,
 id:"login_container", 
 appid: data.appid, 
 scope: data.scope, 
 redirect_uri: data.redirectUri,
  state: data.state,
 style: "",
 href: ""
 });



//  设置定时器来在微信登录成功时关闭登录页面并且从新刷新页面
let timer = setInterval(
  () =>{
    if(JSON.parse(localStorage.getItem('HospitalToken'))?.token || ''){
      clearInterval(timer)
      location.reload()
    }
  },1000)
}


</script>

<template>
    <!-- 登录手机号 -->
    <div class="left" v-if="scene == 0"> 
      <div class="phoneLogin" v-if="!hasSMS">
        <h4>手机号码</h4>
<el-input  placeholder="请输入手机号码" maxlength='11' v-model="phoneNumber"/>
<el-button type="primary" @click="submitPhoneNumber">获取验证码</el-button>

</div>
<!-- 登录验证码 -->
<div class="phoneLogin" v-if="hasSMS">
  <h4>验证码已发送至{{phoneNumber}}</h4>
<el-input  placeholder="请输入验证码" maxlength='6' v-model="SMSCode"/>
<el-button type="primary" @click="LoginNow">立即登录</el-button>
</div>

<!-- 使用第三方登录 -->
           <div class="weixinLogin" @click="useWeixinLogin">
            <svg t="1697278518345" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4177" width="38" height="38"><path d="M352.814545 385.396364m-33.512727 0a33.512727 33.512727 0 1 0 67.025455 0 33.512727 33.512727 0 1 0-67.025455 0Z" fill="#50B674" p-id="4178"></path><path d="M502.690909 384.465455m-33.512727 0a33.512727 33.512727 0 1 0 67.025454 0 33.512727 33.512727 0 1 0-67.025454 0Z" fill="#50B674" p-id="4179"></path><path d="M576.232727 534.341818m-23.272727 0a23.272727 23.272727 0 1 0 46.545455 0 23.272727 23.272727 0 1 0-46.545455 0Z" fill="#50B674" p-id="4180"></path><path d="M694.458182 536.203636m-23.272727 0a23.272727 23.272727 0 1 0 46.545454 0 23.272727 23.272727 0 1 0-46.545454 0Z" fill="#50B674" p-id="4181"></path><path d="M512 0C229.003636 0 0 229.003636 0 512s229.003636 512 512 512 512-229.003636 512-512S794.996364 0 512 0z m-87.505455 630.225455c-26.996364 0-48.407273-5.585455-75.403636-11.17091l-75.403636 37.236364 21.410909-64.232727c-53.992727-37.236364-85.643636-85.643636-85.643637-145.221818 0-102.4 96.814545-182.458182 215.04-182.458182 105.192727 0 198.283636 64.232727 216.901819 150.807273-6.516364-0.930909-13.963636-0.930909-20.48-0.93091-102.4 0-182.458182 76.334545-182.458182 170.356364 0 15.825455 2.792727 30.72 6.516363 44.683636-7.447273 0-13.963636 0.930909-20.48 0.93091z m314.647273 75.403636l15.825455 53.992727-58.647273-32.581818c-21.410909 5.585455-42.821818 11.170909-64.232727 11.170909-102.4 0-182.458182-69.818182-182.458182-155.461818s80.058182-155.461818 182.458182-155.461818c96.814545 0 182.458182 69.818182 182.458182 155.461818 0 47.476364-31.650909 90.298182-75.403637 122.88z" fill="#50B674" p-id="4182"></path></svg>
            <p>使用第三方账号登录</p>
           </div>
    </div>
     <div class="left" v-if="scene == 1">
      <div id="login_container"></div>
     </div>
</template>

<style lang='less' scoped>
   .left{
      display: inline-block;
      height: 450px;
      width: 46%;
      margin: 0 2%;
      overflow: hidden;
      background-color: #fff;
      box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
       h4{
        font-weight: 600;
        font-size: 17px;
        margin: 80px 0 20px 20%;
       }
       .el-input{
        margin: 30px 0 0 20%;
        width: 60%;
       }
       .el-button{
        margin-left: 20%;
        margin-top: 40px;
        width: 60%;
        height: 42px;
        line-height: 42px;
       }
       .weixinLogin{
        display: flex;
        color: #7f7f7f;
        margin-top: 50px;
        flex-direction: column;
        justify-content: center;
        svg{
            margin: 0 auto;
        }
        p{
            margin: 20px auto;
        }
       }
     }
    #login_container{
      display: flex;
      flex-direction: column;
      align-items: center;
       margin-top: 20px;
    }
</style>