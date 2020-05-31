<template>
  <div>
    <a-card class="card" title="筛选条件" :bordered="false">
      <a-select
        mode="radio"
        style="width: 20%;margin-right: 4px"
        @change="setProductType"
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
        style="width: 20%;margin-right: 4px"
        @change="changeGetParams"
        placeholder="请选择版子"
      >
        <a-select-option value="UDP">UDP</a-select-option>
        <a-select-option value="手机">手机</a-select-option>
      </a-select>
      <a-select
        mode="radio"
        style="width: 20%;margin-right: 4px"
        @change="setTestcase"
        placeholder="测试用例"
      >"
        <a-select-option v-for="u in this.getParamsRes" :key="u.id" :value="u"> {{ u }} </a-select-option>
      </a-select>
      <a-select
        mode="tags"
        style="width: 20%;margin-right: 6px"
        @change="getVersionM"
        placeholder="请选择版本"
      >
        <a-select-option v-for="u in this.setVersion" :key="u.id" :value="u"> {{ u }} </a-select-option>
      </a-select>
      <!-- <a-button type="primary" style="margin-top:40px;border-radius:6px;" @click="showModal">详情展示</a-button> -->
      <a-modal
        title="数据详情"
        :visible="visible"
        @ok="handleOk"
        :confirmLoading="confirmLoading"
        @cancel="handleCancel"
      >
        <!-- <p>{{ ModalText }}</p> -->
        <table border="1" width="100%">
          <tr>
            <td>11111</td>
            <td>22222</td>
            <td>33333</td>
          </tr>
          <tr>
            <td>11111</td>
            <td>22222</td>
            <td>33333</td>
          </tr>
        </table>
      </a-modal>
    </a-card>
    <div id="myChart" :style="{width:'100%',height:'1000px'}"></div>
  </div>
</template>

<script>
  // import RepositoryForm from './RepositoryForm'
  import TaskForm from './TaskForm'
  import FooterToolBar from '@/components/FooterToolbar'
  import { mixin, mixinDevice } from '@/utils/mixin'
  import echarts from 'echarts'
  import { getUser, getParams, getVersion, getTable } from '@/api/manage'

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
        testCase: '',
        versionType: '',
        loading: true,
        memberLoading: true,
        errors: [],
        getParamsRes: [],
        setVersion: [],
        ModalText: '内容',
        visible: false,
        confirmLoading: false
      }
    },
    // created () {
    //   this.changeGetParams()
    // },
    mounted: function () {
      this.getUser()
      this.getVersion()
    },
    methods: {
      showModal () {
        this.visible = true
        console.log(111)
        const parameter = {
          // categoryType: this.description,
          // productType: this.productType,
          // boardType: this.boardType,
          // fieldType: 'powerConsumption',
          // test_case: this.test_case,
          // version_type: this.version_type
          0: 1
        }
        //  TODO 数据详情匹配
        return getTable(parameter).then(res => {
          // this.setVersion = res.type_list
          console.log(res)
        })
      },
      handleOk (e) {
        this.ModalText = 'The modal will be closed after two seconds'
        this.confirmLoading = true
        setTimeout(() => {
          this.visible = false
          this.confirmLoading = false
        }, 2000)
      },
      handleCancel (e) {
        console.log('Clicked cancel button')
        this.visible = false
      },
      setProductType (val) {
        this.productType = val
        console.log(this.productType)
      },
      // 触发第三个select
      setTestcase (val) {
         this.testCase = val
        console.log(val)
        const parameter = {
          categoryType: this.description,
          productType: this.productType,
          boardType: this.boardType,
          fieldType: 'powerConsumption',
          testCase: val
        }
        //  TODO 这里要换成版本的下拉列表接口
        return getVersion(parameter).then(res => {
          this.setVersion = res.type_list
          console.log(res)
        })
      },
      // 触发第二个select
      changeGetParams (val) {
        this.boardType = val
        console.log(val)
        var routerParams = this.$route.params.id
        this.description = routerParams
        // const resttest = { 'case_list': ['KPI_Airplane_MODE', 'KPI_Airplane_MODE234'] }
        // this.getParamsRes = resttest.case_list
        const parameter = {
          categoryType: routerParams,
          fieldType: 'powerConsumption',
          productType: this.productType,
          boardType: val
        }
        return getParams(parameter).then(res => {
          this.getParamsRes = res.case_list
          console.log(res)
        })
      },
      handleSubmit (e) {
        e.preventDefault()
      },
      // 触发第四个select
      getVersionM (val) {
        const parameter = {
          categoryType: this.description,
          fieldType: 'powerConsumption',
          productType: this.productType,
          boardType: this.boardType,
          testCase: this.testCase,
          versionType: val
        }
        console.log(this.testCase)
        return getUser(parameter).then(res => {
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
                bottom: '40%'
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
              yAxis: {},
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
http://ics.chinasoftinc.com/SignOnServlet?Error=LIN107%09%E5%AF%B9%E4%B8%8D%E8%B5%B7%EF%BC%8C%E6%82%A8%E7%9A%84%E5%B8%90%E5%8F%B7210960%E5%B7%B2%E8%A2%AB%E9%94%81%E5%AE%9A%EF%BC%8C%E6%97%A0%E6%9D%83%E7%99%BB%E5%BD%95%E6%9C%AC%E7%AB%99%EF%BC%8C%E5%A6%82%E6%9E%9C%E6%9C%89%E7%96%91%E9%97%AE%EF%BC%8C%E8%AF%B7%E8%81%94%E7%B3%BB%E7%AE%A1%E7%90%86%E5%91%98
advanceForm.vue
跨域解决：https://www.cnblogs.com/Tohold/p/9173137.html（原因分析，为什么会出现请求后台两次的情况）
问题解决：https://www.jianshu.com/p/78b3d7981543
后台调用接口总结：接口地址http://10.190.200.110:8001/dataresourceapp/task_data/test_result_data/
1.	在src/api/manage.js中新增一个方法如下：
 antd总结：
在该文件中引入： 
在引用该方法的文件中引入如下：
 
2.	在src/config/index.js中：（以下路径是后台地址）
 
3.	页面调用src/form/advancedForm/AdvancedForm
 
如上，res即为后台返回的值。
{"chart_data": {"legendData": ["\u6574\u673a", "SOC+DDR", "CPU_L", "CPU_BM", "GPU", "CPU MEM", "PERI CORE", "DMC/DDRPHY", "Global MEM ", "PERI FIXED CORE", "AO", "DDRPHY/IO", "DDR Device", "MODEM", "HV 1.2V", "HV 1.8V", "MODEM MEM", "NPU", "GPU MEM", "SYS_MEM", "SERDES", "PCIE_VDD075", "UFS_AVDD_0V75", "CSI_0V75"], "seriesData": {"\u6574\u673a": [9.02, 0.445], "SOC+DDR": [5.0, 0.45], "CPU_L": [0.12, 0.13], "CPU_BM": [0.14, 0.12], "GPU": [0.0, 0.1], "CPU MEM": [0.0, 0.2], "PERI CORE": [0.03, 0.12], "DMC/DDRPHY": [1.0, 0.11], "Global MEM ": [0.0, 0.41], "PERI FIXED CORE": [0.0, 0.12], "AO": [0.36, 0.45], "DDRPHY/IO": [0.06, 0.45], "DDR Device": [3.66, 4.4], "MODEM": [0.12, 0.4], "HV 1.2V": [0.13, 0.5], "HV 1.8V": [0.14, 0.54], "MODEM MEM": [0.12, 0.1], "NPU": [0.14, 0.2], "GPU MEM": [0.445, 0.3], "SYS_MEM": [0.14, 0.17], "SERDES": [0.125, 0.13], "PCIE_VDD075": [0.123, 0.31], "UFS_AVDD_0V75": [0.213, 0.23], "CSI_0V75": [0.12, 0.33]}, "legendSelected": {"\u6574\u673a": true, "SOC+DDR": true, "CPU_L": true, "CPU_BM": true, "GPU": true, "CPU MEM": true, "PERI CORE": true, "DMC/DDRPHY": true, "Global MEM ": true, "PERI FIXED CORE": true, "AO": true, "DDRPHY/IO": true, "DDR Device": true, "MODEM": true, "HV 1.2V": true, "HV 1.8V": true, "MODEM MEM": true, "NPU": true, "GPU MEM": true, "SYS_MEM": true, "SERDES": true, "PCIE_VDD075": true, "UFS_AVDD_0V75": true, "CSI_0V75": true}, "xAxisData": ["C10B220_2020_0513_143135", "C10B220_2020_0514_143135"]}}
manage.js
 
<!-- <a-button type="primary" style="margin-top:40px;border-radius:6px;" @click="getDetail">详情展示</a-button> -->



 
