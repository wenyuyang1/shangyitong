<script setup lang='ts'>
import { computed } from 'vue'
import {useHospitalDetail} from '@/store/hospitalDetail'

// 一直以为是(state数据获取，pinia挂载，node版本有问题，异步延迟等)，查了几个钟头突然想到报underfined可以用js中的问号跳过报错去运行，结果打个问号数据重新解析就又能获取了，tao
// vue3模板不和vue2一样，会提前用setup中的数据解析模板语法然后再去用pinia里的state去解析模板，所以会假报错，并且报错后console.log()不会执行，弄得拿到的是underfined
const store = useHospitalDetail()
// import { storeToRefs} from 'pinia'
const hospital =computed(()=>store.hospitalDetail.hospital)


</script>

<template>
    <div class="title">
        <h3>{{hospital?.hosname}}</h3>
    <div>
        <svg t="1696944105408" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6683" width="16" height="16"><path d="M890.751654 652.62331l-115.563795-217.596386a36.570821 36.570821 0 0 0-32.365177-19.565389H281.298918a36.570821 36.570821 0 0 0-32.365177 19.565389l-115.563795 217.596386a36.570821 36.570821 0 0 0 32.365177 53.759108h692.651354a36.570821 36.570821 0 0 0 32.365177-53.759108zM583.73961 38.233514a86.307138 86.307138 0 0 0-143.357619 0l-152.500325 287.080946a36.570821 36.570821 0 0 0 32.365177 53.576253h383.993623a36.570821 36.570821 0 0 0 32.365177-53.576253zM80.342255 1024h863.43709c59.610439 0 98.375509-54.856232 71.678809-100.021196l-85.941429-161.64303a36.570821 36.570821 0 0 0-32.182323-19.382535H126.787198a36.570821 36.570821 0 0 0-32.182322 19.382535l-85.94143 161.64303C-18.216108 969.143768 20.731817 1024 80.342255 1024z" fill="#13227a" p-id="6684"></path></svg>
        {{hospital?.param.hostypeString}}</div>
    </div>

    <div class="address">
        <img :src="`data:image/jpeg;base64,`+hospital?.logoData" alt="">
        <svg t="1696952210188" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5750" width="30" height="30"><path d="M705.536 972.8a54.784 54.784 0 0 1-44.032-22.528L476.16 657.408 102.4 629.76a54.784 54.784 0 0 1-26.112-99.328L803.84 112.64a54.272 54.272 0 0 1 82.432 57.344l-127.488 760.32A55.296 55.296 0 0 1 716.8 972.8zM842.24 131.584l-8.192 22.016L102.4 573.952v5.12l396.8 29.184 11.776 11.776L705.536 921.6z" fill="#d4237a" p-id="5751"></path></svg>
        <div>  {{hospital?.route}}</div>
    </div>


    <div class="introduce">
        <h3>医院介绍</h3>
        <p class="intro">{{hospital?.intro}}</p>
    </div>
</template>

<style lang='less' scoped>
.title{
    margin: 30px 0;
    display: flex;
    align-items: center;
    h3{
        font-size: 20px;
        font-weight: bold;
        margin-right: 20px;
    }
    div{
        color: #7f7f7f;
        display: flex;
        align-items: center;
        svg{
            margin-right: 7px;
        }
    }
}
.address{
    display: flex;
    align-items: center;
    color: #7f7f7f;
    height: 150px;
    img{
        width: 90px;
        height: 90px;
        margin-right: 10px;
    }
    svg{
        margin-right: 10px;
    }
}


.introduce{
    h3{
        font-size: 20px;
        font-weight: bold;
        margin: 20px 0;
    }
    .intro{
        color: #7f7f7f;
        font-size: 14px;
    }
}
</style>