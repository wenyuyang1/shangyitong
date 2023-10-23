<script setup lang="ts">
import { ref } from "vue"
import { hospitalSearch} from "@/api/home"
import type{ hospitalSearchData } from "@/api/home/type"
import {useRouter} from "vue-router"
const $router = useRouter()
const hospitalName = ref<string>("")
async function queryInput(keyword: string,callback:any){
    if(keyword!=''){    
        let res: hospitalSearchData = await hospitalSearch(keyword)
   let searchData= res.data.map((item)=>{
       return { 
        value:item.hosname,
        hoscode:item.hoscode,
    }
   })
    callback(searchData)
    }else{
        callback([])
    }
}
function goDetail(item:any){
    $router.push({
        path:'/hospital',
        query:{hoscode:item.hoscode}
    })
}
</script>

<template>
    <div class="search">
        <el-autocomplete v-model="hospitalName" placeholder="请输入医院名称" clearable  :fetch-suggestions="queryInput" @select="goDetail"/>


        <el-button type="primary">
            <!-- #region svg图标 -->
            <svg t="1696478039616" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="1655" width="18" height="18">
                <path
                    d="M447.325002 129.919978c-178.868807 0-323.872319 145.003512-323.872319 323.874365s145.003512 323.874365 323.872319 323.874365c178.870854 0 323.874365-145.003512 323.874365-323.874365S626.195855 129.919978 447.325002 129.919978zM447.325002 713.712071c-143.31915 0-259.915681-116.598578-259.915681-259.917728s116.596532-259.917728 259.915681-259.917728 259.917728 116.598578 259.917728 259.917728S590.643128 713.712071 447.325002 713.712071z"
                    fill="#ffffff" p-id="1656"></path>
                <path
                    d="M891.573945 840.061734 748.236376 696.699606c-13.43601 16.625656-28.371164 31.91385-44.338834 46.099944l142.458549 142.481062c6.246261 6.246261 14.427594 9.368368 22.60995 9.368368s16.363689-3.123131 22.60995-9.368368C904.065444 872.789113 904.065444 852.553233 891.573945 840.061734z"
                    fill="#ffffff" p-id="1657"></path>
            </svg>
            <!-- #endregion -->
            搜索</el-button>
    </div>
</template>

<style lang="less" scoped>
// #region
.search {
    display: flex;
    justify-content: center;
    margin: 30px 0;

    :v-deep(.el-autocomplete) {
        // display: flex;
        // justify-content: center;
        // align-content: center;
        width: 600px;
        margin-right: 5px;

    }

    svg {
        margin-right: 5px;
    }
}

// #endregion
</style>
