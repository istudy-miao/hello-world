```
<template>
  <div>
    <a-card class="card" title="筛选条件" :bordered="false">
      // <repository-form ref="repository" :showSubmit="false" />
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
        style="width: 25%;margin-right: 4px"
        @change="changeGetParams"
        placeholder="请选择版子"
      >
        <a-select-option value="UDP">UDP</a-select-option>
        <a-select-option value="手机">手机</a-select-option>
      </a-select>
      <a-select
        mode="radio"
        style="width: 25%;margin-right: 4px"
        @change="setTestcase"
        placeholder="测试用例"
      >"
        <a-select-option v-for="u in this.getParamsRes" :key="u.id" :value="u"> {{ u }} </a-select-option>
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
        errors: [],
        getParamsRes: []
      }
    },
    created () {
      this.changeGetParams()
    },
    mounted: function () {
      this.getUser()
    },
    methods: {
      setProductType (val) {
        this.productType = val
        console.log(this.productType)
      },
      setTestcase (val) {
        console.log(val)
        const parameter = {
          categoryType: '功耗',
          productType: this.productType,
          boardType: this.boardType,
          fieldType: this.description,
          testcase: val
        }
        //  TODO 这里要换成版本的下拉列表接口
        return getParams(parameter).then(res => {
          this.getParamsRes = res
          console.log(res)
        })
      },
      changeGetParams (val) {
        this.boardType = val
        console.log(val)
        var routerParams = this.$route.params.id
        this.description = routerParams
        // const resttest = { 'case_list': ['KPI_Airplane_MODE', 'KPI_Airplane_MODE234'] }
        // this.getParamsRes = resttest.case_list
        const parameter = {
          categoryType: '功耗',
          fieldType: routerParams,
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

```
