import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/views/Login';
import Home from '@/views/Home';
import Users from '@/views/Users/Users';
Vue.use(Router);

// 配置路由规则
export default new Router({
  routes: [
    { name: 'login', path: '/login', component: Login},
    { 
      name: 'home',
      path: '/',
      component: Home,
      children:[
        { name: 'users', path: '/users', component: Users}
      ]
    }
  ]
});
