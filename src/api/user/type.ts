// 定义获取就诊人列表数据类型
export interface clientListData {

    code: number,
    data: clientData[],
    message: string
    ok: boolean
}

// 定义就诊人数据类型
export interface clientData {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
        "certificatesTypeString": string,
        "contactsCertificatesTypeString": string,
        "cityString": null,
        "fullAddress": string,
        "districtString": null,
        "provinceString": null
    },
    "userId": number,
    "name": string,
    "certificatesType": string,
    "certificatesNo": string,
    "sex": number,
    "birthdate": string,
    "phone": string,
    "isMarry": number,
    "provinceCode": null,
    "cityCode": null,
    "districtCode": null,
    "address": string,
    "contactsName": string,
    "contactsCertificatesType": string,
    "contactsCertificatesNo": string,
    "contactsPhone": string,
    "isInsure": number,
    "cardNo": null,
    "status": string
}

// 定义预约挂号排班信息
export interface getScheduleDetailData {
    code: number,
    data: {
        "id": string,
        "createTime": string,
        "updateTime": string,
        "isDeleted": number,
        "param": {
            "dayOfWeek": string,
            "depname": string,
            "hosname": string
        },
        "hoscode": string,
        "depcode": string,
        "title": string,
        "docname": string,
        "skill": string,
        "workDate": string,
        "workTime": number,
        "reservedNumber": number,
        "availableNumber": number,
        "amount": number,
        "status": number,
        "hosScheduleId": string
    },
    message: string,
    ok: boolean
}

// 定义预约挂号订单号
export interface createOrderIdData {
    "code": number,
    "message": string,
    "data": number,
    "ok": boolean
}

// 定义订单号响应数据类型
export interface orderInfoResponseData {
    "code": number,
    "message": string,
    "data": orderInfoData,
    "ok": boolean
}
// 定义订单号内容数据类型
export interface orderInfoData {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
        "orderStatusString": string
    },
    "userId": number,
    "outTradeNo": string,
    "hoscode": string,
    "hosname": string,
    "depcode": string,
    "depname": string,
    "scheduleId": string,
    "title": string,
    "reserveDate": string,
    "reserveTime": number,
    "patientId": number,
    "patientName": string,
    "patientPhone": string,
    "hosRecordId": string,
    "number": number,
    "fetchTime": string,
    "fetchAddress": string,
    "amount": number,
    "quitTime": string,
    "orderStatus": number
}

// 取消预约
export interface closeRegistrationData {
    "code": number,
    "message": string,
    "data": any,
    "ok": boolean
}

// 点击支付请求二维码
export interface payQrCodeData {
    "code": number,
    "message": string,
    "data": {
        "codeUrl": any,
        "orderId": number,
        "totalFee": number,
        "resultCode": string
    },
    "ok": boolean
}

// 展示二维码后不断查询是否请求
export interface payStatusData {
    "code": number,
    "message": string,
    "data": boolean,
    "ok": boolean
}

// 提交实名认证数据响应类型
export interface submitRealNameData {
    "code": number,
    "message": string,
    "data": null,
    "ok": boolean
}

// 定义订单列表数据响应类型
export interface orderListData {
    "code": number,
    "message": string,
    "data": {
        "records": any[],
        "total": number,
        "size": number,
        "current": number,
        "orders": [],
        "hitCount": false,
        "searchCount": boolean,
        "pages": number
    },
    "ok": boolean
}
