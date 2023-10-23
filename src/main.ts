import { createApp } from 'vue'
import './reset.css'
import router from '@/router/index.js'
import App from './App.vue'
import hospitalFooter from '@/components/hospital_footer.vue'
import hospitalHeader from '@/components/hospital_header.vue'
import login from '@/components/login/index.vue'
import ElementPlus from 'element-plus'
import pinia from '@/store/index'
// 一定要把中间件放到mount前面，不然f5刷新会把内容刷掉
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import './router/permission'
const app = createApp(App)


app.use(router)
app.use(pinia)
app.use(ElementPlus, {
    locale: zhCn,
})

app.component('hospitalFooter', hospitalFooter)
app.component('hospitalHeader', hospitalHeader)
app.component('login', login)



app.mount('#app')
