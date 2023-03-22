import { defineStore } from 'pinia';

export const useDiyParams = defineStore('diyParams', {
  state: () => ({
    count: 0,
    echartOptions: {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
      ],
    },
  }),
  actions: {
    increment() {
      this.count++;
    },
  },
});
