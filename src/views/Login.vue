<template>
  <div class="login-wrap">
    <el-form class="login-form" label-position="top" label-width="80px">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input></el-input>
      </el-form-item>
      <el-button class="loginBtn" type="primary">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  }
};
</script>

<style scoped>
  /* scoped 是html5中提供的属性 */
  /* 会给当前页面所有的标签，添加一个data-v-xxx的一个属性作为标示 */ 
  /* 当前页面的样式只为当前页面的元素服务 */
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  width: 500px;
  background-color: #fff;
  border-radius: 5px;
  padding: 40px;
}
.login-form .loginBtn{
  width: 100%;
}
</style>
