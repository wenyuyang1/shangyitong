<script setup lang='ts'>
      defineOptions({
            name: 'hospitalRegistrationStep1',
        })   
import { onBeforeUnmount, onMounted,nextTick,ref } from "vue";
import { reqDepartmentRegistration,reqScheduleList } from "@/api/hospital";
import type {HospitalAllDepartmentData,HospitalDoctorScheduleListResponseData,DoctorScheduleDetailData} from '@/api/hospital/type';
import {useRoute,useRouter} from 'vue-router'
const route = useRoute()
const router = useRouter()
// 定义页码,日期信息状态,上下午医生列表
const page =ref<number>(1)
let registrationDate =ref({})
let morningDoctorList =ref<DoctorScheduleDetailData[]>([])
    let afternoonDoctorList =ref<DoctorScheduleDetailData[]>([])

    // 存储已约满的日期和未开放的日期
    let noMoreRegistration =ref<string[]>([])
    let noStartRegistration =ref<string[]>([])
     


// 获取预约日期列表并请求页面上第一个日期的医生列表并存储日期状态
async function getDepartmentRegistrationDate() {
    let res:HospitalAllDepartmentData = await reqDepartmentRegistration(page.value,6,route.query.hoscode,route.query.depcode)
             if(res.code == 200){
                let {data} = res
                registrationDate.value = data
                // 先清空已约满的日期和未开放的日期,这遍历添加
                noStartRegistration.value = []
                noMoreRegistration.value = []
                data.bookingScheduleList.forEach((item:any)=>{
                    if(item.status === -1){
                        noMoreRegistration.value.push(item.workDate)
                        
                    }else if(item.status === 1){
                        noStartRegistration.value.push(item.workDate)
                    }
              })
             }

             checkedDate(registrationDate.value.bookingScheduleList[0].workDate,0)
             
 }
getDepartmentRegistrationDate()

// 存储哪一个为选中日期,  存储点击日期时是否是还未开放预约的日期
 let active = ref<number>(0)
 let isNoStart = ref<boolean>(false)

//  存储倒计时,以及倒计时器,放到这里也方便onBeforeUnmount销毁
let timer
// 销毁timer
onBeforeUnmount(()=>{
    clearInterval(timer)
})
let registrationTime = ref<string>('')
//  切换日期获取医生列表
 async function checkedDate(Date:string,index:number){
     active.value = index
     isNoStart.value = false

    //  timer要写到setup中,不知道为什么写在这个函数里面中,在下面的if中无法获取到
    window.clearInterval(timer)
    
    //  判断是否是未开放预约的日期   并且计算倒计时
   if(noStartRegistration.value.find(item => item ===Date)){

         timer = setInterval(timeOut,1000)
       isNoStart.value = true     
   }else{
    let res:HospitalDoctorScheduleListResponseData = await reqScheduleList(route.query.hoscode,route.query.depcode,Date)
     if(res.code == 200){
        morningDoctorList.value = []
        afternoonDoctorList.value = []
       res.data.forEach((item:DoctorScheduleDetailData) =>{
            if(item.workTime ==0){
                morningDoctorList.value.push(item)
            }else if(item.workTime ==1){
                afternoonDoctorList.value.push(item)
            }             
       })
     }   
   }
 }
//  切换页面
 function changePage(val:number){
     page.value = val
     active.value = 0
     getDepartmentRegistrationDate()
 }
// 按钮是否为不可选状态
function isNoMore(date){
  return  noMoreRegistration.value.find(item => item ===date)
}
// 倒计时重复函数
function timeOut(){
   let dateNow = new window.Date()
   let tomorrowDate = new window.Date(noStartRegistration.value[0] + ' 16:00:00')
    var value = Number(tomorrowDate - dateNow)/1000;
    var secondTime = parseInt(value);// 秒
	        var minuteTime = 0;// 分
	        var hourTime = 0;// 小时
    if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
	            //获取分钟，除以60取整数，得到整数分钟
	            minuteTime = parseInt(secondTime / 60);
	            //获取秒数，秒数取佘，得到整数秒数
	            secondTime = parseInt(secondTime % 60);
	            //如果分钟大于60，将分钟转换成小时
	            if(minuteTime > 60) {
	                //获取小时，获取分钟除以60，得到整数小时
	                hourTime = parseInt(minuteTime / 60);
	                //获取小时后取佘的分，获取分钟除以60取佘的分
	                minuteTime = parseInt(minuteTime % 60);
                    if(hourTime > 24){
	                 hourTime = hourTime%24
                    }
	            }
	        }
	        var time = "" + parseInt(secondTime) + "秒";
 
	        if(minuteTime > 0) {
	        	time = "" + parseInt(minuteTime) + "分" + time;
	        }
	        if(hourTime > 0) {
	        	time = "" + parseInt(hourTime) + "小时" + time;
	        }
            registrationTime.value = time
	    
}

// 提示已约满
function alreadyEngaged(){
    ElMessage({
    message: '该医生已约满,请换天预约',
    type: 'warning',
  })
}

// 预约可预约医生
function nextStep(docId:string){
    router.push({
        path:'/hospital/registration_step2',
        query:{docId:docId}
    })
    
}
</script>

<template>
    <div class="hosIntro">
      <div class="hosname">{{registrationDate.baseMap?.hosname}}</div>
      <div class="department">{{registrationDate.baseMap?.bigname}}</div>
    </div>

<div class="registrationDate">
    <h4>{{registrationDate.baseMap?.depname}}</h4>
    <div class="month">{{registrationDate.baseMap?.workDateString}}</div>
    <ul class="Date">
    <li v-for="(item,index) in registrationDate.bookingScheduleList"  :class="{stop: item?.status===-1,active:active ==index}"  @click="checkedDate(item.workDate,index)" :key="index">
        <div class="top">{{item?.workDate}} &nbsp;&nbsp;&nbsp;{{item?.dayOfWeek}}</div>
        <div class="bottom" v-if="item?.status === 0">有号</div>
        <div class="bottom" v-if="item?.status === 1">即将放号</div>
        <div class="bottom" v-if="item?.status === -1">停止放号</div>
    </li>
</ul>
<div class="pagination"><el-pagination layout="prev, pager, next" :total="registrationDate.total"  :default-page-size='6'  @current-change="changePage" /></div>
</div>

<div v-if='isNoStart' class="noStart">
       <div class="tomorrow">明天 <em>16:00</em> 放号</div>
       <div class="timeOut">倒计时  <strong>{{registrationTime}}</strong></div>
</div>
<div class="doctorSchedule" v-else>
        <div class="morning">
         <div class="time">
                <div class="block"></div>
                  <h4>上午号源</h4>
            </div>
            <div v-if="morningDoctorList.length == 0" class="noSubscribe">上午暂无预约安排 请前往医院就诊</div>
          <div class="doctorDetail" v-for="item in morningDoctorList" :key="item?.id" >
            <div class="doctorIntro">
                <div class="top"> 
                    <div class="level">{{item?.title}}</div>
                    <div class="name" v-if="item?.docname">{{item?.docname}}</div>
                    <div class="name" v-else>佚名</div>
                </div>
                <div class="adept">{{item?.skill}}</div>
            </div>
            <div class="registrationNow">
                <div class="price">￥{{item.amount}}</div>
                <el-button type="info" v-if="isNoMore(item.workDate)"  @click='alreadyEngaged'>已约满</el-button>
                <el-button type="primary" v-else @click="nextStep(item.id)">剩余{{item?.availableNumber}}</el-button>
            </div>
          </div>
            </div>
            <div class="afternoon">
         <div class="time">
                <div class="block"></div>
                  <h4>下午号源</h4>
            </div>
            <div v-if="afternoonDoctorList.length == 0" class="noSubscribe">下午暂无预约安排 请前往医院就诊</div>
          <div class="doctorDetail"   v-for="item in afternoonDoctorList" :key="item?.id">
            <div class="doctorIntro">
                <div class="top"> 
                    <div class="level">{{item?.title}}</div>
                    <div class="name" v-if="item?.docname">{{item?.docname}}</div>
                    <div class="name" v-else>佚名</div>
                </div>
                <div class="adept">{{item?.skill}}</div>
            </div>
            <div class="registrationNow">
                <div class="price">￥{{item.amount}}</div>
                <el-button type="info" v-if="isNoMore(item.workDate)" @click='alreadyEngaged'>已约满</el-button>
                <el-button type="primary" v-else @click="nextStep(item.id)">剩余{{item?.availableNumber}}</el-button>
            </div>
          </div>
            </div>
</div>

</template>

<style lang='less' scoped>
  .hosIntro {
    margin-top: 50px;
    margin-bottom: 20px;
    color: #7f7f7f;
           display: flex;
           .hosname{
            padding-right: 10px;
            border-right: 1px solid rgba(127, 127, 168,0.3);
           }
           .department{
            margin-left: 10px;
           }
  }
  .registrationDate{
    h4{
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 40px;
    }
    .month{
        text-align: center;
        margin-bottom: 20px;
    }
    .Date{
        display: flex;
        li{
            width: 15%;
            height: 90px;
            border-radius: 13px;
            transition: all 0.4s;
            color: #4990f1;
            border: 1px solid #e8f2ff;
            margin: 0 20px;
            margin-right: 10px;
            .top{
                width: 100%;
                height: 50%;
                overflow: hidden;
                border-radius: 10px 10px 0 0;
                background-color: #e8f2ff;
            }
            .top,.bottom{
                text-align: center;
                line-height: 45px;
            }
            
        }
        .active{
            width: 17%;
            border: 1px solid #4990f1;
            height: 90px;
            .top{
                color: #fff;
                background-color: #4990f1;
            }
        }
        .stop{
            color: #7f7f7f;
            border: 1px solid #7f7f7f;
            border-radius: 10px;
            .top{
                color: #7f7f7f;
                background-color: #f5f5f5;
            }
        }
    }
    .pagination{
        display: flex;
        justify-content: center;
       margin: 20px auto;
    }
  }
  .doctorSchedule{
    margin-top: 15px;
    overflow: hidden;
  }
  .morning,.afternoon{
         margin-top: 20px;
         .noSubscribe{
            color: #7f7f7f;
            font-size: 18px;
            margin-bottom: 50px;
    text-align: center;
 }
  }
         .time{
            display: flex;
            margin-bottom: 35px;
            align-items: center;
            color: #7f7f7f;
            .block{
                background-color: #4990f1;
                width: 4px;
                height: 14px;
                border-radius: 4px;
                margin-right: 10px;
            }
         }
         .doctorDetail{
            margin: 37px 0;
            height: 70px;
            display: flex;
            justify-content: space-between;
             .doctorIntro{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .top{
                    display: flex;
                    font-weight: 600;
                    align-items: center;
                    .level{
                        padding-right: 10px;
                       border-right: 1px solid rgba(196, 179, 164,0.3);
                    }
                    .name{
                        margin-left: 10px;
                    }
                 }
                 .adept{
                    color: #7f7f7f;
                    font-weight:600;
                 }
             }
             .registrationNow{
                display: flex;
                align-items: center;
                .price{
                    color: #4990f1;
                    margin-right: 10px;
                }
                .el-button{
                    padding: 20px 30px;
                }
             }
         }
 .noStart{
    display: flex;
    flex-direction: column;
    align-items: center;
    .tomorrow{
        font-size: 16px;
        color: #7f7f7f;
        margin-bottom: 20px;
        em{
            font-style: normal;
            color: #4990f1;
        }
    }
    .timeOut{
        display: flex;
        align-items: center;
        strong{
            margin-left: 10px;
            font-size: 30px;
            color: #4990f1;
        }
    }
 }
</style>