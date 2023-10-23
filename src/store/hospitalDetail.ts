import { defineStore } from 'pinia'
import { reqAllDepartment, reqHospitalDetail } from '@/api/hospital'
import type { HospitalDetailData, hospitalcontent, HospitalAllDepartmentData, HospitalDepartmentResponseData } from '@/api/hospital/type'
export const useHospitalDetail = defineStore('hospitalDetail', {
    state: () => ({
        hospitalDetail: {} as hospitalcontent,
        allDepartment: [] as HospitalAllDepartmentData[],
    }),
    actions: {
        async getHospitalDetail(id: string) {
            const res: HospitalDetailData = await reqHospitalDetail(id)
            this.hospitalDetail = res.data
        },
        async getAllDepartment(id: string) {
            const res: HospitalDepartmentResponseData = await reqAllDepartment(id)
            this.allDepartment = res.data
        }
    }
})