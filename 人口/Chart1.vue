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
  // console.log(
  //   '年末总人口',
  //   dataJson.returndata.datanodes
  //     .filter((item) => item.wds[0].valuecode === 'A030301')
  //     .map((item) => item.data.data)
  // );
  // console.log(" $chart1", $chart1.value)
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init($chart1.value);
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    // legend: {
    //   // data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
    //   data: dataJson.returndata.wdnodes[0].nodes.map((item) => item.name),
    // },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '3%',
      top: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: dataJson.returndata.wdnodes[1].nodes
          .map((item) => item.name)
          .reverse(),
      },
    ],
    yAxis: [{ type: 'value' }],
    series: [
      {
        name: '65岁及以上人口',
        // "A030304"
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        // data: [150, 232, 201, 154, 190, 330, 410],
        data: dataJson.returndata.datanodes
          .filter((item) => item.wds[0].valuecode === 'A030304')
          .map((item) => item.data.data)
          .reverse(),
      },
      {
        name: '15-64岁人口',
        // "A030303"
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        // data: [220, 182, 191, 234, 290, 330, 310],
        data: dataJson.returndata.datanodes
          .filter((item) => item.wds[0].valuecode === 'A030303')
          .map((item) => item.data.data)
          .reverse(),
      },
      {
        name: '0-14岁人口',
        // "A030302"
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        // data: [120, 132, 101, 134, 90, 230, 210],
        data: dataJson.returndata.datanodes
          .filter((item) => item.wds[0].valuecode === 'A030302')
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
