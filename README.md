router.config.js

```
{
            path: '/form/advanced-form',
            name: 'AdvanceForm',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: '汇总数据', keepAlive: true, permission: [ 'form' ] }
 }
 ```
 
Workplace.vue


```
clickfun (e) {
      // 获取当点元素的文本值
      const Txt = e.currentTarget.parentElement.innerText
      // console.log(Txt)
      // const index = e.currentTarget.parentElement
      // console.log(this.$refs.refname[index].innerText)
      this.$router.push({
        path: '/form/advanced-form',
        name: 'AdvanceForm',
        params: {
          id: Txt
        }
      })
    },
```

AdvancedForm.vue

```
created () {
    this.getParams()
  },
 methods中：
 getParams () {
      var routerParams = this.$route.params.id
      this.description = routerParams
      // alert(routerParams)
      return getParams().then(res => {
        console.log(res)
      })
    },
    watch: {
    '$route': 'getParams'
  }
  
//你知道怎么把台的值传递给后台呀？有这么个方法：
 getParams () {
      var routerParams = this.$route.params.id
      this.description = routerParams
      // alert(routerParams)
      const parameter = {
         "version":routerParams,
         "platform":"sdf"
      }
      //TODO  getParams 增加参数parameter 里面的值需要后端接口入参定义
      return getParams(parameter).then(res => {
        console.log(res)
      })
    }
    import { getUser, getParams } from '@/api/manage'
   api/manage.js
   export function getParams (parameter) {
  return axios({
    url: config.PYTHON_ADDR + '/dataresourceapp/task_data/get_product_board/',
    method: 'POST',
    headers: config.HEADERS,
    params: parameter
    //TODO  params 入参传给后端
  })
}

```
    res是后台给返回来的值，我需要把前端的这个routerParams传递给后端，不知道往哪里写
    
我的电话能转接到你那不？中行打电话问是不是绿码，我接不到电话，能不能你那接到，给我github上说声，我下去看。
{"chart_data": {"legendData": ["\u6574\u673a", "SOC+DDR", "CPU_L", "CPU_BM", "GPU", "CPU MEM", "PERI CORE", "DMC/DDRPHY", "Global MEM ", "PERI FIXED CORE", "AO", "DDRPHY/IO", "DDR Device", "MODEM", "HV 1.2V", "HV 1.8V", "MODEM MEM", "NPU", "GPU MEM", "SYS_MEM", "SERDES", "PCIE_VDD075", "UFS_AVDD_0V75", "CSI_0V75"], "seriesData": {"\u6574\u673a": [9.02, 0.445], "SOC+DDR": [5.0, 0.45], "CPU_L": [0.12, 0.13], "CPU_BM": [0.14, 0.12], "GPU": [0.0, 0.1], "CPU MEM": [0.0, 0.2], "PERI CORE": [0.03, 0.12], "DMC/DDRPHY": [1.0, 0.11], "Global MEM ": [0.0, 0.41], "PERI FIXED CORE": [0.0, 0.12], "AO": [0.36, 0.45], "DDRPHY/IO": [0.06, 0.45], "DDR Device": [3.66, 4.4], "MODEM": [0.12, 0.4], "HV 1.2V": [0.13, 0.5], "HV 1.8V": [0.14, 0.54], "MODEM MEM": [0.12, 0.1], "NPU": [0.14, 0.2], "GPU MEM": [0.445, 0.3], "SYS_MEM": [0.14, 0.17], "SERDES": [0.125, 0.13], "PCIE_VDD075": [0.123, 0.31], "UFS_AVDD_0V75": [0.213, 0.23], "CSI_0V75": [0.12, 0.33]}, "legendSelected": {"\u6574\u673a": true, "SOC+DDR": true, "CPU_L": true, "CPU_BM": true, "GPU": true, "CPU MEM": true, "PERI CORE": true, "DMC/DDRPHY": true, "Global MEM ": true, "PERI FIXED CORE": true, "AO": true, "DDRPHY/IO": true, "DDR Device": true, "MODEM": true, "HV 1.2V": true, "HV 1.8V": true, "MODEM MEM": true, "NPU": true, "GPU MEM": true, "SYS_MEM": true, "SERDES": true, "PCIE_VDD075": true, "UFS_AVDD_0V75": true, "CSI_0V75": true}, "xAxisData": ["C10B220_2020_0513_143135", "C10B220_2020_0514_143135"]}}


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


==问题start：==
<template>
  <div>
    <a-card class="card" title="筛选条件" :bordered="false">
      // <repository-form ref="repository" :showSubmit="false" />
      <a-select
        mode="radio"
        style="width: 20%;margin-right: 4px"
        @change="getParams"
        placeholder="请选择平台"
        id="productType"
      >
        <a-select-option value="Baltimore">Baltimore</a-select-option>
        <a-select-option value="Denver">Denver</a-select-option>
        <a-select-option value="Phoenix">Phoenix</a-select-option>
        <a-select-option value="Laguna">Laguna</a-select-option>
      </a-select>
      <a-select
        mode="radio"
        style="width: 25%;margin-right: 4px"
        @change="getParams"
        placeholder="请选择版子"
      >
        <a-select-option value="Baltimore">UDP</a-select-option>
        <a-select-option value="Denver">手机</a-select-option>
      </a-select>
      <a-select
        mode="radio"
        style="width: 25%;margin-right: 4px"
        @change="handleChange"
        placeholder="测试用例"
      >
        <a-select-option value="Baltimore">case1</a-select-option>
        <a-select-option value="Denver">case2</a-select-option>
      </a-select>
      <a-select
        mode="tags"
        style="width: 25%"
        @change="handleChange"
        placeholder="请选择版本"
      >
        <a-select-option value="Baltimore">v1</a-select-option>
        <a-select-option value="Denver">v2</a-select-option>
      </a-select>
    </a-card>
    <div id="myChart" :style="{width:'100%',height:'400px'}"></div>
  </div>
</template>

<script>
// import RepositoryForm from './RepositoryForm'
import TaskForm from './TaskForm'
import FooterToolBar from '@/components/FooterToolbar'
import { mixin, mixinDevice } from '@/utils/mixin'
import echarts from 'echarts'
import { getUser, getParams } from '@/api/manage'

const fieldLabels = {
  name: '仓库名',
  url: '仓库域名',
  owner: '仓库管理员',
  approver: '审批人',
  dateRange: '生效日期',
  type: '仓库类型',
  name2: '任务名',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型'
}

export default {
  name: 'AdvancedForm',
  mixins: [mixin, mixinDevice],
  components: {
    FooterToolBar,
    // RepositoryForm,
    TaskForm,
    echarts
  },
  data () {
    return {
      description: '',
      productType: '',
      boardType: '',
      loading: true,
      memberLoading: true,
      errors: []
    }
  },
  created () {
    this.getParams()
  },
  mounted: function () {
      this.getUser()
  },
  methods: {
    getParams () {
      var routerParams = this.$route.params.id
      this.description = routerParams
      const parameter = {
        categoryType: '功耗',
        fieldType: routerParams,
        productType: 1,
        boardType: 2
      }
      return getParams(parameter).then(res => {
        console.log(res)
      })
    },
    handleSubmit (e) {
      e.preventDefault()
    },
    getUser () {
      // alert(this.description)
      return getUser().then(res => {
        // console.log(typeof (res)) object
        // console.log(res.chart_data.legendData)
        const chartLine = echarts.init(document.getElementById('myChart'))
        getUser().then(res => {
          const optionData = {
            // title: {
            //   text: '各测试项值'
            // },
            toolbox: {
              show: true,
              feature: {
                dataView: {
                  show: true
                },
                restore: {
                  show: true,
                  bordered: true
                },
                saveAsImage: {
                  show: true
                },
                magicType: {
                  type: ['line', 'bar']
                }
              }
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: res.chart_data.legendData,
              selected: res.chart_data.legendSelected,
              // itemWidth: 10,
              // itemHeight: 10,
              itemGap: 10,
              icon: 'circle',
              width: '1200px'
            },
            grid: {
              left: '15%',
              right: '15%',
              bottom: '30%'
              // containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: res.chart_data.xAxisData,
              axisLabel: {
                interval: 0,
                rotate: 40,
                margin: 10,
                textStyle: {
                  color: '#222'
                }
              }
            },
            yAxis: {
              type: 'value'
            },
            series: []
          }
          const seriesData = []
          for (var key in res.chart_data.seriesData) {
            const itemSData = { name: '', type: 'line', stack: '总量', data: [], smooth: true }
            itemSData.name = key
            itemSData.data = res.chart_data.seriesData[key]
            seriesData.push(itemSData)
          }
          optionData.series = seriesData
          chartLine.setOption(optionData)
        })
      })
    },
    toggle (key) {
      const target = this.data.find(item => item.key === key)
      target._originalData = { ...target }
      target.editable = !target.editable
    },
    getRowByKey (key, newData) {
      const data = this.data
      return (newData || data).find(item => item.key === key)
    },
    cancel (key) {
      const target = this.data.find(item => item.key === key)
      Object.keys(target).forEach(key => { target[key] = target._originalData[key] })
      target._originalData = undefined
    },
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.find(item => key === item.key)
      if (target) {
        target[column] = value
        this.data = newData
      }
    },

    // 最终全页面提交
    validate () {
      const { $refs: { repository, task }, $notification } = this
      const repositoryForm = new Promise((resolve, reject) => {
        repository.form.validateFields((err, values) => {
          if (err) {
            reject(err)
            return
          }
          resolve(values)
        })
      })
      const taskForm = new Promise((resolve, reject) => {
        task.form.validateFields((err, values) => {
          if (err) {
            reject(err)
            return
          }
          resolve(values)
        })
      })

      // clean this.errors
      this.errors = []
      Promise.all([repositoryForm, taskForm]).then(values => {
        $notification['error']({
          message: 'Received values of form:',
          description: JSON.stringify(values)
        })
      }).catch(() => {
        const errors = Object.assign({}, repository.form.getFieldsError(), task.form.getFieldsError())
        const tmp = { ...errors }
        this.errorList(tmp)
      })
    },
    errorList (errors) {
      if (!errors || errors.length === 0) {
        return
      }
      this.errors = Object.keys(errors)
        .filter(key => errors[key])
        .map(key => ({
          key: key,
          message: errors[key][0],
          fieldLabel: fieldLabels[key]
        }))
    },
    scrollToField (fieldKey) {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`)
      if (labelNode) {
        labelNode.scrollIntoView(true)
      }
    }
  },
  watch: {
    '$route': 'getParams'
  }
}
</script>

<style lang="less" scoped>
  .card{
    margin-bottom: 24px;
  }
  .popover-wrapper {
    /deep/ .antd-pro-pages-forms-style-errorPopover .ant-popover-inner-content {
      min-width: 256px;
      max-height: 290px;
      padding: 0;
      overflow: auto;
    }
  }
  .antd-pro-pages-forms-style-errorIcon {
    user-select: none;
    margin-right: 24px;
    color: #f5222d;
    cursor: pointer;
    i {
          margin-right: 4px;
    }
  }
  .antd-pro-pages-forms-style-errorListItem {
    padding: 8px 16px;
    list-style: none;
    border-bottom: 1px solid #e8e8e8;
    cursor: pointer;
    transition: all .3s;

    &:hover {
      background: #e6f7ff;
    }
    .antd-pro-pages-forms-style-errorIcon {
      float: left;
      margin-top: 4px;
      margin-right: 12px;
      padding-bottom: 22px;
      color: #f5222d;
    }
    .antd-pro-pages-forms-style-errorField {
      margin-top: 2px;
      color: rgba(0,0,0,.45);
      font-size: 12px;
    }
  }
</style>
==问题end==

{"case_list": ["KPI_Airplane_MODE"]}




