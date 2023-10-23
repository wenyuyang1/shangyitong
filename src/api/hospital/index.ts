import request from "@/utils/request";
import { HospitalDetailData, HospitalDepartmentResponseData, HospitalDoctorScheduleListResponseData, HospitalAllDepartmentData } from "./type";
enum Api {
    Hospital_detail = '/hosp/hospital/',
    Hospital_department = '/hosp/hospital/department/',
    Department_registration = '/hosp/hospital/auth/getBookingScheduleRule/',
    FindSchedule = '/hosp/hospital/auth/findScheduleList/',
}
// 获取预约挂号详情
export const reqHospitalDetail = (hosId: string) => request.get<any, HospitalDetailData>(Api.Hospital_detail + hosId);

// 获取医院科室详情
export const reqAllDepartment = (hosId: string) => request.get<any, HospitalDepartmentResponseData>(Api.Hospital_department + hosId)

// 获取科室可挂号详情
export const reqDepartmentRegistration = (page: number, limit: number, hoscode: string, depcode: string) => request.get<any, HospitalAllDepartmentData>(Api.Department_registration + `${page}/${limit}/${hoscode}/${depcode}`)

// 获取目标日期排班详情
export const reqScheduleList = (hoscode: string, depcode: string, date: string) => request.get<any, HospitalDoctorScheduleListResponseData>(Api.FindSchedule + `${hoscode}/${depcode}/${date}`)

