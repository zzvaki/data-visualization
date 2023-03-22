<template>
  <NConfigProvider
    :theme="theme"
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <!-- <NButton>Default</NButton> -->
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
        <!-- <NInput placeholder="输入姓名" /> -->
        <NSelect
          v-model:value="xValue"
          :options="wdOptionsFilter"
          label-field="wdname"
          value-field="wdcode"
          clearable
        />
      </NFormItem>
      <NFormItem label="Y轴纬度">
        <NSelect
          v-model:value="yValue"
          :options="wdOptionsFilter"
          label-field="wdname"
          value-field="wdcode"
          clearable
        />
      </NFormItem>
    </NForm>
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
} from 'naive-ui';
import { zhCN, dateZhCN } from 'naive-ui';
import { ref, computed, watch } from 'vue';
import { useData } from 'vitepress';
import { getZbTree, getQueryData } from './api';

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
const zbValue = ref(undefined);
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
    // console.log('zbValue', zbValue.value);
    getData();
  }
);

// 获取数据
const getData = () => {
  getQueryData({
    dfwds: [
      { wdcode: 'zb', valuecode: zbValue.value },
      { wdcode: 'sj', valuecode: 'LAST24' },
    ],
  }).then((res) => {
    // console.log('res', res);
    wdOptions.value = res.returndata.wdnodes;
  });
};

// 纬度
const xValue = ref(undefined);
const yValue = ref(undefined);
const wdOptions = ref([]);
const wdOptionsFilter = computed(() =>
  wdOptions.value.map((item) => ({
    ...item,
    disabled: [xValue.value, yValue.value].includes(item.wdcode),
  }))
);
</script>

<style lang="less" scoped>
.n-select {
  min-width: 120px;
}
</style>
