<!-- 折线图 -->
<template>
  <el-card>
    <!-- <template #header> 每日数量 </template> -->
    <div :id="id" :class="className" :style="{ height, width }"></div>
  </el-card>
</template>

<script setup >
import * as echarts from 'echarts';
import { onBeforeMount, onMounted, ref, computed, getCurrentInstance, reactive, watch } from 'vue'
import { indexHeatmapApi } from '@/util/request'


const dataa = reactive(
  {
    databb: []
  })



const getdata = () => {
  console.log('getdata')
  indexHeatmapApi().then(res => {
    dataa.databb = res.data
    console.log(dataa.databb)
    const chart = echarts.init(
      document.getElementById(props.id)
    );
    chart.setOption(options);
    window.addEventListener('resize', () => {
      chart.resize();
    });
  })
}



const getVirtualData = (year) => {
  const date = +echarts.time.parse(year + '-01-01');
  const end = +echarts.time.parse(+year + 1 + '-01-01');
  const dayTime = 3600 * 24 * 1000;
  const data = [];
  for (let time = date; time < end; time += dayTime) {
    data.push([
      echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
      Math.floor(Math.random() * 10000)
    ]);
  }
  console.log(data)
  return data;
}
const props = defineProps({
  id: {
    type: String,
    default: 'heatmap'
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
  title: {
    top: 10,
    left: 'center',
    text: '每日生产数量'
  },
  tooltip: {},
  visualMap: {
    min: 0,
    max: 200000,
    type: 'piecewise',
    orient: 'horizontal',
    left: 'center',
    top: 65
  },
  calendar: {
    top: 120,
    left: 30,
    right: 30,
    cellSize: ['auto', 30],
    range: '2023',
    itemStyle: {
      borderWidth: 0.5
    },
    yearLabel: { show: false }
  },
  series: {
    type: 'heatmap',
    coordinateSystem: 'calendar',
    // data: getVirtualData('2023')
    data: dataa.databb
  }
};
  getdata()


// onMounted(() => {
//   console.log("onMounted")
//   const chart = echarts.init(
//     document.getElementById(props.id)
//   );
//   chart.setOption(options);
//   window.addEventListener('resize', () => {
//     chart.resize();
//   });
// });

// watch(dataa.databb, (newValue, oldValue) => {
//   options = {
//     series: {
//       type: 'heatmap',
//       coordinateSystem: 'calendar',
//       // data: getVirtualData('2023')
//       data: dataa.databb
//     }
//   }
//   console.log(newValue)
// }
// );



</script>
