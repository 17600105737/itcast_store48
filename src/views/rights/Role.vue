<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="权限管理" level2="角色列表"></my-breadcrumb>
    <!-- 表格 -->
    <el-button class="addButton">添加角色</el-button>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row class="level1Row" v-for="level1 in scope.row.children" :key="level1.id">
            <el-col :span="4">
              <!-- 一级权限 -->
              <el-tag @close="handleClose(scope.row,level1.id)" closable>
                {{ level1.authName }}
              </el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="level2 in level1.children" :key="level2.id">
                <el-col :span="4">
                  <!-- 二级权限 -->
                  <el-tag @close="handleClose(scope.row,level2.id)" closable type="success">
                    {{ level2.authName }}
                  </el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag @close="handleClose(scope.row,level3.id)" class="level3Tag" closable type="warning" v-for="level3 in level2.children" :key="level3.id">
                    {{ level3.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-if="scope.row.children.length===0">
            没有分配权限
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
          type="primary"
          icon="el-icon-edit"
          plain
          size="mini"
          >
          </el-button>
          <el-button
          type="danger"
          icon="el-icon-delete"
          plain
          size="mini"
          >
          </el-button>
          <el-button
          type="warning"
          icon="el-icon-check"
          plain
          size="mini"
          @click="handleOpenTree(scope.row)"
          >
          </el-button>
          
        </template>
      </el-table-column>
    </el-table>
    <!-- 权限分配对话框 -->
    <el-dialog title="权限分配" :visible.sync="setRoledialogFormVisible">
            <!-- 树形结构 -->
            <el-tree
            ref="tree"
            show-checkbox
            default-expand-all
            :data="treeData"
            node-key="id"
            :default-checked-keys="checkList"
            :props="defaultProps"
            >
            </el-tree>
            <div slot="footer" class="dialog-footer">
              <el-button @click="setRoledialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleRights">确 定</el-button>
            </div>
          </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      setRoledialogFormVisible: false,
      treeData: [],
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      checkList: [],
      currentRoleId: -1
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    // 加载数据
    async loadData() {
      const response = await this.$http.get('roles');
      const { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.tableData = response.data.data;
      } else {
        this.$message.error(msg);
      }
    },
    // 删除指定权限
    async handleClose(role, rightId) {
      const response = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
      const { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.$message.success(msg);
        role.children = response.data.data;
      } else {
        this.$message.error(msg);
      }
    },
    // 打开树形列表
    async handleOpenTree(role) {
      this.currentRoleId = role.id;
      // this.checkList = [];
      this.setRoledialogFormVisible = true;
      const response = await this.$http.get('rights/tree');
      this.treeData = response.data.data;

      // var arr = []
      // role.children.forEach((level1) => {
      //   level1.children.forEach((level2) => {
      //     level2.children.forEach((level3) => {
      //       arr.push(level3.id);
      //     });
      //   });
      // });
      // this.checkList = arr;
    },
    // 分配权限
    async handleRights() {
      const checkedList = this.$refs.tree.getCheckedKeys();
      const HalfCheckedList = this.$refs.tree.getHalfCheckedKeys();
      const arr = [...checkedList, ...HalfCheckedList];

      const response = await this.$http.post(`roles/${this.currentRoleId}/rights`, {
        rids: arr.join(',')
      });
      const { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.$message.success(msg);
        this.setRoledialogFormVisible = false;
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style>
.card {
  height: 100%;
  overflow: auto;
}
.addButton {
  margin-top: 10px;
  margin-bottom: 5px;
}
.level3Tag {
  margin-right: 5px;
  margin-bottom: 5px;
}
.level1Row {
  margin-bottom: 10px;
}
</style>
