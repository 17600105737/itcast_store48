import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/views/Login';
import Home from '@/views/Home';
import Users from '@/views/users/Users';
import Rights from '@/views/rights/Right';
import Roles from '@/views/rights/Role';
import Categories from '@/views/goods/Categories';
import { Message } from 'element-ui';
Vue.use(Router);
// 配置路由规则

const router = new Router({
  routes: [
    { name: 'login', path: '/login', component: Login },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        { name: 'users', path: '/users', component: Users },
        { name: 'right', path: '/rights', component: Rights },
        { name: 'role', path: '/roles', component: Roles },
        { name: 'categories', path: '/categories', component: Categories },
      ]
    }
  ]
});
router.beforeEach((to, from, next)=>{
  if (to.name && to.name.toLocaleLowerCase()!=='login') {
    const token = sessionStorage.getItem('token');
    if (!token) {
      Message.error('请先登录');
      router.push('login');
      return;
    }
  }
  next();
})
export default router;
