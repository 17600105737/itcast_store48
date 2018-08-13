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
          <a @click.prevent="handelLogout" class="logout" href="">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <el-menu
          unique-opened
          router
          style="height:100%;"
          class="el-menu-vertical-demo">
          <el-submenu
          v-for="item in menu"
          :key="item.id"
          :index="item.id+''"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </template>
              <el-menu-item
              v-for="item1 in item.children"
              :key="item1.id"
              :index="'/'+item1.path"
              >
              <i class="el-icon-menu"></i>
                {{ item1.authName }}
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menu:[]
    };
  },
  created() {
    this.loadMenu();
  },
  methods: {
    handelLogout() {
      this.$message.success('退出成功');
      sessionStorage.clear();
      this.$router.push('/login');
    },
    // 加载菜单项数据
    async loadMenu() {
      const response = await this.$http.get('menus');
      this.menu = response.data.data;
    }
  }
};
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
