<script setup lang='ts'>
 import  { useHospitalDetail } from '@/store/hospitalDetail';
 import {computed, onMounted, ref} from 'vue';
 import scrollama from 'scrollama';
 import { useLogin} from '@/store/login';
 const LoginStore = useLogin()
 const store = useHospitalDetail()
 const hospital =computed(()=>store.hospitalDetail.hospital)
 const bookingRule =computed(()=>store.hospitalDetail.bookingRule)
 const displayDepartment = ref<number>(0)
import {useRouter,useRoute} from 'vue-router'
const router = useRouter()
const route = useRoute()


  function changeDepartment(index:number){
    displayDepartment.value = index
    const departments = document.querySelector('.departments')
    const subdivisionList = document.querySelectorAll('.subdivisionList')
    departments.scrollIntoView({block: "start", inline: "nearest",behavior: "smooth"})
    subdivisionList[index].scrollIntoView({block: "start", inline: "nearest",behavior: "smooth"})
  }
  
onMounted(()=>{
  scrollama().setup({
    step: document.querySelectorAll('.subdivisionList'),
    root: document.querySelector('.subdivision'),
  })
  .onStepEnter((element) =>{
       displayDepartment.value = element.index
       
  })
})


 function checkedDepartment(depcode:string){
  // 如果没有登录跳转登录
  if(LoginStore.token===''){
    ElMessageBox.alert('登录后方可使用完整功能', '请先登录后再访问吧', {
    confirmButtonText: '好的',
    callback: () => {
      LoginStore.changeLoginVisible(true)
    },
  })
}
// 拿到depcode跳转科室详情
else{
  router.push({
    path: '/hospital/registration_step1',
    query:{
      hoscode:route.query.hoscode,
      depcode:depcode
    }
  })
  
}
  
}
  

 </script>

<template>
    <div class="registrationDetail">

      <div class="title">
        <h3>{{hospital?.hosname}}</h3>
    <div>
        <svg t="1696944105408" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6683" width="16" height="16"><path d="M890.751654 652.62331l-115.563795-217.596386a36.570821 36.570821 0 0 0-32.365177-19.565389H281.298918a36.570821 36.570821 0 0 0-32.365177 19.565389l-115.563795 217.596386a36.570821 36.570821 0 0 0 32.365177 53.759108h692.651354a36.570821 36.570821 0 0 0 32.365177-53.759108zM583.73961 38.233514a86.307138 86.307138 0 0 0-143.357619 0l-152.500325 287.080946a36.570821 36.570821 0 0 0 32.365177 53.576253h383.993623a36.570821 36.570821 0 0 0 32.365177-53.576253zM80.342255 1024h863.43709c59.610439 0 98.375509-54.856232 71.678809-100.021196l-85.941429-161.64303a36.570821 36.570821 0 0 0-32.182323-19.382535H126.787198a36.570821 36.570821 0 0 0-32.182322 19.382535l-85.94143 161.64303C-18.216108 969.143768 20.731817 1024 80.342255 1024z" fill="#13227a" p-id="6684"></path></svg>
        {{hospital?.param.hostypeString}}</div>
    </div>
    <div class="address">
        <img :src="`data:image/jpeg;base64,`+hospital?.logoData" alt="">
        <div class="registration">
          <h4>挂号规则</h4>
        <ul>
          <li>预约周期： {{ bookingRule?.cycle}}天</li>
          <li>放号时间： {{ bookingRule?.releaseTime}}</li>
          <li> 停挂时间：{{bookingRule?.stopTime}}</li>
          <li>退号时间： 就诊前一工作日{{bookingRule?.quitTime}}前取消</li>
        </ul>

        <h4>医院预约规则</h4>
        <ul class="registrationRule">
          <li v-for="item in  bookingRule?.rule">{{item}}</li>
        </ul>
        </div>
    </div>
    </div>

    <div class="departments">
        <h3>请选择科室</h3>
        <div class="departmentList">
          <ul class="main">
            <li v-for="(main,index) in store.allDepartment" :class="{active: index === displayDepartment ? true:false}"  @click="changeDepartment(index)">{{main?.depname}}</li>
          </ul>
          <div class="subdivision">
            <ul v-for="main in store.allDepartment" class="subdivisionList">
              <h4>{{main?.depname}}</h4>
            <li v-for="subdivision in main?.children" @click="checkedDepartment(subdivision?.depcode)">{{subdivision?.depname}}</li> 
          </ul>
          </div>
          
        </div>
    </div>
</template>

<style lang='less' scoped>
.title{
    margin: 15px 0;
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
    width: 57%;
    align-items: center;
    color: #7f7f7f;
    height: 250px;
    img{
        width: 90px;
        height: 90px;
        margin-right: 10px;
    }
    h4{
      font-size: 18px;
      color: #000;
      margin: 10px 0;
    }
    ul{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li{
        
        margin: 5px 0;
    }
  }
   .registrationRule{
    list-style: ninner;
    margin-left: 1.5em;
   }
}
.departments{
       h3{
           font-size: 20px;
           font-weight: bold;
          margin-bottom: 40px;
       }
       .departmentList{
        height: 800px;
        margin-bottom: 20px;
        display: flex;
        .main{
          display: flex;
          flex-direction: column;
          width: 13%;
          margin-right: 2%;
          li{
            background-color: #f4f9ff;
            width: 100%;
           display: flex;
           justify-content: center;
           align-items: center;
            padding: 15px 0;
            &.active{
              background-color: #fff;
              color: skyblue;
              transition: all 0.5s;
              font-size: 18px;
              font-weight: 600;
            }
          }
          li:hover{
              background-color: #fff;
            }
        }



        .subdivision{ 
          color: #7f7f7f;
       overflow: auto;
             width: 84%;
             padding-left: 1%;
          ul{
            margin: 25px 0;
            display: flex;
            flex-wrap: wrap;
            h4{
              font-size: 18px;
              color: #000;
              font-weight: 600;
              width: 100%;
              margin-bottom: 20px ;
            }
            li{
              width: 23%;
              margin-right: 2%;
              padding: 5px 0;
            }
            li:hover{
              color: skyblue;
            }
          }
          
        }
       }
}
.subdivision::-webkit-scrollbar{
	display:none
}
</style>