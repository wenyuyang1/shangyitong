// 定义医院类型
export interface hospital {
    id: string,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    params: {
        hostypeString: string,
        fullAddress: string
    },
    hoscode: string,
    hosname: string,
    "hostype": string,
    "provinceCode": string,
    "cityCode": string,
    "districtCode": string,
    "address": string,
    "logoData": string,
    "status": number,
    "bookingRule": {
        "cycle": number,
        "releaseTime": string,
        "stopTime": string,
        "quitDay": number,
        "quitTime": number,
        "rule": string[]
    }
}
export type content = hospital[]

// 指定页码医院数据
export interface data {
    content: content,
    pageable: any,
    totalPages: string,
    "last": boolean,
    "totalElements": number,
    "first": boolean,
    "sort": any,
    "numberOfElements": number,
    "size": number,
    "number": number,
    "empty": boolean
}
// 定义获取指定页码全部医院数据类型
export interface responseData {
    code: number;
    message: string;
    data: data;
    ok: string
}

// 定义医院地区和等级类型
export interface hospitalCategoryData {

    "code": number,
    "message": string,
    "data": [
        {
            "id": number,
            "createTime": string,
            "updateTime": string,
            "isDeleted": number,
            "param": object,
            "parentId": number,
            "name": string,
            "value": string,
            "dictCode": void,
            "hasChildren": boolean
        }[]
    ],
    "ok": boolean
}


// 定义搜索医院数据类型
export interface hospitalSearchData {
    "code": number,
    "message": string,
    "data": [
        {
            "id": string,
            "createTime": string,
            "updateTime": string,
            "isDeleted": number,
            "param": object,
            "hoscode": string,
            "hosname": string,
            "hostype": string,
            "provinceCode": string,
            "cityCode": string,
            "districtCode": string,
            "address": string,
            "intro": string,
            logoData: string,
            "route": string,
            "status": number,
            "bookingRule": {
                "cycle": number,
                "releaseTime": string,
                "stopTime": string,
                "quitDay": number,
                "quitTime": string,
                "rule": [
                    string
                ]
            }
        }
    ],
    "ok": boolean
}


