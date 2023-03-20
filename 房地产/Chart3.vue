<template>
  <div ref="$chart1" class="chart1"></div>
</template>

<script setup>
import dataJson from './Chart3Data.json';
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const $chart1 = ref(null);
onMounted(() => {
  // console.log(' $chart1', $chart1.value);
  console.log('dataJson', dataJson);
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init($chart1.value);
  const option = {
    tooltip: {
      trigger: 'axis',
    },
    color: ['#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    // legend: {
    //   data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
    // },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '3%',
      top: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: dataJson.returndata.wdnodes[1].nodes
        .map((item) => item.name)
        .reverse(),
    },
    yAxis: {
      type: 'value',
    },
    // dataZoom: [
    //   {
    //     type: 'inside',
    //     start: 0,
    //     end: 10,
    //   },
    //   {
    //     start: 0,
    //     end: 10,
    //   },
    // ],
    series: dataJson.returndata.wdnodes[0].nodes.map((nodeItem) => ({
      name: nodeItem.name,
      type: 'line',
      data: dataJson.returndata.datanodes
        .filter((item) => item.wds[0].valuecode === 'A060302')
        .filter((item) => item.wds[0].valuecode === nodeItem.code)
        // .filter((item) => item.data.data)
        .map((item) => (item.data.data ? item.data.data : ''))
        .reverse(),
    })),
  };
  // // 绘制图表
  myChart.setOption(option);
});
</script>

<style lang="less" scoped>
.chart1 {
  height: 500px;
}
</style>
