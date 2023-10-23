<script lang="ts" setup>
import {useHospitalDetail} from '@/store/hospitalDetail'
import {useLogin} from '@/store/login'
const LoginStore = useLogin()
const store = useHospitalDetail()
import {
  Document,
  Search,
  Menu as IconMenu,
  HomeFilled,
  InfoFilled,
  Setting,
} from '@element-plus/icons-vue'
import { onMounted } from 'vue'
import { useRouter,useRoute } from 'vue-router'
const $route = useRoute()
const $router = useRouter()
function changeRouter(url:string){
  // 判断是否存在医院编码，帮助用户返回首页，基本没用
  if($route.query.hoscode){
    // 判断是否登录，未登录跳转登录
   if(LoginStore.token===''){
    ElMessageBox.alert('登录后方可使用完整功能', '请先登录后再访问吧', {
    confirmButtonText: '好的',
    callback: () => {
      LoginStore.changeLoginVisible(true)
    },
  })
   }
  //  已登录可以访问
   else{
    $router.push({
    path:url,
    query:{hoscode:$route.query.hoscode}
  })
   }
  }else{
    ElMessageBox.alert('请先前往首页重新选择医院', '未获取医院编码', {
    confirmButtonText: '好的',
    callback: () => {
      $router.push({
        path:'/'
      })
    },
  })
}
  
}
function goHome(){
  $router.push('/')
}
onMounted(()=>{
if($route.query.hoscode) {
  store.getHospitalDetail($route.query.hoscode) 
  store.getAllDepartment($route.query.hoscode)
}
})
</script>

<template>
  <div class="hospital">
    <div class="menu">
      <h5 class="mb-2"><el-icon size="26px" @click="goHome" color="#7f7f7f"><HomeFilled /></el-icon>/ 医院信息</h5>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
      >       
       <el-menu-item index="/hospital/detail"  @click="changeRouter('/hospital/detail')">
          <el-icon><document /></el-icon>
          <span>医院详情</span>
        </el-menu-item>
        <el-menu-item index="/hospital/registration" @click="changeRouter('/hospital/registration')">
          <el-icon><icon-menu /></el-icon>
          <span>预约挂号</span>
        </el-menu-item>

        <el-menu-item index="/hospital/notice" @click="changeRouter('/hospital/notice')">
          <el-icon><setting /></el-icon>
          <span>预约通知</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style scoped lang='less'>
.hospital{
  display: flex;
  .menu{
  width: 10vw;
 :deep(.el-menu-item){
  padding: 45px 0;
 }
}
.container{
  width: 70vw;
  margin-left: 50px;
}
}
.mb-2{
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  svg{
    margin-right: 5px;
  }
}
   .tac{
    margin-top: 3px;
   }
</style>