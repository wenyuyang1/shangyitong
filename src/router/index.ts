import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import('@/pages/home/index.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/hospital',
        component: () => import('@/pages/hospital/index.vue'),
        redirect: 'hospital/detail',
        children: [
            {
                path: '/hospital/registration',
                component: () => import('@/pages/hospital/container/registration/registration.vue'),
                meta: {
                    title: '预约挂号'
                }

            },
            {
                path: '/hospital/registration_step1',
                component: () => import('@/pages/hospital/container/registration/registration_step1.vue'),
                meta: {
                    title: '预约挂号第一步'
                }
            },
            {
                path: '/hospital/registration_step2',
                component: () => import('@/pages/hospital/container/registration/registration_step2.vue'),
                meta: {
                    title: '预约挂号第二步'
                }
            },
            {
                path: '/hospital/detail',
                component: () => import('@/pages/hospital/container/detail.vue'),
                meta: {
                    title: '医院详情'
                }
            },
            {
                path: '/hospital/notice',
                component: () => import('@/pages/hospital/container/notice.vue'),
                meta: {
                    title: '预约需知'
                }
            },
        ]
    },
    {
        path: '/user',
        component: () => import('@/pages/userDetail/index.vue'),
        redirect: '/user/realName',
        children: [
            {
                path: '/user/realName',
                component: () => import('@/pages/userDetail/realName/realName.vue'),
                meta: {
                    title: '实名认证'
                }
            },
            {
                path: '/user/registrationList',
                component: () => import('@/pages/userDetail/registrationList/registrationList.vue'),
                meta: {
                    title: '挂号订单'
                }
            },
            {
                path: '/user/clientList',
                component: () => import('@/pages/userDetail/clientList/clientList.vue'),
                meta: {
                    title: '就诊人管理'
                }
            },
            {
                path: '/user/clientDetail',
                component: () => import('@/pages/userDetail/clientList/clientDetail.vue'),
                meta: {
                    title: '就诊人详情'
                }
            },
            {
                path: '/user/client/add',
                component: () => import('@/pages/userDetail/clientList/clientAdd.vue'),
                meta: {
                    title: '更改就诊人'
                }
            }
        ]
    },
    {
        path: '/weixinLogin',
        component: () => import('@/pages/weixinLogin/index.vue')
    }


]




export default createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes,
    scrollBehavior(): object {
        return { top: 0, left: 0 }
    }
})