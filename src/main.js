import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/mock/mockSever'
// 按需引入element-ui
import { Button, MessageBox, Form, FormItem, Input, InputNumber, } from 'element-ui';
import 'swiper/css/swiper.css';
//注册全局组件
import TypeNav from '@/components/TypeNav' //三级导航
import Pagination from '@/components/Pagination' //尾部分页器

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(InputNumber)
    // 以挂载原型的方式注册全局组件
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)
Vue.config.productionTip = false

// 全局引入API
import * as API from '@/api'
// 全局引入懒加载插件
import VueLazyload from 'vue-lazyload'
const loadingImage = require('@/assets/images/loading.gif')
Vue.use(VueLazyload, {
    loading: loadingImage,
})

new Vue({
    beforeCreate() {
        Vue.prototype.$bus = this; //配置全局事件总线
        Vue.prototype.$API = API; //配置全局API
    },
    render: h => h(App),
    router,
    store
}).$mount('#app')