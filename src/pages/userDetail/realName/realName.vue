<script setup lang='ts'>
      import realNameForm from './realNameForm.vue'
import { onMounted, ref } from 'vue'
import { getRealName } from '@/api/user'
    //   存储是否已经实名认证
    const isReal = ref<any>(true)
// 存储已实名用户信息
const userInfo = ref<any>({})


    onMounted(async() =>{
     let res =  await  getRealName()
     if (res.data.certificatesNo != null) {
        isReal.value = true
let arr = res.data.certificatesNo.split('')
arr.splice(-4, 4, '****')

res.data.certificatesNo = arr.join('')


        userInfo.value = res.data
     }else{
        isReal.value = false
     }
    })
</script>

<template>
    <!-- 当已经实名认证时显示 -->
    <div class="haveReal" v-if="isReal">
        <h2>实名认证信息</h2>     
        <div class="banner"><svg t="1697890281495" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12024" width="32" height="32"><path d="M926 215.173333l-384-170.666666a21.333333 21.333333 0 0 0-17.333333 0l-384 170.666666A21.333333 21.333333 0 0 0 128 234.666667v217.813333c0 219.866667 129.373333 419.02 329.6 507.333333 32.793333 14.466667 57.566667 21.5 75.733333 21.5s42.94-7.033333 75.733334-21.5c200.226667-88.333333 329.6-287.486667 329.6-507.333333V234.666667a21.333333 21.333333 0 0 0-12.666667-19.493334z m-30 237.333334c0 202.973333-119.386667 386.8-304.153333 468.313333C556.6 936.346667 540.06 938.666667 533.333333 938.666667s-23.266667-2.32-58.513333-17.873334C290.053333 839.28 170.666667 655.453333 170.666667 452.48V248.533333L533.333333 87.333333l362.666667 161.2zM533.333333 298.666667a21.333333 21.333333 0 0 1 21.333334 21.333333v213.333333a21.333333 21.333333 0 0 1-42.666667 0V320a21.333333 21.333333 0 0 1 21.333333-21.333333z m21.333334 362.666666a21.333333 21.333333 0 1 1-21.333334-21.333333 21.333333 21.333333 0 0 1 21.333334 21.333333z" fill="#4990f1" p-id="12025"></path></svg>
            您已实名认证</div>
<div class="info">
    <ul class="key">
    <li>姓名:</li>
    <li>证件类型:</li>
    <li>证件号码:</li>
</ul>
<ul class="value">
    <li>{{userInfo.name}}</li>
    <li v-if="userInfo.certificatesType == '10'">身份证</li>
    <li v-else>户口本</li>
    <li>{{userInfo.certificatesNo}}</li>
</ul>
</div>
    </div>

    <!-- 当没有实名认证时显示实名认证组件 -->

    <realNameForm v-else></realNameForm>
</template>

<style lang='less' scoped>
h2{
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin: 40px 0 30px 0;
}
.banner{
    display: flex;
    height: 100px;
    background-color: #f4f9ff;
    align-items: center;
    color: #4990f1;
    font-size: 20px;
    svg{
        margin:0 10px 0 20px;
    }
}

.info{
    margin: 60px 15% 0 15%;
    border: 1px solid #ddd;
    box-shadow: 0 0 7px #ddd;
    font-size: 17px;
}
.key{
    display: inline-block;
    width: 20%;
    li{
        display: flex;
        justify-content: end;
        width: 100%;
        color: #999;
        margin: 30px 0;
    }
}
.value{
    display: inline-block;
    margin-left: 16px;
    li{
        color: #333;
        margin: 30px 0;
    }
}

</style>