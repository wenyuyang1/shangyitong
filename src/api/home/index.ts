import request from '@/utils/request'


import type { responseData, hospitalCategoryData, hospitalSearchData } from './type'

enum Api {
    HospitalPage = '/hosp/hospital/',
    HospitalCategory = "/cmn/dict/findByDictCode/",
    HospitalSearch = '/hosp/hospital/findByHosname/'
}
// page页码 pageSize请求个数
export const hospitalPages = (page: number, pageSize: number, hostype = '', districtCode = '') => {
    return request.get<any, responseData>(Api.HospitalPage + `${page}/${pageSize}?hostype=${hostype}&districtCode=${districtCode}`)
}


// 获取医院分类
export const hospitalCategroy = (dictCode: string) => {
    return request.get<any, hospitalCategoryData>(Api.HospitalCategory + dictCode)
}


// 搜索医院数据
export const hospitalSearch = (hosname: string) => {
    return request.get<any, hospitalSearchData>(Api.HospitalSearch + hosname)
}