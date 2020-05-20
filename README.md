***src/api/manage.js
const api = {
  user: '/api/dataresourceapp/task_data/test_result_data',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree'
}




好了没

你proxy少东西了  这俩个 按照我的改  出来给我电话可以
```
 proxy: {
      '/api': {
        target: 'http://10.190.200.110:8001/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
```
你没加 pathRewrite  这个

src/api/manage.js 更改第四行 api.user的常量 替换为后端的 api路由地址   

```
const api = {
  user: '/dataresourceapp/task_data/test_result_data', 
```



--------
不用管了忙自己的吧
XHR 中的请求是这个：Request URL: http://localhost:8000/dataresourceapp/task_data/test_result_data/
但是后台给我的地址是这个：http://10.190.200.110:8001/dataresourceapp/task_data/test_result_data/
我在vue.config.js中这样写的：proxy: {
      '/api': {
        target: 'http://10.190.200.110:8001/',
        ws: false,
        changeOrigin: true
      }
    }

你改动的地方给我贴一下!!!!  你代码确定 没改别的吧   
你还原到之前的代码 把mock注释看看有没有 api/user的请求

如果有再更换url 路由地址 

network 选择那个 XHR   你是不是看的all  看错了 这个明显不是请求后端的api

是不是请求了 但是后端数据格式不符合  你console.log 后端接口数据  看看console
---------


Request URL: http://localhost:8000/js/user.js
Request Method: GET
Status Code: 200 OK
Remote Address: 127.0.0.1:8000
Referrer Policy: no-referrer-when-downgrade
改过后，刷新浏览器，发现network中依然访问的是上面这个，是不是第一行那个Request URL应该变为他给我的后台地址啊

# 接口设置
由于线下dev请求存在跨域情况,所以需要配置proxy
vue.config.js 87行

```
devServer: {
    // development server port 8000
    port: 8000,
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8888/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
```
src/api/manage.js 更改第四行 api.user的常量 替换为后端的 api路由地址   例如 /data/asdf/asdfasdf

```
const api = {
  user: '/data/dfas/asdfsadf', // 换为后端地址
```


# 后端接口
在项目目录下新建serverapi.js, 内容

```
var http = require('http');

http.createServer(function (request, response) {

  // 发送 HTTP 头部
  // HTTP 状态值: 200 : OK
  // 内容类型: text/plain
  response.writeHead(200, {'Content-Type': 'text/plain'});

  // 发送响应数据 "Hello World"

  response.end("[820,932,901,934,1290,1330,1320]");
}).listen(8888);


```

上面的serverapi.js是用node做后端的api,执行 node serverapi.js 就浏览器在127.0.0.1:8888 看到接口的返回值,
注意真实的api 还需后端提供,此文件只是为了自己测试用

# 更改表单代码
src/views/form/advancedForm/AdvancedForm.vue 需要添加import
根据需要更改  src/api/manage.js 文件 目前 写的是请求getUserList, 根据实际情况重新命名


drawline方法需要替换为



```
import { getUserList } from '@/api/manage'

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
            data: res.legendData,
            selected: res.legendSelected
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
            data: res.xAxisData
          },
          yAxis: {
            type: 'value'
          },
          series: []
        }

        const seriesData = []
        for (var key in res.seriesData) {
          const itemSData = { name: '', type: 'line', stack: '总量', data: [], smooth: true }
          itemSData.name = key
          itemSData.data = res.seriesData[key]
          seriesData.push(itemSData)
        }
        optionData.series = seriesData
        console.log(optionData)
        chartLine.setOption(optionData)
      })
```

# 在src/mock/services/user.js 添加mock数据格式如下

```
const apiChartData = {
  'legendData': [
    '整机',
    'SOC+DDR',
    'CPU_L',
    'CPU+BM',
    'GPU',
    'CPU_MEM',
    '其他指标'
  ],
  'seriesData': {
    '整机': [
      4.9,
      5.3,
      4.7,
      8.4,
      5.56,
      9.89,
      2.32
    ],
    'SOC+DDR': [
      82,
      93,
      90,
      93,
      12,
      13,
      13
    ],
    'CPU_L': [
      82,
      93,
      90,
      93,
      12,
      13,
      13
    ],
    'CPU+BM': [
      82,
      93,
      90,
      93,
      12,
      13,
      13
    ],
    'GPU': [
      82,
      93,
      90,
      93,
      12,
      13,
      13
    ],
    'CPU_MEM': [
      82,
      93,
      90,
      93,
      12,
      13,
      13
    ],
    '其他指标': [
      82,
      93,
      90,
      93,
      12,
      13,
      13
    ]
  },
  'legendSelected': {
    '整机': true,
    'SOC+DDR': false,
    'CPU_L': false,
    'CPU+BM': false,
    'GPU': false,
    'CPU_MEM': false,
    '其他指标': false
  },
  'xAxisData': [
    '版本1',
    '版本2',
    '版本3',
    '版本4',
    '版本4.0',
    '版本5',
    '版本5.0'
  ]
}
Mock.mock(/\/api\/user/, 'get', apiChartData)

```








