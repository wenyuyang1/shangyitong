<script setup lang='ts'>
import { onMounted,ref } from "vue";
import {getClientList,getScheduleDetail,createOrderId} from '@/api/user'
import type {clientListData,clientData, getScheduleDetailData,createOrderIdData} from '@/api/user/type'

import {useRouter,useRoute} from 'vue-router'
import { el } from "element-plus/es/locale";
const router = useRouter()
const route = useRoute()

// 存储就诊人列表
let clientList = ref<clientData[]>([])
// 存储选中了哪一个就诊人，默认第一个
let selectedClientIndex = ref<number>(0)
// 存储预约详情
let scheduleDetail = ref({})



// 获取就诊人列表 ，如果无就诊人重定向到注册就诊人列表
onMounted(async() =>{
    let clientResult:clientListData = await getClientList()
    
   if(clientResult.message === '未登陆'){
          router.push('/')
   }else if(clientResult.data.length === 0){
    router.push('/user/clientList')
   }else{
         clientList.value = clientResult.data
   }

   let getScheduleDetailResult:getScheduleDetailData = await getScheduleDetail(route.query.docId)
   if(getScheduleDetailResult.code === 200){
       scheduleDetail.value = getScheduleDetailResult.data
   }
   
})

// 改变选中的就诊人
function changeSelectedClient(index:number){
    selectedClientIndex.value = index
    
}


// 点击确认时记录信息，生成订单，提交订单跳转
async function submitOrder(){
       let res:createOrderIdData = await createOrderId(scheduleDetail.value.hoscode,scheduleDetail.value.id,clientList.value[selectedClientIndex.value].id)
       if(res.code === 200){
           router.push({
               path:'/user/registrationList',
               query:{orderId:res.data}
           })
       }else{
        ElMessage.error(res.message)
       }
}

// 添加就诊人
function addClient(){
    router.push({
        path:'/user/client/add',
        query:{docId:route.query.docId}
    })
}
</script>

<template>
    <h3>请确认挂号信息</h3>
    <div class="client">
        <div class="block"></div>
        <h4>选择就诊人:</h4>
    </div>
    <div class="clientList"> 
        <el-card v-for="(client,index) in clientList" :key="client.id" :class="{active:index === selectedClientIndex}" @click="changeSelectedClient(index)">
    <div  class="name">{{client?.name}}</div>
    <div class="cardType">{{client?.param.certificatesTypeString}}</div>
    <div class="cardId">{{client?.certificatesNo}}</div>
  </el-card>
  <el-card class="addClient"> 
    <div  @click="addClient">+添加就诊人</div>
  </el-card>
</div>
   

<div class="client">
        <div class="block"></div>
        <h4>选择就诊卡:</h4>
        <div class="warning">
            <svg t="1697643336187" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4135" width="16" height="16"><path d="M511.5 1019.5c-280.1 0-508-227.9-508-508s227.9-508 508-508 508 227.9 508 508-227.9 508-508 508z m0-967c-253.1 0-459 205.9-459 459s205.9 459 459 459 459-205.9 459-459-205.9-459-459-459zM536 645.7V217.1c0-13.5-11-24.5-24.5-24.5s-24.5 11-24.5 24.5v428.7c0 13.5 11 24.5 24.5 24.5s24.5-11 24.5-24.6z m-24.5 86.8c-20.3 0-36.7 16.4-36.7 36.7s16.4 36.7 36.7 36.7c20.3 0 36.7-16.4 36.7-36.7s-16.4-36.7-36.7-36.7z" fill="#d81e06" p-id="4136"></path></svg>
             如您持社保卡就诊，请务必选择医保预约挂号，以保证正常医保报销</div>
    </div>

    <el-card class="clientDetail" >
            <template #header>
      <div class="card-header">
        <span>{{clientList[selectedClientIndex]?.name}} {{clientList[selectedClientIndex]?.certificatesNo}} 居民身份证</span>
      </div>
    </template>
    <div  class="information">
            <div class="insurance" v-if="clientList[selectedClientIndex]?.isInsure ===0">自费</div>  
            <div class="insurance" v-else>医保</div>  
            <div >{{clientList[selectedClientIndex]?.certificatesNo}} &nbsp;   居民身份证</div>
    </div>
    </el-card>


    <div class="client">
        <div class="block"></div>
        <h4>挂号信息:</h4>
    </div>
       <ul class="registrationInfo">
        <li v-if='scheduleDetail?.workTime ===0'>就诊日期：&nbsp;   <em>{{scheduleDetail?.workDate}} &nbsp; {{scheduleDetail?.param?.dayOfWeek}} &nbsp; 上午</em></li>
        <li v-else>就诊日期：&nbsp;   <em>{{scheduleDetail?.workDate}} &nbsp;{{scheduleDetail?.param?.dayOfWeek}} &nbsp;下午</em></li>
        <li>就诊医院：&nbsp; <em>{{scheduleDetail.param?.hosname}}</em></li>
        <li>就诊科室：&nbsp; <em>{{scheduleDetail.param?.depname}}</em></li>
        <li v-if='scheduleDetail?.docname !=""'>医生姓名：&nbsp; <em>{{scheduleDetail?.docname}}</em></li>
        <li v-else>医生姓名：&nbsp; <em>佚名</em></li>
        <li>医生职称：&nbsp; <em>{{scheduleDetail?.title}}</em></li>
        <li>医生专长：&nbsp; <em>{{scheduleDetail?.skill}}</em></li>
        <li>医事服务费：&nbsp; <i>{{scheduleDetail?.amount}}元</i></li>
       </ul>   

       <div class="client">
        <div class="block"></div>
        <h4>用户信息:</h4>
        </div>
        <div class="userInfo">
            <div class="userPhone">就诊人手机号：{{clientList[selectedClientIndex]?.phone}}</div>
        </div>


 <el-popconfirm title="您已确认预约详请准备提交预约申请了吗?" @confirm="submitOrder" class="submit">
    <template #reference>
      <div class="submit"><el-button type="primary" >确认挂号</el-button></div>
    </template>
  </el-popconfirm>
    
</template>  



<style lang='less' scoped>
.clientList{
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 50px;
    .el-card{
        transition: all 0.25s;
        width: 19%;
        margin: 3px 1px;
        color: #7f7f7f;
        font-size: 12px;
        .name{
            color: #333;
            font-size: 16px;

            margin-bottom: 15px;
        }
    }
    .active{
        background-color: #4990f1;
        color: #fff;
        .name{
            color: #fff;
        }
    }
    .el-card:hover{
        width: 20%;    
    }
    .addClient{
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #4990f1;
        }
}

.clientDetail{
    height: 150px;
    margin-bottom: 50px;
    .information{
        width: 45%;
        height: 50px;
        border-radius: 7px;
        background-color: #89c4ed;
        display: flex;
        align-items: center;
        color: #fff;
        .insurance{
            margin: 0 15px;
            background-color: #fff;
            padding: 3px;
            border-radius: 5px;
            color: #89c4ed;
        }
    }
}
.registrationInfo{
    margin-left: 150px;
    margin-bottom: 60px;
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
.userInfo{
    color: #7f7f7f;
    margin-left: 150px;
    margin-bottom: 60px;
}
h3 {
    margin: 50px 0;
    font-size: 18px;
    font-weight: 600;
    color: #333;
}


.submit{
    display: flex;
    justify-content: center;
    .el-button{
  padding: 20px 26px;
  font-size: 17px;
  margin-bottom: 40px;
}
}


h4 {
    font-size: 14px;
    font-weight: 400;
    line-height: 14px;
    color: #666;
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
.warning{
    margin-left: 20px;
    display: flex;
    align-items: center;
    color: palevioletred;
    svg{
        margin-right: 5px;
    }
}

</style>