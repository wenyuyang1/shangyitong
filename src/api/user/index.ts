import request from "@/utils/request";
import type { clientListData, getScheduleDetailData, createOrderIdData, orderInfoResponseData, closeRegistrationData, payQrCodeData, payStatusData, orderListData } from "./type";

enum Api {
    clientList = '/user/patient/auth/findAll',
    scheduleDetail = '/hosp/hospital/getSchedule/',
    createOrderId = '/order/orderInfo/auth/submitOrder/',
    orderInfo = '/order/orderInfo/auth/getOrderInfo/',
    closeOrder = '/order/orderInfo/auth/cancelOrder/',
    QRCode = '/order/weixin/createNative/',
    orderStatus = '/order/weixin/queryPayStatus/',
    submitRealName = '/user/auth/userAuah',
    getRealName = '/user/auth/getUserInfo',
    stateList = '/order/orderInfo/auth/getStatusList',
    patientList = 'user/patient/auth/findAll',
    orderList = '/order/orderInfo/auth/',
    clientDetail = '/user/patient/auth/get/',
    addClient = '/user/patient/auth/save',
    province = '/cmn/dict/findByParentId/',
    deleteClient = '/user/patient/auth/remove/',
    updateClient = '/user/patient/auth/update',

}

// 获取就诊人列表
export const getClientList = () => request.get<any, clientListData>(Api.clientList)


// 获取就诊排班信息
export const getScheduleDetail = (docId: any) => request.get<any, getScheduleDetailData>(Api.scheduleDetail + docId)


// 生成订单id信息
export const createOrderId = (hoscode: string, scheduleId: string, patientId: number) => request.post<any, createOrderIdData>(Api.createOrderId + `${hoscode}/${scheduleId}/${patientId}`)


// 获取订单信息
export const getOrderInfo = (orderId: string) => request.get<any, orderInfoResponseData>(Api.orderInfo + orderId)

// 取消预约
export const reqCloseRegistration = (orderId: string) => request.get<any, closeRegistrationData>(Api.closeOrder + orderId)

// 获取支付验证码
export const getQRCode = (orderId: string) => request.get<any, payQrCodeData>(Api.QRCode + orderId)

// 查询支付状态
export const getPayStatus = (orderId: string) => request.get<any, payStatusData>(Api.orderStatus + orderId)

// 提交实名认证信息
export const submitRealName = (data: any) => request.post<any, any>(Api.submitRealName, data)


// 获取实名认证信息
export const getRealName = () => request.get<any, any>(Api.getRealName)

// 获取订单状态分类
export const getOrderStatus = () => request.get<any, any>(Api.stateList)

// 获取就诊人列表
export const getPatientList = () => request.get<any, any>(Api.patientList)


// 获取指定页数的订单列表
export const getOrderList = (page: any, patientId: any, orderStatus: any) => {
    if (patientId != undefined && page != undefined && orderStatus != undefined) {
        return request.get<any, orderListData>(Api.orderList + `${page}/10?patientId=${patientId}&orderStatus=${orderStatus}`)
    } else if (patientId != undefined && page != undefined) {
        return request.get<any, orderListData>(Api.orderList + `${page}/10?patientId=${patientId}`)
    } else if (orderStatus != undefined && page != undefined) {
        return request.get<any, orderListData>(Api.orderList + `${page}/10?orderStatus=${orderStatus}`)
    } else {
        return request.get<any, orderListData>(Api.orderList + `${page}/10`)
    }
}

// 获取指定id的就诊人详情
export const getClientDetail = (patientId: any) => request.get<any, any>(Api.clientDetail + patientId)

// 新增就诊人
export const addClient = (data: any) => request.post<any, any>(Api.addClient, data)

// 获取地区
export const getProvince = (addressId: any = 86) => request.get<any, any>(Api.province + addressId)

// 删除就诊人
export const deleteClient = (patientId: any) => request.delete<any, any>(Api.deleteClient + patientId)

// 修改就诊人
export const updateClient = (data: any) => request.put<any, any>(Api.updateClient, data)