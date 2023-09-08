<!-- 折线图 -->
<template>
  <el-card>
    <template #header> 每日 </template>
    <div :id="id" :class="className" :style="{ height, width }" />
  </el-card>
</template>

<script setup >
import * as echarts from 'echarts';
import { onMounted, ref, computed, getCurrentInstance } from 'vue'
const props = defineProps({
  id: {
    type: String,
    default: 'line'
  },
  className: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '200px',
    required: true
  },
  height: {
    type: String,
    default: '200px',
    required: true
  }
});
const options = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
};

onMounted(() => {
  const chart = echarts.init(
    document.getElementById(props.id)
  );
  chart.setOption(options);
  window.addEventListener('resize', () => {
    chart.resize();
  });
});
</script>
