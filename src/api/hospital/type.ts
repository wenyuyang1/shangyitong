// 定义医院挂号预约数据类型
export interface HospitalDetailData {
    "code": number,
    "message": string,
    "data": hospitalcontent,
    "ok": boolean
}

export interface hospitalcontent {
    "bookingRule": {
        "cycle": number,
        "releaseTime": string,
        "stopTime": string,
        "quitDay": number,
        "quitTime": string,
        "rule": string[]
    },
    "hospital": {
        "id": string,
        "createTime": string,
        "updateTime": string,
        "isDeleted": number,
        "param": {
            "hostypeString": string,
            "fullAddress": string
        },
        "hoscode": string,
        "hosname": string,
        "hostype": string,
        "provinceCode": string,
        "cityCode": string,
        "districtCode": string,
        "address": string,
        "logoData": string,
        "intro": string,
        "route": string,
        "status": number,
        "bookingRule": any
    }
}



// 定义医院所有科室数据类型
export interface HospitalDepartmentResponseData {

    code: number,
    message: string,
    data: HospitalAllDepartmentData[],
    ok: boolean
}


// 定义医院科室数据类型
export interface HospitalAllDepartmentData {
    depcode: string,
    depname: string,
    children: {
        "depcode": string,
        "depname": string,
        "children": null
    }[]

}

// 定义获取指定日期医生排班列表
export interface HospitalDoctorScheduleListResponseData {
    "code": number,
    "message": string,
    "data": DoctorScheduleDetailData[],
    "ok": boolean
}

// 定义排版医生详情
export interface DoctorScheduleDetailData {
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
}