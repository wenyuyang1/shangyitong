<script setup lang='ts'>
import container_left from "./container_left.vue";
import container_right from "./container_right.vue";

</script>

<template>
    <div>
        <el-row :gutter="22">
            <el-col :span='18'>
                <container_left></container_left>
            </el-col>
            <el-col :span="6">
                <container_right></container_right>
            </el-col>
        </el-row>

    </div>
</template>

<style lang='less' scoped></style>