<script setup >
defineOptions({
    // eslint-disable-next-line vue/no-reserved-component-names
    name: "Dashboard",
    inheritAttrs: false,
});

import { useTransition, TransitionPresets } from "@vueuse/core";
import { onMounted, ref, computed, getCurrentInstance, reactive } from 'vue'
import RadarChart from "./components/RadarChart.vue";
import Heatmap from "./components/Heatmap.vue";
import { indexSumApi } from '@/util/request'
import { subMenuProps } from "element-plus";


const date = new Date();




const greetings = computed(() => {
    if (date.getHours() >= 6 && date.getHours() < 8) {
        return "晨起披衣出草堂，轩窗已自喜微凉🌅！";
    } else if (date.getHours() >= 8 && date.getHours() < 12) {
        return "上午好🌞！";
    } else if (date.getHours() >= 12 && date.getHours() < 18) {
        return "下午好☕！";
    } else if (date.getHours() >= 18 && date.getHours() < 24) {
        return "晚上好🌃！";
    } else if (date.getHours() >= 0 && date.getHours() < 6) {
        return "偷偷向银河要了一把碎星，只等你闭上眼睛撒入你的梦中，晚安🌛！";
    }
});

const duration = 5000;

// 收入金额
const amount = ref(0);
const messageCount = useTransition(amount, {
    duration: duration,
    transition: TransitionPresets.easeOutExpo,
});
amount.value = 0;

// 访问数
const visitCount = ref(0);
const visitCountOutput = useTransition(visitCount, {
    duration: duration,
    transition: TransitionPresets.easeOutExpo,
});
visitCount.value = 0;
const rq = ref();
const getdata = () => {
    indexSumApi().then(res => {
        console.log(res)
        amount.value = res.zzp
        visitCount.value = res.cp
        rq.value=res.rq


    })
}
getdata()

</script>

<template>
    <div class="dashboard-container">
        <el-row :gutter="20" style="padding: 20px 0;">
            <el-col :span="24">
                <el-card>
                    <img src="https://v1.jinrishici.com/all.svg" style="max-width:100%; ">
                    {{ greetings }}

                </el-card>

            </el-col>
        </el-row>

        <el-row :gutter="10" style="padding: 20px 0;">
            <el-col :span="12" style="text-align:center">
                <el-card shadow="always">
                    <template #header>
                        <div class="card-header">
                            <h2>成品库存总件数</h2>
                            <div style="font-size: xx-small;">
                               <div>数据更新日期</div>
                                <div>{{rq}}</div>
                            </div>
                            

                        </div>
                    </template>
                    <h1>{{ Math.round(visitCountOutput) }}</h1>
                </el-card>
            </el-col>
            <el-col :span="12" style="text-align:center">
                <el-card shadow="hover"> <template #header>
                        <div class="card-header">
                            <h2>在制品总件数</h2>
                            <div style="font-size: xx-small;">
                               <div>数据更新日期</div>
                                <div>{{rq}}</div>
                            </div>

                        </div>
                    </template>
                    <h1>{{ Math.round(messageCount) }}</h1>
                </el-card>
            </el-col>

        </el-row>


        <!-- Echarts 图表 -->
        <el-row :gutter="10" style="padding: 20px 0;">
            <!-- <el-col :sm="24" :lg="8" class="mb-4">
                <treemap id="treemap" height="400px" width="100%" class="bg-[var(--el-bg-color-overlay)]" />

            </el-col> -->

            <el-col :xs="24" :sm="12" :lg="12" class="mb-4">
                <RadarChart id="radarChart" height="400px" width="100%" class="bg-[var(--el-bg-color-overlay)]" />
            </el-col>

            <el-col :xs="24" :sm="12" :lg="12" class="mb-4">
                <Heatmap id="Heatmap" height="400px" width="100%" class="bg-[var(--el-bg-color-overlay)]" />
            </el-col>


        </el-row>

    </div>
</template>

<style scoped>
.card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 35%;
    }
</style>
