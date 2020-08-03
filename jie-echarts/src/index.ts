import jieEcharts from './components/jie-echarts.vue';

const components = [jieEcharts];

const install = (Vue: any) => {
  if ((install as any).installed) return;
  (install as any).installed = true;
  components.map((component) => {
    Vue.component(component.name, component);
  });
};
// 这一步判断window.Vue是否存在，因为直接引用vue.min.js， 它会把Vue绑到Window上，我们直接引用打包好的js才能正常跑起来。
if (typeof window !== 'undefined' && (window as any).Vue) {
  // window.Vue.use(install)
  install((window as any).Vue);
}

export default jieEcharts;
