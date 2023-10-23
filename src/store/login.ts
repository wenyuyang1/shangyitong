import { defineStore } from "pinia";
import { reqLogin } from "@/api/login";
import type { PhoneLoginData } from "@/api/login/type";
export const useLogin = defineStore('login', {
    state: () => ({
        loginVisible: false as boolean,
        token: JSON.parse(localStorage.getItem('HospitalToken') as string)?.token || '',
        name: JSON.parse(localStorage.getItem('HospitalToken') as string)?.name || '',
    }),
    actions: {
        changeLoginVisible(boolean: boolean) {
            this.loginVisible = boolean;
        },


        async changeToken(SmsData: string, phone: string) {
            let res: PhoneLoginData = await reqLogin({
                code: SmsData,
                phone: phone
            })
            this.token = res.data.token
            this.name = res.data.name
            localStorage.setItem('HospitalToken', JSON.stringify(res.data))
            this.loginVisible = false


        },
        weixinLogin(name: string, token: string) {
            localStorage.setItem('HospitalToken', JSON.stringify({
                name: name,
                token: token
            })
            )
        },
        loginOut() {
            this.token = ''
            this.name = ''
            localStorage.removeItem('HospitalToken')
        }
    }
})