// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// 导入elementUI包
import ElementUI from 'element-ui';
// 导入全局css样式
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/index.css';
// 导入axios包 配置全局axios
import axios from 'axios';

// 注册EUI
Vue.use(ElementUI);
// 不显示Vue的默认浏览器提示代码
Vue.config.productionTip = false;
// 配置axios请求地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';

Vue.prototype.$http = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
