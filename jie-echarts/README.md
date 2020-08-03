# jie-echarts

## 安装

```
npm install jie-echarts
```

### 说明

echart 进行二次封装的 vue 组件

### 使用

```
<div id="app">
    <jie-echarts :options="echartsOptions"></jie-echarts>
  </div>
</template>
```

#### ts 的使用方式

```
<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import jieEcharts from "jie-echarts";
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
}
</script>
```

##### 开启 echart 的 loading

通过添加 loading 属性可以控制 echarts 的 loading

```
 :loading="loading"
 //模拟loading
  private loading = false;
  created() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
```

##### 捕获 echart 点击事件

通过添加 @eclick 事件绑定进行捕获

```
 @eclick="eclick"
 eclick(params: any) {
    console.log("params :>> ", params);
 }
```

#### 常规使用方式

```
<script>
import jieEcharts from 'jie-echarts';
export default {
  name: 'Test',
  components: {
    jieEcharts
  },
  data () {
    return {
      echartsOptions: {
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
      }
    }
  }
}
</script>
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
