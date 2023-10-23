<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue'
import {getProvince,addClient,getClientDetail,updateClient} from '@/api/user'
import {useRoute,useRouter} from 'vue-router'
const route = useRoute()
const router = useRouter()
let clientForm = ref({
    name:'',
    // 就诊人证件类型 户口本20  身份证10
    certificatesType:'',
    // 证件号码
    certificatesNo:'',
    sex: 0,
    birthdate: '',
    // 就诊人phone
    phone:'',
    // 婚姻状况 0 未婚 1 已婚
    isMarry: 0,
    // 0自费 1医保
    isInsure:0,   
     // 详细地址
    address:'',
    // 省市区
    addressSelected:[],
    // 联系人
    contactsName:'',
    contactsPhone:'',
    contactsCertificatesType:'',
    contactsCertificatesNo:'',
    param:{}
})  



// 存储Form组件
const ruleFormRef = ref(null)
// 存储地址连级选择器
const cascaderRef = ref(null)


const province= {
  lazy: true,
 async lazyLoad(node, resolve) {

    const { level } = node
    // 根本拿不到这个组件的dom文字，弄了两个钟头，，但是value和label会传递给node，所以后面多加参数解决,脑子敲多了都笨了
      let res = await getProvince(node.data?.value2)
    let nodes  = res.data.map((item) =>{ return {
        value2: item.value,
          value: item.value+item.name,
          label: item.name,
          leaf: level >=2,
                }  
     })

      
      resolve(nodes)
  }}
// 新增或修改就诊人
const addOrUpdateClient = async() =>{
  await ruleFormRef.value.validate()
     
  
  clientForm.value.param.provinceString=clientForm.value.addressSelected[0].slice(6)
  clientForm.value.param.cityString=clientForm.value.addressSelected[1].slice(6)
  clientForm.value.param.districtString=clientForm.value.addressSelected[2].slice(6)

  clientForm.value.provinceCode=clientForm.value.addressSelected[0].slice(0,6)
  clientForm.value.cityCode=clientForm.value.addressSelected[1].slice(0,6)
  clientForm.value.districtCode=clientForm.value.addressSelected[2].slice(0,6)

  clientForm.value.addressSelected[0]=clientForm.value.addressSelected[0].slice(0,6)
  clientForm.value.addressSelected[1]=clientForm.value.addressSelected[1].slice(0,6)
  clientForm.value.addressSelected[2]=clientForm.value.addressSelected[2].slice(0,6)



if(route.query.id){
     let res = await updateClient(clientForm.value)
     if(res.code == 200){
        router.push('/user/clientList')
    }else{
      ElMessage.error(res.message)
    }
     
}else if(route.query.docId){
  let res = await addClient(clientForm.value)
   if(res.code == 200){
        router.push({
          path:'/hospital/registration_step2',
          query:{docId:route.query.docId}
        })
    }
}else{
   let res = await addClient(clientForm.value)
   if(res.code == 200){
        router.push('/user/clientList')
    }
}
}
// 如果有id则是更改数据，需要渲染，并且返回时带上id
onMounted(async()=>{
    if(route.query.id){
        let res = await getClientDetail(route.query.id)
        let data = res.data
        if(res.code==200){
        clientForm.value = {

    id:data.id,
    name:data.name,
    // 就诊人证件类型 户口本20  身份证10
    certificatesType:data.certificatesType,
    // 证件号码
    certificatesNo:data.certificatesNo,
    sex: data.sex,
    birthdate: data.birthdate,
    // 就诊人phone
    phone:data.phone,
    // 婚姻状况 0 未婚 1 已婚
    isMarry: data.isMarry,
    // 0自费 1医保
    isInsure:data.isInsure,   
     // 详细地址
    address:data.address,
    // 省市区
    addressSelected:[data.provinceCode+data.param.provinceString,data.cityCode+data.param.cityString,data.districtCode+data.param.districtString],
    // 联系人
    contactsName:data.contactsName,
    contactsPhone:data.contactsPhone,
    contactsCertificatesType:data.contactsCertificatesType,
    contactsCertificatesNo:data.contactsCertificatesNo,
    param : data.param
}
    }
}
})

// 表单规则
const rules =reactive({
    name:[{ required: true, message: '请输入姓名', trigger: 'blur' }],
    certificatesType:[{ required: true, message: '请选择证件类型', trigger: 'change' }],
    certificatesNo:[{ required: true, message: '请输入证件号码', trigger: 'blur' }],
    phone:[{ required: true, message: '请输入手机号', trigger: 'blur' }],
    birthdate:[{ required: true, message: '请选择出生日期', trigger: 'change' }],
    address:[{ required: true, message: '请输入详细地址', trigger: 'blur' }],
    addressSelected:[{ required: true, message: '请选择省市区', trigger: 'change' }],
})
</script>

<template>
    <h2>添加就诊人</h2>
    
       <el-form
    ref="ruleFormRef"
    :model="clientForm"
    :rules="rules"
    status-icon
    label-width="280px"
    class="demo-ruleForm"
  >
<div class="title">
    <div class="block"></div>
        <h4>就诊人信息</h4>
</div>
         

    <el-form-item label="姓名：" prop="name">
      <el-input  placeholder="请输入真实姓名全称"  v-model="clientForm.name"/>
    </el-form-item>
    <el-form-item label="证件类型：" prop="certificatesType" >
      <el-select class="m-2" placeholder="请选择证件类型" v-model="clientForm.certificatesType">
    <el-option
      label="身份证"
      value="10"
    />
    <el-option
      label="户口本"
      value="20"
    />
  </el-select>
    </el-form-item>
    <el-form-item label="证件号码："  prop="certificatesNo">
      <el-input  placeholder="请输入证件号码" v-model="clientForm.certificatesNo"/>
    </el-form-item>
    <el-form-item label="性别：" >
        <el-radio-group v-model="clientForm.sex" style="margin-left: 20px;">
      <el-radio :label=0 size="large">女</el-radio>
      <el-radio :label=1 size="large">男</el-radio>
    </el-radio-group>
    </el-form-item>
    <el-form-item label="出生日期："  prop="birthdate">
        <el-date-picker
        v-model="clientForm.birthdate"
        type="date"
        placeholder="选择日期"
      />
    </el-form-item>
    <el-form-item label="手机号码：" prop="phone">
        <el-input  placeholder="请输入手机号码" v-model="clientForm.phone"/>
    </el-form-item>


    <div class="title">
    <div class="block"></div>
        <h4>建档信息（完善后部分医院首次就诊不排队建档）</h4>
</div>

    <el-form-item label="婚姻状况：" >
        <el-radio-group v-model="clientForm.isMarry" style="margin-left: 20px;">
      <el-radio :label=0 size="large">未婚</el-radio>
      <el-radio :label=1 size="large">已婚</el-radio>
    </el-radio-group>
    </el-form-item>
    <el-form-item label="自费/医保：">
        <el-radio-group v-model="clientForm.isInsure" style="margin-left: 20px;">
      <el-radio :label=0 size="large">自费</el-radio>
      <el-radio :label=1 size="large">医保</el-radio>
    </el-radio-group>
    </el-form-item>

    <el-form-item label="当前住址："  prop="addressSelected" >
        <div ref="cascaderRef"><el-cascader :props="province"  v-model="clientForm.addressSelected" clearable/></div>
    </el-form-item>

    <el-form-item label="详细地址：" prop="address">
        <el-input  placeholder="应公安机关要求，请填写真实地址" v-model="clientForm.address"/>
    </el-form-item>


    <div class="title">
    <div class="block"></div>
        <h4>联系人信息(选填)</h4>
</div>

    <el-form-item label="姓名：" >
      <el-input  placeholder="请输入联系人姓名全称" v-model="clientForm.contactsName"/>
    </el-form-item>
    <el-form-item label="证件类型：" >
      <el-select class="m-2" placeholder="请选择证件类型" v-model="clientForm.contactsCertificatesType">
        <el-option
      label="身份证"
      value="10"
    />
    <el-option
      label="户口本"
      value="20"
    />
  </el-select>
    </el-form-item>
    <el-form-item label="证件号码：" >
      <el-input  placeholder="请输入联系人证件号码" v-model="clientForm.contactsCertificatesNo"/>
    </el-form-item>
    <el-form-item label="手机号码：">
        <el-input  placeholder="请输入联系人手机号码" v-model="clientForm.contactsPhone"/>
    </el-form-item>
  </el-form>


<div class="saveClient">  <el-button type="primary"  @click="addOrUpdateClient">保存</el-button></div>

</template>

<style lang='less' scoped>
h2{
    margin: 20px 0 -20px 20px;
    font-weight: 600;
    font-size: 18px;
}
:deep(.el-input__wrapper) {
    // margin-left:20px;
    box-shadow: none !important;
    border-bottom: 1px solid rgba(202, 203, 205) !important;
    border-radius: 0;
}
.el-input {
   margin-right: 450px;
}
  .el-form-item{
    margin-top: 30px;
  }
.title{
    display: flex;
    align-items: center;
    color: #7f7f7f;
    margin-left: 20px;
    margin:100px 0 60px 20px;
      .block {
    margin-right: 6px;
    height: 14px;
    width: 4px;
    background-color: #4990f1;
    border-radius: 5px;
}
}

.saveClient{
    margin: 200px 0 80px 0;
    display: flex;
    justify-content: center;
    .el-button{
        margin-left: -150px;
        padding: 20px 40px;
        font-size: 16px;
    }
}
:deep(.el-input__suffix-inner){
    display: none;
}
</style>