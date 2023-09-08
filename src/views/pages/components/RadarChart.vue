<!-- 雷达图 -->
<template>
  <el-card>
    <!-- <template #header> 订单状态雷达图 </template> -->
    <div :id="id" :class="className" :style="{ height, width }" />
  </el-card>
</template>

<script setup >
import * as echarts from 'echarts';
import { onMounted, ref, computed, getCurrentInstance, reactive } from 'vue'
import { indexRadarApi } from '@/util/request'


const data = reactive({
  ph: [],
  sh: [400, 400, 400, 400, 400, 10400],
  rk: [300, 300, 300, 300, 300, 300],
  js: [200, 200, 200, 200, 200, 200],


})

const props = defineProps({
  id: {
    type: String,
    default: 'radarChart'
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
    text: '批次进度雷达图'
  },
  grid: {
    left: '2%',
    right: '2%',
    bottom: '10%',
    containLabel: true
  },
  legend: {
    x: 'center',
    y: 'bottom',
    data: ['收货数量', '入库数量', '发货数量'],
    textStyle: {
      color: '#999'
    }
  },
  radar: {
    // shape: 'circle',
    radius: '65%',
    indicator: [
      { name: '家用电器' },
      { name: '服装箱包' },
      { name: '运动户外' },
      { name: '手机数码' },
      { name: '汽车用品' },
      { name: '家具厨具' }
    ]
  },
  tooltip: {},
  series:
  {
    name: 'Budget vs 222',
    type: 'radar',
    itemStyle: {
      borderRadius: 6,
      color: function (params) {
        //自定义颜色
        const colorList = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C'];
        return colorList[params.dataIndex];
      }
    },
    data: [
      {
        value: data.sh,
        name: '收货数量'
      },
      {
        value: data.rk,
        name: '入库数量'
      },
      {
        value: data.js,
        name: '发货数量'
      }
    ]
  }

};

const getdata = () => {
  indexRadarApi().then(res => {
    const txt = [{
      value: res[0].sh,
      name: '收货数量'
    },
    {
      value: res[0].rk,
      name: '入库数量'
    },
    {
      value: res[0].js,
      name: '发货数量'
    }]
    options.series.data = txt
    options.radar.indicator = res[1]
    initdr1()
  })
}
getdata()



const initdr1 = () => {
  setTimeout(() => {

    const chart = echarts.init(
      document.getElementById(props.id)
    );
    chart.setOption(options);

    window.addEventListener('resize', () => {
      chart.resize();
    });
  }, 500)
};
</script>
