<script setup lang='ts'>

       import {useRoute} from 'vue-router'
       const $route = useRoute()
       console.log($route.query);
       import {useLogin} from '@/store/login'
       const store = useLogin()
       store.weixinLogin($route.query.name, $route.query.token)
       let html = document.querySelector('html')
       html.style.display = 'none'
</script>

<template>
    <div>
       
    </div>
</template>

<style lang='less' scoped>

</style>