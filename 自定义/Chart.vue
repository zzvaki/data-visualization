<template>
  <div ref="$chart1" class="chart1"></div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import * as echarts from 'echarts';
import { useDiyParams } from './store';

const $chart1 = ref(null);
let myChart = null;
watchEffect(
  () => {
    console.log('watchEffect', useDiyParams().echartOptions);
    // 基于准备好的dom，初始化echarts实例
    if (!myChart) {
      myChart = echarts.init($chart1.value);
    }
    // 绘制图表
    myChart.setOption(useDiyParams().echartOptions);
  },
  { flush: 'post' }
);
</script>

<style lang="less" scoped>
.chart1 {
  height: 500px;
}
</style>
