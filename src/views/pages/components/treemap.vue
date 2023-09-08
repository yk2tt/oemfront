<!-- 折线图 -->
<template>
  <el-card>
    <!-- <template #header> 每日 </template> -->
    <div :id="id" :class="className" :style="{ height, width }" />
  </el-card>
</template>

<script setup >
import * as echarts from 'echarts';
import { onMounted, ref, computed, getCurrentInstance } from 'vue'

const getLevelOption = () => {
  return [
    {
      itemStyle: {
        borderWidth: 0,
        gapWidth: 5
      }
    },
    {
      itemStyle: {
        gapWidth: 1
      }
    },
    {
      colorSaturation: [0.35, 0.5],
      itemStyle: {
        gapWidth: 1,
        borderColorSaturation: 0.6
      }
    }
  ];
}



const props = defineProps({
  id: {
    type: String,
    default: 'treemap'
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
    text: '库存数量',
    top: 10,

    left: 'center'
  },

  series: [
    {
      type: 'treemap',
      visibleMin: 300,
      label: {
        show: true,
        formatter: '{b}'
      },
      itemStyle: {
        borderColor: '#fff'
      },
      levels: getLevelOption(),
      upperLabel:{
        show: true,

      }  ,
      label: {
        show: true,
        formatter: '{b}\n{c}'
      },
      tooltip:{
        format: '{b}',
        show: true,
        trigger: 'axis'


      },
      data: [
        {
          name: '成品库存',
          value: 2506,

          children: [
            {
              name: 'nodeAa',
              value: 2500,
            },
            {
              name: 'nodeAb',
              value: 6
            }
          ]
        },
        {
          name: '在制品数量',
          value: 20,
          children: [
            {
              name: 'nodeBa',
              value: 20,
            
            }
          ]
        }
      ]
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
