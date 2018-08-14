<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <my-breadcrumb class="bread" level1="商品管理" level2="商品列表"></my-breadcrumb>
    <!-- 消息提示 -->
    <el-alert
      class="alert"
      title="添加商品信息"
      type="info"
      center
      show-icon>
    </el-alert>
    <!-- 步骤条 -->
    <el-steps :active="activeName - 0" finish-status="success" align-center>
      <el-step name="1" title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- 标签页 -->
    <el-tabs v-model="activeName" class="tabs" tab-position="left" style="height: 200px;">
      <el-tab-pane name="0" label="基本信息">基本信息</el-tab-pane>
      <el-tab-pane name="1" label="商品参数">商品参数</el-tab-pane>
      <el-tab-pane name="2" label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane name="3" label="商品图片">商品图片</el-tab-pane>
      <el-tab-pane name="4" label="商品内容">商品内容</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      activeName: '0'
    }
  }
}
</script>

<style>
.bread {
  margin-bottom: 10px;
}
.alert {
  margin-bottom: 10px;
}
.el-step__title {
  font-size: 14px;
}
.tabs {
  margin-top: 20px;
}
</style>
