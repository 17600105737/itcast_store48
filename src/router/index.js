import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/views/Login';
import Home from '@/views/Home';
import Users from '@/views/users/Users';
import Rights from '@/views/rights/Right';
import Roles from '@/views/rights/Role';
import Categories from '@/views/goods/Categories';
import Goods from '@/views/goods/Goods';
import GoodsAdd from '@/views/goods/GoodsAdd';
import Params from '@/views/goods/Params';
import { Message } from 'element-ui';
import moment from 'moment';
Vue.use(Router);
// 配置路由规则
Vue.filter('fmtDate',(value,fmtString)=>{
  return moment(value).format(fmtString);
})
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
        { name: 'goods', path: '/goods', component: Goods },
        { name: 'goodsAdd', path: '/goods/add', component: GoodsAdd },
        { name: 'params', path: '/params', component: Params }
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
