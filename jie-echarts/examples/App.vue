<template>
  <div id="app">
    <jie-echarts :options="echartsOptions" @eclick="eclick" :loading="loading"></jie-echarts>
    <!-- <router-view /> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import jieEcharts from "../src/index";
@Component({
  components: {
    jieEcharts
  }
})
export default class TestJieEchartsPreview extends Vue {
  protected echartsOptions = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line"
      }
    ]
  };
  private loading = false;
  created() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
  eclick(params: any) {
    console.log("params :>> ", params);
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
