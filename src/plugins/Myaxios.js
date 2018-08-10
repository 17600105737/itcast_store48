// 导入axios包 配置全局axios
import axios from 'axios';

const Myaxios = {};

Myaxios.install = function (Vue) {
  // 配置axios请求地址
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';

  Vue.prototype.$http = axios;
};

export default Myaxios;
