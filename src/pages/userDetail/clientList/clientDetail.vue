<script setup lang='ts'>
import {getClientDetail,deleteClient} from '@/api/user'
import {ref, onMounted} from 'vue'
import {useRoute,useRouter} from 'vue-router'
const router = useRouter()
const route = useRoute()
const clientDetail = ref<any>({})
onMounted(async()=>{
let res = await getClientDetail(route.query.id)
if(res.code == 200){
    clientDetail.value = res.data
}})
 

// 删除就诊人
const deleteClientInfo= async()=>{
    let res = await deleteClient(route.query.id)
    if(res.code == 200){
        router.go(-1)
    }
}


// 更改就诊人信息
const changeClientInfo= ()=>{
   router.push({
    path:'/user/client/add',
    query:{id:route.query.id}
   })
}
</script>

<template>
    <h2>就诊人详情</h2>
    <div class="client">
        <div class="block"></div>
        <h4>就诊人信息</h4>
    </div>


    <!-- 就诊人信息 -->
<div class="clientInfo">
    
    <ul>
        <li>姓名:</li>
        <li>证件类型：</li>
        <li>证件号码：</li>
        <li>性别：</li>
        <li>出生日期：</li>
        <li>手机号码：</li>
        <li>婚姻状况：</li>
        <li>当前住址：</li>
        <li>详细地址：</li>
    </ul>
    <ul>
        <li>{{clientDetail.name}}</li>
        <li>{{clientDetail.param?.certificatesTypeString}}</li>
        <li>{{clientDetail.certificatesNo}}</li>
        <li v-if="clientDetail.sex">男</li>
        <li v-else>女</li>
        <li>{{clientDetail.birthdate}}</li>
        <li>{{clientDetail.phone}}</li>
        <li v-if="clientDetail.isMarry">已婚</li>
        <li v-else>未婚</li>
        <li>{{clientDetail.param?.provinceString}}/{{clientDetail.param?.cityString}}/{{clientDetail.param?.districtString}}</li>
        <li>{{clientDetail.address}}</li>
       <li>
            <el-button type="primary" @click="deleteClientInfo">删除就诊人</el-button>
            <el-button plain @click="changeClientInfo">修改就诊人</el-button>
        </li>
    </ul>

</div>
    

</template>

<style lang='less' scoped>
h2{
    margin: 20px 0 80px 20px;
    font-weight: 600;
    font-size: 18px;
}
.el-button {
    margin-right: 10px;
    padding: 20px;
}
.client {
    margin-bottom: 60px;
    margin-left: 20px;
    display: flex;
    align-items: center;
    color: #7f7f7f;
    .block {
    margin-right: 10px;
    height: 14px;
    width: 4px;
    background-color: #4990f1;
    border-radius: 5px;
}}
.clientInfo {
    display: flex;
    margin-left: 150px;
    margin-bottom: 60px;
    color: #7f7f7f;
    ul{
        margin-right: 40px;
    }
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
</style>