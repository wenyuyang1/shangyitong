<script setup lang='ts'>
import { onMounted,ref } from 'vue';
import {useRoute} from 'vue-router';
import {getOrderInfo,reqCloseRegistration,getQRCode,getPayStatus} from '@/api/user';
import type {orderInfoData,orderInfoResponseData,closeRegistrationData, payQrCodeData, payStatusData } from '@/api/user/type';
 const route = useRoute();

// 使用把字符串转二维码的工具进行转换
import QRCode from 'qrcode';
import { ElMessage } from 'element-plus';
// 存储挂号信息详情
const orderInfo = ref<orderInfoData>({});


 onMounted(async()=>{
    let res:orderInfoResponseData = await getOrderInfo(route.query.orderId)
    if(res.code === 200){
        // 处理就诊日期和退号提醒并且存入数据
        let arr = res.data.fetchTime.split('')
        arr.splice(10,0,' ')
        res.data.fetchTime = arr.join('')
      if(new Date(res.data.quitTime) -new Date() > 0){
        res.data.isOld = false
      }else{
        res.data.isOld = true
      }
      orderInfo.value = res.data
    }
})


// 控制二维码是否显示
const QRCodeVisible = ref<boolean>(false)
// 设置持续查询支付状态的定时器
let timer:any = null
// 设置存储支付二维码的图片地址
let QRCodeImg = ref<string>('')

// 支付
async function payRegistration(){
        let QRCodeResult:payQrCodeData = await getQRCode(route.query.orderId)
        console.log(QRCodeResult);
        if(QRCodeResult.code === 200){
            QRCodeVisible.value = true
            QRCode.toDataURL(QRCodeResult.data.codeUrl, function (err, url) {
              QRCodeImg.value = url
        }) 
        // 开启定时器持续查询是否支付
        timer = setInterval(async()=>{
            let payResult:payStatusData = await getPayStatus(route.query.orderId)
            if(payResult.data === true){
                clearInterval(timer)
                ElMessage({
                message: '支付成功',
                type: 'success',
              })
              location.reload()
            }
        },2800)
        }else{
            ElMessage({
    message: '获取支付二维码失败',
    type: 'error',
  })
        }
}

// 关闭支付二维码
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('您确定要暂时关闭支付二维码吗?')
    .then(() => {
        clearInterval(timer)
        timer = null
      done()
    })
    .catch(() => { })
}

// 取消预约
async function closeRegistration(){
      let res:closeRegistrationData = await reqCloseRegistration(route.query.orderId)
      if(res.code === 200){
        location.reload()
      }
}
</script>

<template>
       <!-- 设置二维码显示页面 -->
   <el-dialog
    v-model="QRCodeVisible"
    title="请使用微信扫描二维码进行支付"
    width="26%"
    center
    :before-close="handleClose"
  >
    <div 
    class="qrcodeDialog"><img :src="QRCodeImg" alt="">
     <p>请使用微信扫一扫</p>
     <p>扫描二维码支付</p>        
</div>
  </el-dialog> 
<div>  
      <h2>挂号详情</h2>
      <div class="registrationState">
        <!-- 已预约，未支付 -->
        <div class="left" v-if="orderInfo.orderStatus  ===0"><svg t="1697787659958" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8005" width="30" height="30"><path d="M512 1024a141.387642 141.387642 0 0 1-70.693821-18.851686L120.356231 819.81268a141.387642 141.387642 0 0 1-70.693822-122.418134v-371.142561A141.387642 141.387642 0 0 1 120.356231 203.833851L441.306179 18.969509a141.387642 141.387642 0 0 1 141.387642 0l320.949948 185.335634a141.387642 141.387642 0 0 1 70.693822 122.418134v370.671269a141.387642 141.387642 0 0 1-70.693822 122.418134L582.693821 1005.148314a141.387642 141.387642 0 0 1-70.693821 18.851686z m0-976.752963a94.258428 94.258428 0 0 0-47.129214 12.607065L143.920838 245.189737a94.258428 94.258428 0 0 0-47.129214 81.651363v370.553446a94.258428 94.258428 0 0 0 47.129214 81.651364l320.949948 185.217811a94.258428 94.258428 0 0 0 94.258428 0l320.949948-185.335634a94.258428 94.258428 0 0 0 47.129214-81.651364V326.251985a94.258428 94.258428 0 0 0-47.129214-81.651364L559.129214 59.854102a94.258428 94.258428 0 0 0-47.129214-12.607065z" fill="#4990f1" p-id="8006"></path><path d="M344.337821 473.17731l159.650213 159.414567a22.5042 22.5042 0 1 1-31.81222 31.812219L312.525601 504.753883a22.409941 22.409941 0 1 1 31.81222-31.576573z" fill="#4990f1" p-id="8007"></path><path d="M471.586699 632.591877l240.712461-241.301577a22.5042 22.5042 0 1 1 31.81222 31.81222L502.809803 664.404096a22.5042 22.5042 0 0 1-31.812219-31.812219z" fill="#4990f1" p-id="8008"></path></svg>     
            {{orderInfo.param?.orderStatusString}}</div>
            <!-- 已支付 -->
            <div class="left" v-if="orderInfo.orderStatus  ===1"><svg t="1697787659958" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8005" width="30" height="30"><path d="M512 1024a141.387642 141.387642 0 0 1-70.693821-18.851686L120.356231 819.81268a141.387642 141.387642 0 0 1-70.693822-122.418134v-371.142561A141.387642 141.387642 0 0 1 120.356231 203.833851L441.306179 18.969509a141.387642 141.387642 0 0 1 141.387642 0l320.949948 185.335634a141.387642 141.387642 0 0 1 70.693822 122.418134v370.671269a141.387642 141.387642 0 0 1-70.693822 122.418134L582.693821 1005.148314a141.387642 141.387642 0 0 1-70.693821 18.851686z m0-976.752963a94.258428 94.258428 0 0 0-47.129214 12.607065L143.920838 245.189737a94.258428 94.258428 0 0 0-47.129214 81.651363v370.553446a94.258428 94.258428 0 0 0 47.129214 81.651364l320.949948 185.217811a94.258428 94.258428 0 0 0 94.258428 0l320.949948-185.335634a94.258428 94.258428 0 0 0 47.129214-81.651364V326.251985a94.258428 94.258428 0 0 0-47.129214-81.651364L559.129214 59.854102a94.258428 94.258428 0 0 0-47.129214-12.607065z" fill="#4990f1" p-id="8006"></path><path d="M344.337821 473.17731l159.650213 159.414567a22.5042 22.5042 0 1 1-31.81222 31.812219L312.525601 504.753883a22.409941 22.409941 0 1 1 31.81222-31.576573z" fill="#4990f1" p-id="8007"></path><path d="M471.586699 632.591877l240.712461-241.301577a22.5042 22.5042 0 1 1 31.81222 31.81222L502.809803 664.404096a22.5042 22.5042 0 0 1-31.812219-31.812219z" fill="#4990f1" p-id="8008"></path></svg>     
            {{orderInfo.param?.orderStatusString}}</div> 
            <!--  已取消-->
            <div class="left" v-if="orderInfo.orderStatus  === -1"><svg t="1697787659958" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8005" width="30" height="30"><path d="M512 1024a141.387642 141.387642 0 0 1-70.693821-18.851686L120.356231 819.81268a141.387642 141.387642 0 0 1-70.693822-122.418134v-371.142561A141.387642 141.387642 0 0 1 120.356231 203.833851L441.306179 18.969509a141.387642 141.387642 0 0 1 141.387642 0l320.949948 185.335634a141.387642 141.387642 0 0 1 70.693822 122.418134v370.671269a141.387642 141.387642 0 0 1-70.693822 122.418134L582.693821 1005.148314a141.387642 141.387642 0 0 1-70.693821 18.851686z m0-976.752963a94.258428 94.258428 0 0 0-47.129214 12.607065L143.920838 245.189737a94.258428 94.258428 0 0 0-47.129214 81.651363v370.553446a94.258428 94.258428 0 0 0 47.129214 81.651364l320.949948 185.217811a94.258428 94.258428 0 0 0 94.258428 0l320.949948-185.335634a94.258428 94.258428 0 0 0 47.129214-81.651364V326.251985a94.258428 94.258428 0 0 0-47.129214-81.651364L559.129214 59.854102a94.258428 94.258428 0 0 0-47.129214-12.607065z" fill="#4990f1" p-id="8006"></path><path d="M344.337821 473.17731l159.650213 159.414567a22.5042 22.5042 0 1 1-31.81222 31.812219L312.525601 504.753883a22.409941 22.409941 0 1 1 31.81222-31.576573z" fill="#4990f1" p-id="8007"></path><path d="M471.586699 632.591877l240.712461-241.301577a22.5042 22.5042 0 1 1 31.81222 31.81222L502.809803 664.404096a22.5042 22.5042 0 0 1-31.812219-31.812219z" fill="#4990f1" p-id="8008"></path></svg>     
            已{{orderInfo.param?.orderStatusString}}</div>
        <div class="right">
            <img src="@/assets/images/code_login_wechat.png" alt="">
            <div>
                <p >微信关注“北京114预约挂号”</p>
            <p ><svg t="1697788272755" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9440" width="20" height="20"><path d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z" fill="#28C445" p-id="9441"></path><path d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z" fill="#28C445" p-id="9442"></path></svg>
                快速挂号，轻松就医</p>
            </div>
        </div>
      </div>


      <div class="client">
        <div class="block"></div>
        <h4>挂号信息</h4>
    </div>


    <ul class="registrationDetail">
<li>就诊人信息： &nbsp;<em>{{orderInfo.patientName}}</em></li>
<li v-if="orderInfo.reserveTime">就诊日期： &nbsp;<em>{{orderInfo.reserveDate}} 下午</em></li>
<li v-else>就诊日期： &nbsp;<em>{{orderInfo.reserveDate}} 上午</em></li>
<li>就诊医院： &nbsp;<em>{{orderInfo.hosname}}</em></li>
<li>就诊科室： &nbsp;<em>{{orderInfo.depname}}</em></li>
<li>医生职称： &nbsp;<em>{{orderInfo.title}}</em></li>
<li>医事服务费： &nbsp;<i>￥{{orderInfo.amount}}</i></li>
<li>挂号单号： &nbsp;<em>{{orderInfo.outTradeNo}}</em></li>
<li>挂号时间： &nbsp;<em>{{orderInfo.createTime}}</em></li>
    </ul>

    <div class="notice">
        <h4>注意事项</h4>
<ul>
    <li>1、请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；</li>
    <li class="warning">2、【取号】就诊当天需在{{orderInfo.fetchTime}}在医院取号，未取号视为爽约，该号不退不换；</li>
    <li v-if="orderInfo.isOld">3、【退号】在{{orderInfo.quitTime}}前可在线退号 ，逾期将不可办理退号退费；<em>(当前时间已经无法退号退费，请仔细确认就诊时间)</em></li>
    <li v-else>3、【退号】在{{orderInfo.quitTime}}前可在线退号 ，逾期将不可办理退号退费；</li>
    <li>4、北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；</li>
    <li>5、请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</li>
</ul>
    </div>

    <div class="handleRegistration" v-if="orderInfo.orderStatus ===0" >
        <el-button plain  @click="closeRegistration">取消预约</el-button>
        <el-button type="primary"  @click="payRegistration">支付</el-button>
    </div>  
   </div>
</template>

<style lang='less' scoped>
.qrcodeDialog{
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
        width: 249px;
        height: 249px;
    }
    p{
        margin: 3px 0;
    }
}
.registrationState{
    display: flex;
    justify-content: space-between;
    height: 90px;
    margin-bottom: 40px;
    background-color: #f4f9ff;
    .left{
        margin-left: 30px;
        display: flex;
        align-items: center;
        color: #4990f1;
        svg{
            margin-right: 8px;
        }
    }
    .right{
        display: flex;
        align-items: center;
        color: #7f7f7f;
        img{
            width: 60px;
            height: 60px;
            margin-right: 5px;
        }
        p{
            margin: 3px 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        svg{
            margin: 1px 3px 0 0;
        }
        p:last-child{
            margin-left: -5px;
        }
    }
}
.registrationDetail{
    margin:60px 0 60px 150px;
    color: #7f7f7f;
    li{
        margin: 20px 0;
        em{
            font-style: normal;
            color: #333;
        }
        i{
           font-style: normal;
           color: #4990f1;
        }
    }
}
.notice{
    background-color: #fafafa;
    height: 250px;
    border: 1px solid #e5e5e5;
    padding-left: 40px;
    margin-bottom: 120px;
    h4{
        font-weight: 600;
        font-size: 15px;
        margin-top: 40px;
        margin-bottom: 15px;
    }
    li{
        color: #7f7f7f;
        margin: 5px 0;
        em{
            font-style: normal;
            color: #ff0000;
        }
    }
    .warning{
        color: #ff0000;
    }
}
.handleRegistration{
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
    .el-button{
        margin: 0 80px;
        padding: 20px 30px;
        font-size: 16px;
    }
    .el-button:first-child{
        margin-left: -40px;
    }
}

h2{
    margin: 40px 0 30px 0;
    font-weight: 600;
    font-size: 16px;
}
.client {
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    .block {
    margin-right: 10px;
    height: 14px;
    width: 4px;
    background-color: #4990f1;
    border-radius: 5px;
}
}
</style>