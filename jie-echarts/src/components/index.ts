import jieEcharts from './jie-echarts.vue';

(jieEcharts as any).install = (Vue: any) => {
  Vue.component(jieEcharts.name, jieEcharts);
};

export default jieEcharts;
