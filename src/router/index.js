import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/views/Login';
import Home from '@/views/Home';
import Users from '@/views/users/Users';
import Rights from '@/views/rights/Right';
import Roles from '@/views/rights/Role';
Vue.use(Router);

// 配置路由规则
export default new Router({
  routes: [
    { name: 'login', path: '/login', component: Login },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        { name: 'users', path: '/users', component: Users },
        { name: 'right', path: '/right', component: Rights },
        { name: 'role', path: '/role', component: Roles }
      ]
    }
  ]
});
