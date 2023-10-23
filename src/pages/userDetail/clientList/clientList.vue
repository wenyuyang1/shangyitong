<script setup lang='ts'>
import {getPatientList,getRealName} from '@/api/user'
import {onMounted,ref} from 'vue'
import {useRouter} from 'vue-router'
const router = useRouter()


// 查询有没有实名认证
onMounted(async()=>{
    let res =  await  getRealName()
     if (res.data.certificatesNo == null) {
         router.push({
             path:'/user/realName'
         })
     }
})

// 存储就诊人列表
const patientList = ref<any>([])
onMounted(async()=>{
let res = await getPatientList()
if(res.code === 200){
     patientList.value = res.data
}
})

// 获取指定就诊人详情
function goDetail(id){
    router.push({
        path:'/user/clientDetail',
        query:{id:id}
    })
}

// 添加就诊人
function addClient(){
    router.push({
        path:'/user/client/add'
    })
}
</script>

<template>
    <h2>就诊人管理</h2>
    <el-card class="box-card" v-for="item in patientList" :key='item?.id'>
    <template #header>
      <div class="card-header">
        <span class="name">{{item?.name}}</span>
        <span class="certificate">{{item?.certificatesNo}} &nbsp;   {{item?.param.certificatesTypeString}}</span>
        <span class="detail" @click="goDetail(item?.id)">查看详情<svg t="1697990940384" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4106" width="14" height="14"><path d="M779.180132 473.232045 322.354755 16.406668c-21.413706-21.413706-56.121182-21.413706-77.534887 0-21.413706 21.413706-21.413706 56.122205 0 77.534887l418.057421 418.057421L244.819868 930.057421c-21.413706 21.413706-21.413706 56.122205 0 77.534887 10.706853 10.706853 24.759917 16.059767 38.767955 16.059767s28.061103-5.353938 38.767955-16.059767L779.180132 550.767955C800.593837 529.35425 800.593837 494.64575 779.180132 473.232045z" p-id="4107"></path></svg>
            </span>
      </div>
    </template>
    <div  class="information">
            <div class="insurance" v-if="item?.isInsure">医保</div>  
            <div class="insurance" v-else>自费</div> 
            <div class="cardDetail" >{{item?.certificatesNo}} &nbsp;  {{item?.param.certificatesTypeString}}</div>
    </div>
  </el-card>
  <el-card shadow="hover" class="addClient" @click="addClient"> +添加就诊人 </el-card>
</template>

<style lang='less' scoped>
.addClient{
    margin: 30px 40px 30px 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 7px 0;
    color: #4990f1;
    font-size: 17px;
}


h2{
    margin: 20px 0 80px 20px;
    font-weight: 600;
    font-size: 18px;
}
.box-card{
    margin: 30px 40px 30px 70px;
    padding: 0 35px ;
    height: 150px;
    .detail{
        margin-right: -20px;
       float: right;
       display: flex;
       align-items: center; 
          svg{
        margin-left: 3px;
    }
    }
    .name{
        margin-left: -20px;
        margin-right: 40px;
        font-size: 16px;
    }
    .certificate{
        font-size: 13px;
        color: #7f7f7f;
    }

}


.information{
        width: 45%;
        height: 50px;
        border-radius: 7px;
        background-color: #89c4ed;
        margin-left: -20px;
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
</style>