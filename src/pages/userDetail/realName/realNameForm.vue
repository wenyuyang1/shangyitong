<script setup lang='ts'>
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import {ref,defineOptions, reactive} from 'vue'

import {submitRealName} from '@/api/user'
import type {submitRealNameData} from '@/api/user/type'
defineOptions({
    name: 'Upload'
})


// 存储上传文件
let fileList = ref<any[]>([])
    //    由于upload是组件，无法使用ref获取dom，而原生dom获取要babel，所以在外层包一层div免得麻烦
let uploadImg = ref()
// 存储实名认证表单信息
let realNameForm = reactive({
    // 证件
    certificatesNo: '',
    // 证件类型 10身份证    20户口本
    certificatesType: '',
    // 身份证和人物自拍
    certificatesUrl: '',
    name: '',
})


// #region 点击查看图片大图

import { ElMessage, UploadFile } from 'element-plus'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
// #endregion

// 点击重置清除上传文件
const clearImg = () => {
    uploadImg.value.children[0].children[0].children[1].style.display = ''
    fileList.value = []
}


// 点击重写清空所有表单内容
const clearForm = () => {
   realNameForm.certificatesNo = ''
   realNameForm.certificatesType = ''
   realNameForm.name = ''
//    清空上传文件要清空两个地方，并且把上传文件的加号显示出来
   realNameForm.certificatesUrl = ''
   uploadImg.value.children[0].children[0].children[1].style.display = ''
    fileList.value = []
    
}
// 获取表单组件
const formRef = ref()

// 点击提交
const submitForm =  (formRef) => {

// 一定要注意写规则时一定要给每一种情况都写callback，不然valid永远不会有true的情况
    if (!formRef) return
 let formRes = formRef.validate(async(valid) => {
    if (valid) {
        // 有无图片
     if(fileList.value.length > 0){
        let res:submitRealNameData = await submitRealName(realNameForm)
         ElMessage.success('实名认证成功') 
         location.reload()
     }else{
         ElMessage.warning('请上传图片')
     }
    } else {
      console.log('error submit!')
      return false
    }
  })




       
}
// 创建表单规则

// 一定要注意写规则时一定要给每一种情况都写callback，不然提交验证时valid永远不会有true的情况
const rules = reactive({
// 记得写prop

        // 证件
        certificatesNo: [{ required:true,validator: validatorCardId, trigger: 'blur' }],
    // 证件类型 10身份证    20户口本
    certificatesType: [{ required:true, trigger: 'change',  message: '请填写证件类型'}],
    name: [{ required:true,validator:validatorName, trigger: 'blur' }]
})

function validatorCardId(rule, value, callback){
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
     if(!reg.test(value)){
         callback(new Error('请输入正确的身份证号'))
     }
    callback()
}
function validatorName(rule, value, callback){
    var regName =/^[\u4e00-\u9fa5]{2,4}$/;  
    if(!regName.test(value)){
        callback(new Error('请输入正确的姓名'))
    }
    callback()
}







// #region 文件上传的各种钩子


// upload上传文件成功钩子
function successUploadImg(response) {
    realNameForm.certificatesUrl = response.data
}
// 文件上传中的钩子
function progressUploadImg(){
    uploadImg.value.children[0].children[0].children[1].style.display = 'none'
}

// 文件删除钩子
function  removeUploadImg(){
    uploadImg.value.children[0].children[0].children[1].style.display = ''
    }
    // 文件上传失败钩子
    function errorUploadImg(){
    uploadImg.value.children[0].children[0].children[1].style.display = ''
        ElMessage.error('上传失败')
       }
    //    #endregion



</script>

<template>
    <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>实名信息</span>
      </div>
    </template>

     <div ref="uploadCard" class="notice"><svg t="1697892924754" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="26134" width="18" height="18"><path d="M516.45226667 44.88746667c-259.22773333 0-469.4816 210.14293333-469.4816 469.4816s210.14293333 469.37173333 469.4816 469.37173333 469.4816-210.14293333 469.4816-469.4816S775.68 44.8864 516.45333333 44.8864z m0 870.512c-221.49546667 0-401.14133333-179.53386667-401.14133334-401.14133334s179.53386667-401.14026667 401.14133334-401.14026666 401.14133333 179.58933333 401.14133333 401.14133333-179.64693333 401.14133333-401.14133333 401.14133333z" fill="#1296db" p-id="26135"></path><path d="M615.824 683.0848l-32.02133333-30.47466667-7.66933334 7.056c-37.65333333 34.6496-52.64746667 43.8656-58.05653333 46.31466667a3.072 3.072 0 0 1-0.06506667-0.44586667 962.53866667 962.53866667 0 0 1 43.02933334-169.86133333 765.47306667 765.47306667 0 0 0 27.10293333-100.76373333l0.1664-0.84586667v-0.86826667a29.8176 29.8176 0 0 0-11.264-24.48746666l-0.50133333-0.36693334a43.09653333 43.09653333 0 0 0-27.26933334-7.66933333A137.504 137.504 0 0 0 486.4 421.07626667a327.55733333 327.55733333 0 0 0-77.74613333 65.30133333l-7.79093334 9.0048 35.4496 26.75733333 6.84586667-7.00053333a403.3664 403.3664 0 0 1 45.46773333-39.8912 26.8128 26.8128 0 0 1 8.41386667-3.68426667 44.77866667 44.77866667 0 0 1-2.01386667 9.0816 1203.2 1203.2 0 0 0-62.39786666 248.56533334l-0.08853334 0.85653333a45.23413333 45.23413333 0 0 0 11.13066667 32.5792l0.45653333 0.50133333a41.08266667 41.08266667 0 0 0 29.30666667 12.2432h2.5376a105.4272 105.4272 0 0 0 47.5712-16.19413333l31.8656-20.5472h-2.8928a558.1248 558.1248 0 0 0 55.0944-47.472z m22.384-416.288a39.29066667 39.29066667 0 0 0-40.57066667-37.5328h-0.2112A48.78506667 48.78506667 0 0 0 561.17333333 245.504a53.67146667 53.67146667 0 0 0-15.0144 38.29973333 41.8496 41.8496 0 0 0 11.34186667 29.96266667 38.63466667 38.63466667 0 0 0 27.82506667 11.89866667h1.1136a48.86293333 48.86293333 0 0 0 32.7232-13.456h0.1344l3.27146666-3.33866667a54.9952 54.9952 0 0 0 15.73866667-39.03466667v-2.928z" fill="#1296db" p-id="26136"></path></svg>
完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。</div>


<el-form :model="realNameForm" label-width="120px"  :rules="rules" ref="formRef">
           
    <el-form-item label="用户姓名" prop="name">
        <el-input placeholder="请输入用户姓名"  v-model="realNameForm.name" />
    </el-form-item>
    <el-form-item label="证件类型" prop="certificatesType">
        <el-select v-model="realNameForm.certificatesType" class="m-2" placeholder="请选择证件类型" size="large" >
    <el-option
      key="10"
      label='身份证'
      value="10"
    />
    <el-option
      key="20"
      label='户口本'
      value="20"
    />
  </el-select>


    </el-form-item>   
     <el-form-item label="证件号码" prop="certificatesNo">
        <el-input placeholder="请输入证件号码"  v-model="realNameForm.certificatesNo" clearable  maxlength="18" minlength='15' />
    </el-form-item>
    <el-form-item label="上传证件">
        <!--     由于upload是组件，无法使用ref获取，而dom获取要babel，所以在外层包一层div -->
   <div ref="uploadImg">
    <el-upload
  
  v-model:file-list="fileList"
  action="http://syt.atguigu.cn/api/oss/file/fileUpload?fileHost=userAuah"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-success= 'successUploadImg'
  :on-progress='progressUploadImg'
  :on-remove="removeUploadImg"
  :on-error='errorUploadImg'
>
  <el-icon><Plus /></el-icon>
</el-upload>
   </div>



 
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" class="showImg" />
  </el-dialog>

  <img src="@/assets/images/auth_example.png" alt="" class="imgExample" >


  <div  style="display:flex;flex-direction: column;margin-left:10px;color: #dc2d2d;">请上传一张您手持证件的图像<el-button v-if="fileList.length ===1" @click="clearImg" style='margin-left:10px;' type="primary" 
        >重置图片</el-button></div>
 








    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)">提交</el-button>
      <el-button type="primary" @click="clearForm">重写</el-button>
    </el-form-item>
  </el-form>

  </el-card>
</template>

<style lang='less' scoped>
.imgExample{
    border: 1px solid #ccc;
    margin-left: 10px;
}


.el-form{
    margin-left: 70px;
}

.el-input{
    width: 450px;
}


.notice{
    color: #7f7f7f;
    font-size: 14px;
    display: flex;
    
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
}
.box-card {
    margin: 30px 8% 0 8%;
    .card-header {
        font-size: 16px;
    }
}

.showImg {
    width: 100%;
    height: 100%;
}
.Img{
    width: 150px;
    height: 150px;
    img{
        width: 100% ;
        height: 100%;
    }
}
.active{
    display: none;
}
</style>