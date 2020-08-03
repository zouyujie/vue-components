<template>
  <!-- 每一个图表都有自己唯一的id,需要动态传入。 -->
  <div :ref="id" :id="id" :class="myclass" :style="style" />
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Echarts from "echarts";
@Component({
  name: "jie-echarts"
})
export default class extends Vue {
  @Prop({ default: "myCharts" }) private id!: string;
  @Prop({ default: "100%" }) private width!: string;
  @Prop({ default: "200px" }) private height!: string;
  @Prop({ default: "echarts-line" }) private myclass!: string;
  @Prop() private options!: object;
  @Prop({ default: false }) private loading!: boolean;

  private MyEcharts: any = null; // echarts实例

  created() {
    console.log("this.options :>> ", this.options);
  }
  mounted() {
    this.InitCharts();
  }

  get style() {
    return {
      height: this.height,
      width: this.width
    };
  }
  @Watch("options", { deep: true })
  onChangeOption(newVal: string, oldVal: string) {
    if (this.MyEcharts) {
      if (newVal) {
        // console.log(JSON.stringify(newVal))
        this.MyEcharts.setOption(newVal, true);
      } else {
        this.MyEcharts.setOption(oldVal, true);
      }
      setTimeout(() => {
        this.MyEcharts.resize();
      });
    } else {
      this.InitCharts();
    }
  }
  @Watch("height")
  onChangeHeight(val: string) {
    if (val) {
      this.height = val;
    }
    if (this.MyEcharts) {
      this.MyEcharts.setOption(this.options, true);
    } else {
      this.InitCharts();
    }
  }
  @Watch("loading")
  onChangeLoading(val: boolean) {
    if (val == true) {
      this.showLoading();
    }
    if (val == false) {
      this.hideLoading();
    }
  }
  //-----------------------method----------------------
  // 组件初始化
  private InitCharts() {
    const dom: any = this.$refs[this.id] as HTMLDivElement; // document.getElementById(this.id);
    this.MyEcharts = Echarts.init(dom);
    if (this.loading == true) {
      this.showLoading();
    }
    /**
     * 此方法适用于所有项目的图表，但是每个配置都需要在父组件传进来，相当于每个图表的配置都需要写一遍，不是特别的省代码，主要是灵活度高
     * echarts的配置项，你可以直接在外边配置好，直接扔进来一个this.option
     */
    this.MyEcharts.clear(); // 适用于大数据量的切换时图表绘制错误,先清空在重绘
    this.MyEcharts.setOption(this.options, true); // 设置为true可以是图表切换数据时重新渲染
    setTimeout(() => {
      this.MyEcharts.resize();
    });
    // 当窗口变化时随浏览器大小而改变
    window.addEventListener("resize", () => {
      this.MyEcharts.resize();
    });
    this.MyEcharts.on("click", (params: any) => {
      this.mapClick(params);
    });
  }
  //组件单击事件
  private mapClick(params: any) {
    // console.log(params, 999999);
    const data = {
      color: params.color,
      data: params.data,
      dataIndex: params.dataIndex,
      seriesIndex: params.seriesIndex,
      chartType: params.componentSubType
    };
    this.$parent.$emit("chartParams", JSON.stringify(data));
    if (params.seriesType == "map") {
      this.$emit("mapValue", params.name);
    }
    this.$emit("eclick", params);
  }
  private showLoading() {
    if (this.MyEcharts) {
      this.MyEcharts.showLoading({
        text: "loading"
        // color: '#4cbbff',
        // textColor: '#4cbbff',
      });
    }
  }
  private hideLoading() {
    if (this.MyEcharts) {
      this.MyEcharts.hideLoading();
    }
  }
  beforeDestroy() {
    window.removeEventListener("resize", () => {
      this.MyEcharts.resize();
    });
  }
}
</script>
<style lang="scss" scoped>
.echarts-line {
  height: 100%;
}
</style>
