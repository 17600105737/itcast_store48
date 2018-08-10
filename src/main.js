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
import Myaxios from '@/plugins/Myaxios';
// 注册EUI
Vue.use(ElementUI);
Vue.use(Myaxios);
// 不显示Vue的默认浏览器提示代码
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
