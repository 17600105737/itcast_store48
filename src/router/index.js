import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/views/Login';
Vue.use(Router);

// 配置路由规则
export default new Router({
  routes: [
    { name: 'login', path: '/login', component: Login}
  ]
});
