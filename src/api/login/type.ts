
// 定义短信数据类型
export interface SMSData {
    code: number;
    data: string;
    message: string;
    ok: boolean
}

export interface PhoneLoginData {
    code: number;
    data: {
        name: string,
        token: string
    };
    message: string;
    ok: boolean
}


// 定义微信登录所需二维码参数
export interface weixinLoginData {
    "code": number,
    "message": string,
    "data": {
        "redirectUri": string,
        "appid": string,
        "scope": string,
        "state": string
    },
    "ok": boolean
}
