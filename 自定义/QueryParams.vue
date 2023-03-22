<template>
  <NConfigProvider
    :theme="theme"
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <NSpace vertical>
      <NForm :show-feedback="false">
        <NFormItem label="指标">
          <NCascader
            class="custom-cascader"
            v-model:value="zbValue"
            placeholder="没啥用的值"
            :options="zbOptions"
            check-strategy="child"
            remote
            :on-load="handleLoad"
            value-field="id"
            label-field="name"
          />
        </NFormItem>
      </NForm>
      <NForm inline :show-feedback="false">
        <NFormItem label="X轴纬度">
          <NSelect
            :disabled="!zbValue"
            v-model:value="xValue"
            :options="wdOptionsFilter"
            label-field="wdname"
            value-field="wdcode"
            clearable
          />
        </NFormItem>
        <NFormItem label="时间范围" v-if="xValue === 'sj'">
          <NPopover placement="right" trigger="focus">
            <template #trigger>
              <NSelect
                v-model:value="dateValue"
                :options="dateOptions"
                filterable
                tag
                clearable
                label-field="name"
                value-field="code"
              />
            </template>
            <p>输入格式如下:</p>
            <p>月: 201201,201205</p>
            <p>季: 2012A,2012B,2012C,2012D</p>
            <p>年: 2012,2013</p>
            <p>其他: 2013-,last10</p>
            <p>按回车键确定输入</p>
          </NPopover>
        </NFormItem>
      </NForm>
      <NForm inline :show-feedback="false">
        <NFormItem label="Y轴纬度">
          <NSelect
            :disabled="!zbValue"
            v-model:value="yValue"
            :options="wdOptionsFilter"
            label-field="wdname"
            value-field="wdcode"
            clearable
          />
        </NFormItem>
        <NFormItem label="筛选指标" v-if="yValue === 'zb'">
          <NSelect
            :style="zbSelectedStyle"
            v-model:value="zbSelected"
            :options="zbSelectedOptions"
            multiple
            max-tag-count="responsive"
            label-field="cname"
            value-field="code"
            clearable
            :render-option="renderZbSelectedOption"
          />
        </NFormItem>
      </NForm>
      <NForm inline :show-feedback="false">
        <NFormItem>
          <NButton type="info" :disabled="!zbValue" @click="setEchartOptions">
            生成图表
          </NButton>
        </NFormItem>
      </NForm>
    </NSpace>
  </NConfigProvider>
</template>

<script setup>
import {
  NConfigProvider,
  darkTheme,
  NButton,
  NCascader,
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NSpace,
  NPopover,
} from 'naive-ui';
import { zhCN, dateZhCN } from 'naive-ui';
import { ref, computed, watch, h } from 'vue';
import { useData } from 'vitepress';
import { getZbTree, getQueryData } from './api';
import { useDiyParams } from './store';

// ui主题样式覆盖
const themeOverrides = {
  Cascader: {
    columnWidth: 'unset',
    menuHeight: 'calc(var(--n-option-height) * 10 * 1.1)',
  },
};

// 响应darkmode
const theme = computed(() => (useData().isDark.value ? darkTheme : null));

// 指标选择器
const zbValue = ref(null);
const zbOptions = ref([]);
const handleLoad = async (option) =>
  getZbTree(option.id).then((res) => {
    // console.log('res', res);
    option.children = res.map((item) => ({
      ...item,
      isLeaf: !item.isParent,
    }));
  });

// 获取指标类型
getZbTree().then((res) => {
  // console.log('res', res);
  zbOptions.value = res.map((item) => ({
    ...item,
    isLeaf: !item.isParent,
  }));
});

// 获取数据
watch(
  () => zbValue.value,
  (val) => {
    console.log('zbValue', zbValue.value);
    xValue.value = 'sj';
    yValue.value = null;
    dateValue.value = null;
    zbSelected.value = null;
    getData();
  }
);

// 获取数据
const dataJson = ref(null);
const getData = async () => {
  const dfwds = [{ wdcode: 'zb', valuecode: zbValue.value }];
  dateValue.value && dfwds.push({ wdcode: 'sj', valuecode: dateValue.value });
  return getQueryData({ dfwds }).then((res) => {
    console.log('res', res);
    dataJson.value = res;
    wdOptions.value = res.returndata.wdnodes;
  });
};

// 纬度
const xValue = ref(null);
const yValue = ref(null);
const wdOptions = ref([]);
const wdOptionsFilter = computed(() =>
  wdOptions.value.map((item) => ({
    ...item,
    disabled: [xValue.value, yValue.value].includes(item.wdcode),
  }))
);

// 时间范围
const dateValue = ref(null);
const dateOptions = ref([
  {
    code: 'LAST12',
    name: '最近12个月',
  },
  {
    code: 'LAST24',
    name: '最近24个月',
  },
  {
    code: 'LAST36',
    name: '最近36个月',
  },
  {
    code: 'LAST120',
    name: '最近10年',
  },
  {
    code: 'LAST240',
    name: '最近20年',
  },
  {
    code: 'LAST600',
    name: '最近50年',
  },
]);

// 指标列筛选
const zbSelected = ref(null);
// const zbSelectedOptions = ref([]);
const zbSelectedOptions = computed(() => {
  if (dataJson.value) {
    return dataJson.value.returndata.wdnodes.find(
      (item) => item.wdcode === 'zb'
    ).nodes;
  }
  return [];
});
const renderZbSelectedOption = ({ node, option }) =>
  h(
    NPopover,
    { placement: 'right' },
    {
      trigger: () => node,
      default: () => option.memo,
    }
  );
// 指标列筛选选择器样式
const zbSelectedStyle = computed(() => {
  const w = Math.max(
    ...zbSelectedOptions.value.map((item) => item.cname.length)
  );
  console.log('w', w);
  return `min-width: ${w}em;`;
});

// 生成图表
const setEchartOptions = async () => {
  await getData();

  useDiyParams().echartOptions = {
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
      data: dataJson.value.returndata.wdnodes[1].nodes
        .map((item) => item.name)
        .reverse(),
    },
    yAxis: {
      type: 'value',
    },
    series: dataJson.value.returndata.wdnodes[0].nodes
      .filter((nodeItem) => {
        console.log('filter', zbSelected.value, nodeItem.code);
        if (Array.isArray(zbSelected.value)) {
          return zbSelected.value.includes(nodeItem.code);
        } else {
          return true;
        }
      })
      .map((nodeItem) => ({
        name: nodeItem.name,
        type: 'line',
        data: dataJson.value.returndata.datanodes
          .filter((item) => item.wds[0].valuecode === nodeItem.code)
          .map((item) => (item.data.data ? item.data.data : ''))
          .reverse(),
      })),
  };
};
</script>

<style lang="less" scoped>
.n-select {
  min-width: 120px;
}
</style>
