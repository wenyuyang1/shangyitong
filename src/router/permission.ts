import router from "./index";
// @ts-ignore
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { useLogin } from '@/store/login'
import pinia from '@/store'
// 必须要把pinia独立出来创建，不然main和这里的store会是两个完全独立的store，而且名字一样，这里的store会被覆盖掉，属于官方的bug
let store = useLogin(pinia)
Nprogress.configure({ showSpinner: false });

// 设置无需路由鉴权的网页
const whiteList = ['/hospital/detail', '/home'];
router.beforeEach((to, from, next) => {
    Nprogress.start()
    // @ts-ignore
    document.title = to.meta.title || 'vue-admin-template';
    if (store.token) {
        next()
    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            store.changeLoginVisible(true)
            console.log(to);

            next({ path: 'home' })
        }
    }
});

router.afterEach(() => {
    Nprogress.done()
});