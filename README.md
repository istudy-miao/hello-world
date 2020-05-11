import Vue from 'vue';
 
import Antd from 'ant-design-vue'// 引入Ant Design Vue组件
import 'ant-design-vue/dist/antd.css' // 引入Ant Design Vue样式
Vue.use(Antd) //挂载到vue中

1、Menu
入门一般先来个导航栏，咱用Antd的Menu组件

官方会给你一组写好的死数据的实例，但是在项目中我们一般写成动态。

vue中写动态数据，方便的亚批，不仅代码优美，还简洁易读。

HTML:

   <a-menu @click="navClick"
                style="width: 256px"
                v-model="currentSelectChild"
                @openChange="onOpenChange"
                :openKeys="currentParent"
                theme="dark"
                mode="inline">
            <!--横向：horizontal-->
            <!--有openKeys时 :defaultOpenKeys="[200]"无效 -->
            <!--有v-model时 :ddefaultSelectedKeys="[202]"无效 -->
            <a-sub-menu v-for="itParent in NavData" :key="itParent.NavID">
                <span slot="title">
                    <a-icon :type="itParent.Icons" />
                    <span>{{itParent.Title}}</span>
                </span>
                <a-menu-item v-for="itChild in itParent.Child" :key="itChild.NavID">
                    <router-link :to="itChild.Path"><!--根据路径去跳转页面-->
                        {{itChild.Title}}
                    </router-link>
                </a-menu-item>
            </a-sub-menu>
     </a-menu>
数据格式：

 NavData: [
                    {
                        NavID: 100,
                        Icons:"dashboard",
                        Title:"操作",
                        Path:"",
                        Child: [
                            {
                                NavID: 101,
                                Icons: "",
                                Title: "用户",
                                Path: "/UserInfo",
                            }, {
                                NavID: 102,
                                Icons: "",
                                Title: "公司",
                                Path: "/CompanyInfo",
                            },{
                                NavID: 103,
                                Icons: "",
                                Title: "部门",
                                Path: "/TeamInfo",
                            },
 
                        ]
                    },{
                        NavID: 300,
                        Icons:"audit",
                        Title:"报表",
                        Path:"",
                        Child: [{
                                NavID: 301,
                                Icons: "",
                                Title: "打卡",
                                Path: "/Card",
                            }]
                    }
        ]
2、全局通知
全局的通知在Antd里面有各种炫酷的UI：Message、Notification

（Modal其实也可以算，只不过是一种确认提示框）

1)：Message

//只要一开始全局引入了Antd，并且挂载到vue上了，就能直接this出来

//Message,页面顶部的通知
this.$message.success('Click Me', 2.5, ()=>{//带callback的 
        this.$message.warning("上一个关闭了");//普通的 
 });
2)：Notification

这个不同于Message,他需要配置一些参数，所以不建议每个页面直接this去调用

以下是我的做法

先建一个叫Global的js文件（参考https://blog.csdn.net/xj932956499/article/details/99647782）login页面route.js用法
在main.js里引入并挂载全局：
//main.js
import global from '@/Global' // 引入global
Vue.prototype.$global = global;挂载到vue上，就能直接this出来了
 

在Global里写下如下代码
import { notification } from 'ant-design-vue'//引入
 
notification.config({//写配置//一些参你也可以配置到动态的，看个人需要
    placement: 'topRight',
    top: '50px',
    duration: 3,
});
 
function AntNotice(type, Tit, Cont) {
    notification[type]({
        message: Tit,
        description: Cont,
    });
}
 
 
export default {//页面返回
     AntNotice,
}
//调用： this.$global.AntNotice('success','Click Me','哈哈哈')

3、布局
先用上这个一般管理系统的通用布局

<template>
        <a-layout id="homeLayout" :style="{ overflow: 'auto', height: '100vh' }">
            <a-layout-sider :trigger="null"
                            collapsible
                            v-model="collapsed">
                <div style="height: 32px;
                  background: rgba(255,255,255,.2);
                  margin: 16px;" />
               <!--这个位置可以放上面讲到的menu代码-->
            </a-layout-sider>
            <a-layout>
                <a-layout-header style="background: #fff; padding: 0;height:7vh">
                    <a-icon style=" margin-left: 15px;font-size: 1.2rem;vertical-align: middle;" 
                            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                            @click="()=> collapsed = !collapsed" />
                </a-layout-header>
                <a-layout-content :style="{ margin: '1.5vh 10px', padding: '10px', background: '#fff',height: '90vh' }">
                    Content
                </a-layout-content>
            </a-layout>
        </a-layout>
</template>
效果如下：

主要讲解：栅格的响应式布局

我们在content位置写下如下代码

     <a-row>
                    <a-col class="bgGreen" :xs="24" :sm="12" :md="8" :lg="6" >Col</a-col>
                    <a-col class="bgYellow" :xs="24" :sm="12" :md="8" :lg="6">Col</a-col>
                    <a-col class="bgGreen" :xs="24" :sm="12" :md="8" :lg="6">Col</a-col>
                    <a-col class="bgYellow" :xs="24" :sm="12" :md="8" :lg="6">Col</a-col>
     </a-row>
这样写很舒服的，响应式处理，会根据不同屏幕宽给你显示不同宽度，

官网没有强调，特地拿出来引起注意下：

xs	<576px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
sm	≥576px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
md	≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
lg	≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
xl	≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
xxl	≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object
 


————————————————
版权声明：本文为CSDN博主「JoneXuu」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/xj932956499/java/article/details/100916147
