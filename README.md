# 接口设置
由于线下dev请求存在跨域情况,所以需要配置proxy
vue.config.js 87行
含义 127.0.0.1:8000/api/user 当前请求 会转发到 后端 http://127.0.0.1:8888/ (更换后端的接口地址 ip 端口 url 全路径)

```
devServer: {
    // development server port 8000
    port: 8000,
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    proxy: {
      '/api/user': {
        target: 'http://127.0.0.1:8888/',
        ws: false,
        changeOrigin: true
      }
    }
  },
```
src/views/form/advancedForm/AdvancedForm.vue 需要添加import
```
import { getUserList } from '@/api/manage'
```

drawline方法需要替换为
期望后端接口数据格式为
{
  "整机": [4.9, 5.3, 4.7, 8.4, 5.56, 9.89, 2.32],
  "CPU_l":[82, 93, 90, 93, 12, 13, 13]"
}

key替换为代表对应含义英文,值为echarts需要的data

这样代码拿到返回值替换optionData里面的data即可

```
drawLine () {
      const chartLine = echarts.init(document.getElementById('myChart'))
      const parameter = {}
      getUserList(parameter).then(res => {
        const optionData = {
          title: {
            text: '各测试项值'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['整机', 'SOC+DDR', 'CPU_L', 'CPU+BM', 'GPU', 'CPU_MEM', '其他指标'],
            selected: {
              '整机': true,
              'SOC+DDR': false,
              'CPU_L': false,
              'CPU+BM': false,
              'GPU': false,
              'CPU_MEM': false,
              '其他指标': false
            }
          },

          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['版本1', '版本2', '版本3', '版本4', '版本4.0', '版本5', '版本5.0']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '整机',
              type: 'line',
              stack: '总量',
              data: [4.9, 5.3, 4.7, 8.4, 5.56, 9.89, 2.32],
              smooth: true,
              itemStyle: {
                normal: {
                  color: '#0F0'
                }
              },
              lineStyle: {
                normal: {
                  width: 10,
                  color: '#0F0'
                }
              }
            },
            {
              name: 'SOC+DDR',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310],
              smooth: true
            },
            {
              name: 'CPU_L',
              type: 'line',
              stack: '总量',
              data: [82, 93, 90, 93, 12, 13, 13],
              smooth: true
            },
            {
              name: 'CPU+BM',
              type: 'line',
              stack: '总量',
              data: [120, 132, 101, 134, 90, 230, 210],
              smooth: true
            },
            {
              name: 'GPU',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310],
              smooth: true
            },
            {
              name: 'CPU_MEM',
              type: 'line',
              stack: '总量',
              data: res,
              smooth: true
            },
            {
              name: '其他指标',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310],
              smooth: true
            }
          ]
        }
        chartLine.setOption(optionData)
        console.log('getUserList', res)
      })

        // this.memberLoading = true
        // 基于准备好的dom，初始化echarts实例
        // const myChart = echarts.init(document.getElementById('myChart'))
        // // 绘制图表
        // myChart.setOption({
        //     title: { text: '在Vue中使用echarts' },
        //     tooltip: {},
        //     xAxis: {
        //         data: ['衬衫', '羊毛衫', '雪纺衫", "裤子', '高跟鞋', '袜子']
        //     },
        //     yAxis: {},
        //     series: [{
        //         name: '销量',
        //         type: 'bar',
        //         data: [5, 20, 36, 10, 10, 20]
        //     }]
        // })
    },
```
