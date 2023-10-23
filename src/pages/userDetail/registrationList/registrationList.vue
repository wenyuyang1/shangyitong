<script setup lang='ts'>
import {onMounted, reactive, ref} from 'vue'
import {getOrderList,getOrderStatus,getPatientList} from '@/api/user'
import type {orderListData} from '@/api/user/type'
   import { useRoute,useRouter} from 'vue-router'
   const router = useRouter()
   const route = useRoute()
//    获取预约详情组件
   import registrationDetail from './registrationDetail.vue'

  //  `${page}/10?patientId=${patientId}&orderStatus=${orderStatus}`

// 存储当前页面
let page = ref<number>(1)
// 存储当前页面的数据
let orderList = ref<any>([])
onMounted(getOrderListData)

// 定义函数获取指定列表函数
async function  getOrderListData(patientId:number = undefined,orderStatus:number = undefined){
        let res : orderListData = await getOrderList(page.value,patientId,orderStatus)
        if(res.code == 200){
           orderList.value = res.data.records 
        }
}

// 点击左右箭头也会改变页面走这个钩子
function handleCurrentChange(val:number){
page.value = val
getOrderListData()
}


// #region 筛选订单脚本
// 存储筛选人列表
let patientList = ref<any>([])
// 存储筛选订单状态列表
let orderStatusList = ref<any>([])


onMounted(async()=>{
  let  orderStatusRes:any = await getOrderStatus()
 orderStatusList.value = orderStatusRes.data
  
  let patientListRes:any = await getPatientList()
  
  patientList.value = patientListRes.data
  console.log(patientList.value[0]);
  
})


// 存储当前筛选人
let client = ref<any>(undefined)
// 存储当前筛选订单状态
let orderStatus = ref<any>(undefined)

// 挂号订单筛选列表状态
function orderStatusChange(orderStatus:any){
  console.log(orderStatus,client.value);
  
  getOrderListData(client.value,orderStatus)
    console.log(1);
    
}
// 挂号订单筛选就诊人
function clientChange(client:string){
  console.log(orderStatus.value,client);
  getOrderListData(client,orderStatus.value)
  
}

// #endregion
// 点击详情跳转订单详情页面
function getOrderDetail(orderId:string){
  router.push({
    path:'/user/registrationList',
    query:{orderId:orderId}
  })
}
</script>

<template>
    <!-- #region -->
    <!-- 判断是否有orderId，如果有显示预约信息，如果没有就显示订单列表 -->
    <registrationDetail v-if="route.query.orderId"/>
<!-- 挂号订单列表 -->
<!-- #endregion -->
    <div v-else>
           <h2>挂号订单</h2>
           <!-- <div class="filtration">
            <div class="client"></div>
           </div> -->

           <el-form :inline="true"  class="filtration">

    <el-form-item label="就诊人:">
      <el-select
        v-model="client"
        placeholder="请选择就诊人"
        @change="clientChange"
      >
        <el-option v-for="client in patientList"  :label="client?.name"  :value="client?.id" />

        <el-option label="全部" :value=undefined />
      </el-select>
    </el-form-item>
    <el-form-item label="订单状态:">
      <el-select
        v-model="orderStatus"
        placeholder="全部"
        @change="orderStatusChange"
      >
        <el-option  v-for="item in orderStatusList" :label="item?.comment"  :value="item?.status" />
        <el-option label="全部"  :value=undefined />
      </el-select>
    </el-form-item>
  </el-form>
     

      <ul class="orderHeader">
        <li>就诊时间</li>
        <li>医院</li>
        <li>科室</li>
        <li>医生</li>
        <li>医事服务费</li>
        <li>就诊人</li>
        <li>订单状态</li>
        <li>操作</li>
      </ul>
      <ul class="orderList" v-for="item in orderList" :key="item.id">
             <li v-if="item?.reserveTime">{{item?.reserveDate}} 下午</li>
             <li v-else>{{item?.reserveDate}} 上午</li>
             <li>{{item?.hosname}}</li>
             <li>{{item?.depname}}</li>
             <li>{{item?.title}}</li>
             <li>{{item?.amount}}</li>
             <li>{{item?.patientName}}</li>
             <li>{{item?.param.orderStatusString}}</li>
             <li class="detail" @click="getOrderDetail(item?.id)">详情</li>
      </ul>

  <div class="pagination"> 
       <el-pagination
    :page-size="10"
    @current-change="handleCurrentChange"
    layout="prev, pager, next"
    :total="100"
  /></div>




    </div>
</template>

<style lang='less' scoped>

.pagination{
  display: flex;
  justify-content: center;
  margin: 30px 0 40px 0;
}

.filtration{
    color: #7f7f7f;
    margin-bottom: 20px;
    .el-form-item{
        width: 30%;
    }
}
.orderHeader{
  font-size: 13px;
  font-weight: 600;
    background-color: #e8f2ff;
    display: flex;
    li{
       width: 15.9%;
            height: 40px;
            margin: 0 0;
            line-height: 40px;
    }
}
.orderList{
    display: flex;
    li{
      width: 19%;
       font-size: 12px;
            height: 70px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
    }
    .detail{
      color: #4490f1;
      font-size: 14px;
    }
}
.orderList:nth-child(2n+1){
    background-color: #f0f1f1;
    border-top: 1px solid #e8e8e8;
    border-bottom: 2px solid #e8e8e8;
}

h2{
    font-weight: 600;
    margin: 35px 0 15px 0;
    font-size: 16px;
}

</style>