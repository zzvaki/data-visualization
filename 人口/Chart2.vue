<template>
  <div ref="$chart1" class="chart1"></div>
</template>

<script setup>
import dataJson from './Chart1Data.json';
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const $chart1 = ref(null);
onMounted(() => {
  console.log('dataJson', dataJson);
  console.log(
    '年末总人口',
    dataJson.returndata.datanodes
      .filter((item) => item.wds[0].valuecode === 'A030301')
      .map((item) => item.data.data)
  );
  // console.log(" $chart1", $chart1.value)
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init($chart1.value);
  const option = {
    tooltip: {
      trigger: 'axis',
    },
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
    series: [
      {
        name: '总抚养比',
        // A030305
        type: 'line',
        stack: 'Total',
        // data: [120, 132, 101, 134, 90, 230, 210],
        data: dataJson.returndata.datanodes
          .filter((item) => item.wds[0].valuecode === 'A030305')
          .map((item) => item.data.data)
          .reverse(),
      },
      {
        name: '少儿抚养比',
        // A030306
        type: 'line',
        stack: 'Total',
        // data: [120, 132, 101, 134, 90, 230, 210],
        data: dataJson.returndata.datanodes
          .filter((item) => item.wds[0].valuecode === 'A030306')
          .map((item) => item.data.data)
          .reverse(),
      },
      {
        name: '老年抚养比',
        // A030307
        type: 'line',
        stack: 'Total',
        // data: [120, 132, 101, 134, 90, 230, 210],
        data: dataJson.returndata.datanodes
          .filter((item) => item.wds[0].valuecode === 'A030307')
          .map((item) => item.data.data)
          .reverse(),
      },
    ],
  };
  // 绘制图表
  myChart.setOption(option);
});
</script>

<style lang="less" scoped>
.chart1 {
  height: 500px;
}
</style>
