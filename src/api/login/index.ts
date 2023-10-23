import request from "@/utils/request";
import { SMSData, PhoneLoginData, weixinLoginData } from './type'

enum Api {
    // 发送短信
    SEND_SMS = '/sms/send/',
    LOGIN = '/user/login',
    weixinLogin = '/user/weixin/getLoginParam',
}


export const reqSMS = (phoneNumber: string) => request<any, SMSData>(Api.SEND_SMS + phoneNumber)


export const reqLogin = (data: Object) => request.post<any, PhoneLoginData>(Api.LOGIN,
    {
        ...data
    })

// 获取微信在线二维码并设置存储token信息的页面param
export const reqWeixinLogin = (wxRedirectUri: string) => request.get<any, weixinLoginData>(Api.weixinLogin + `?wxRedirectUri=${wxRedirectUri}/weixinLogin`)

