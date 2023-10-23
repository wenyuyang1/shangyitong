<script setup lang='ts'>
import card from './card.vue'
import { ref, onMounted } from 'vue'
import { hospitalPages, hospitalCategroy } from '@/api/home/index'
import type { content, responseData,hospitalCategoryData } from '@/api/home/type'
// #region 获取页码医院卡片
// 当前页码
let PageNo = ref(1)
// 每页显示多少条
let pageSize = ref(10)
// 一共多少条
let total = ref(0)
// 定义医院列表数组
const hospitals = ref<content>([])
// 获取医院列表
const getHospitals = async () => {
    let res: responseData = await hospitalPages(PageNo.value, pageSize.value,hosType.value,hosAddress.value)
    hospitals.value = res.data.content
    total.value = res.data.totalElements
}
onMounted(getHospitals)
// 虽然改变当前页码和改变每页显示条数的方法一样，但是不要  复用，因为有时条数多了页面变少需要重新请求并跳转第一页，所以会发两遍请求，而在js中改变pageNo的value值不会走handleCurrentChange
function handleSizeChange() {
    PageNo.value = 1
    getHospitals()
}
function handleCurrentChange() {
    getHospitals()
}


// #endregion

// #region 医院等级和医院地址筛选医院
const AllHospitalType = ref<any>({})
const AllHospitalAddress = ref<any>({})
const hosType = ref<string>('')
const hosAddress = ref<string>('')
onMounted(async () => {
    let hostype:hospitalCategoryData = await hospitalCategroy('hostype')
    AllHospitalType.value = hostype.data
    let address:hospitalCategoryData = await hospitalCategroy('beijin')
    AllHospitalAddress.value = address.data
})

 function handleTypeChange(val: string) {
    if(hosType.value != val){
        hosType.value = val
    getHospitals()
    }
}
function handleAddressChange(val: string) {
    if(hosAddress.value != val){
        hosAddress.value = val
    getHospitals()
    }
}

// #endregion
</script>

<template>
       <div class="hospital">
        <h2>医院</h2>
        <!-- 区分等级 -->
        <ul class="level">
            <div>等级:</div>
            <li @click="handleTypeChange('')" :class="{active: hosType==''?true:false}">全部</li>
            <li v-for="item in AllHospitalType" :key="item.id" @click="handleTypeChange(item.value)" :class="{active: hosType==item.value?true:false}">{{ item.name }}</li>
        </ul>
        <!-- 区分地区 -->
        <ul class="address">
            <div>地区:</div>
            <li @click="handleAddressChange('')" :class="{active: hosAddress==''?true:false}">全部</li>
            <!-- 不知道为何，有时@click会挂载不上方法 -->
            <li v-for="item in AllHospitalAddress" :key="item.id" @click="handleAddressChange(item.value)" :class="{active: hosAddress==item.value?true:false}">{{ item.name }}</li>
        </ul>
        <div class="container">
            <card v-for="item in hospitals " :key="item.id" :item="item" ></card>
        </div>
        <el-pagination v-model:current-page="PageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
            layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>


<style lang='less' scoped>
.hospital {
    width: 100%;
    min-height: 700px;
    max-height: 300vh;
    color: #7f7f7f;

    h2 {
        color: dimgray;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 15px;
    }

    .level,
    .address {
        display: flex;
        margin-bottom: 10px;
        flex-wrap: wrap;

        div {
            margin-right: 10px;
            margin: 5px 5px;
        }

        li {
            margin: 5px 5px;
            font-size: 16px;
        }

        .active{
            color: #7cbbfe; 
        }

        li:hover {
            color: #7cbbfe;
        }
    }

    .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

}
</style>