```
<template>
  <div>
    <a-card class="card" title="仓库管理" :bordered="false">
      <repository-form ref="repository" :showSubmit="false" />
    </a-card>
    <a-card class="card" title="任务管理" :bordered="false">
      <task-form ref="task" :showSubmit="false" />
    </a-card>
    <div id="myChart" :style="{width:'800px',height:'400px'}"></div>
    <!-- fixed footer toolbar -->
    <footer-tool-bar :style="{ width: isSideMenu() && isDesktop() ? `calc(100% - ${sidebarOpened ? 256 : 80}px)` : '100%'}">
      <span class="popover-wrapper">
        <a-popover title="表单校验信息" overlayClassName="antd-pro-pages-forms-style-errorPopover" trigger="click" :getPopupContainer="trigger => trigger.parentNode">
          <template slot="content">
            <li v-for="item in errors" :key="item.key" @click="scrollToField(item.key)" class="antd-pro-pages-forms-style-errorListItem">
              <a-icon type="cross-circle-o" class="antd-pro-pages-forms-style-errorIcon" />
              <div class="">{{ item.message }}</div>
              <div class="antd-pro-pages-forms-style-errorField">{{ item.fieldLabel }}</div>
            </li>
          </template>
          <span class="antd-pro-pages-forms-style-errorIcon" v-if="errors.length > 0">
            <a-icon type="exclamation-circle" />{{ errors.length }}
          </span>
        </a-popover>
      </span>
      <a-button type="primary" @click="validate" :loading="loading">提交</a-button>
    </footer-tool-bar>
  </div>
</template>

<script>
import RepositoryForm from './RepositoryForm'
import TaskForm from './TaskForm'
import FooterToolBar from '@/components/FooterToolbar'
import { mixin, mixinDevice } from '@/utils/mixin'
import echarts from 'echarts'

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
    RepositoryForm,
    TaskForm,
    echarts
  },
  data () {
    return {
      description: '高级表单常见于一次性输入和提交大批量数据的场景。',
      loading: true,
      memberLoading: true,
      errors: []
    }
  },
  mounted: function () {
      this.drawLine()
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
    },
    newMember () {
      const length = this.data.length
      this.data.push({
        key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
        name: '',
        workId: '',
        department: '',
        editable: true,
        isNew: true
      })
    },
    drawLine () {
      const chartLine = echarts.init(document.getElementById('myChart'))
      chartLine.setOption({
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
                  data: [820, 932, 901, 934, 1290, 1330, 1320],
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
    remove (key) {
      const newData = this.data.filter(item => item.key !== key)
      this.data = newData
    },
    // saveRow (record) {
    //   this.memberLoading = true
    //   const { key, name, workId, department } = record
    //   if (!name || !workId || !department) {
    //     this.memberLoading = false
    //     this.$message.error('请填写完整成员信息。')
    //     return
    //   }
    //   // 模拟网络请求、卡顿 800ms
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve({ loop: false })
    //     }, 800)
    //   }).then(() => {
    //     const target = this.data.find(item => item.key === key)
    //     target.editable = false
    //     target.isNew = false
    //     this.memberLoading = false
    //   })
    // },
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
