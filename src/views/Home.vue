<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <img src="@/assets/logo.png" alt="logo">
        </el-col>
        <el-col :span="19">
          <div class="title">电商后台管理系统</div>
        </el-col>
        <el-col :span="1">
          <a class="logout" href="">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style>
  .container {
    height: 100%;
  }
  .header {
    background-color: #b3c0d1;
  }
  .header .title {
    color: #ffffff;
    font-size: 24px;
    text-align: center;
    line-height: 60px;
  }
  .header .logout {
    font-size: 16px;
    line-height: 60px;
  }
  .header a {
    display: block;
    text-decoration: none;
    text-align: center;
    color: orange;
  }
  .aside {
    background-color: #d3dce6;
  }
  .main {
    background-color: #e9eef3;
  }
</style>
