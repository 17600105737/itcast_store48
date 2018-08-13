import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/views/Login';
import Home from '@/views/Home';
import Users from '@/views/users/Users';
import Rights from '@/views/rights/Right';
import Roles from '@/views/rights/Role';

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
        { name: 'role', path: '/roles', component: Roles }
      ]
    }
  ]
});
router.beforeEach((to, from, next)=>{
  if (to.name && to.name.toLocaleLowerCase()!=='login') {
    const token = sessionStorage.getItem('token');
    if (!token) {
      router.push('login');
      return;
    }
  }
  next();
})
export default router;
