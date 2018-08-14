<template>
  <el-card class="card">
      <!-- 面包屑 -->
      <my-breadcrumb level1="商品管理" level2="商品分类"></my-breadcrumb>
      <!-- 添加分类按钮 -->
      <el-button
      type="success"
      plain
      class="cateButton"
      @click="handleOpenAddDialog"
      >添加分类
      </el-button>
      <!-- 表格 -->
      <el-table
      border
      stripe
      :data="data"
      style="width: 100%">
      <!-- 
        treeKey 每个节点的唯一标识
        levelKey 节点的层次
        childKey 显示子节点的属性名称
        parentKey 所属父节点的属性
       -->
      <el-table-tree-column
      prop="cat_name"
      label="分类名称"
      treeKey="cat_id"
      childKey="children"
      levelKey="cat_level"
      parentKey="cat_pid"
      >

      </el-table-tree-column>
        <!-- <el-table-column
          prop="cat_name"
          label="分类名称"
          >
        </el-table-column> -->
        <el-table-column
          label="级别"
          width="50">
          <template slot-scope="scope">
            <span v-if="scope.row.cat_level===0">一级</span>
            <span v-else-if="scope.row.cat_level===1">二级</span>
            <span v-else-if="scope.row.cat_level===2">三级</span>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="是否有效">
          <template slot-scope="scope">
            {{ scope.row.cat_deleted ? '无效':'有效' }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
            @click="handleOpenEditCate(scope.row)"
            type="primary"
            icon="el-icon-edit"
            plain
            size="mini"
            >
            </el-button>
            <el-button
            type="danger"
            icon="el-icon-delete"
            @click="handleDeleteCate(scope.row.cat_id)"
            plain
            size="mini"
            >
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加用户对话框 -->
      <el-dialog title="添加商品分类" :visible.sync="addCateDialogFormVisible">
        <el-form
        :model="form"
        label-width="100px"
        >
          <el-form-item label="分类名称">
            <el-input v-model="form.cat_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="分类列表">
            <el-cascader
              placeholder="默认添加一级菜单"
              clearable
              change-on-select
              expand-trigger="hover"
              :options="options"
              :props="defaultProps"
              v-model="catIds"
              >
            </el-cascader>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addCateDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddCate">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑用户对话框 -->
      <el-dialog title="编辑商品分类" :visible.sync="editCateDialogFormVisible">
        <el-form
        :model="form"
        label-width="100px"
        >
          <el-form-item label="分类名称">
            <el-input v-model="form.cat_name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editCateDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleEditCate">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[4, 6, 8, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
  </el-card>
</template>

<script>
// 导入局部组件
import ElementTreegrid from 'element-tree-grid';

export default {
  components: {
    'el-table-tree-column': ElementTreegrid
  },
  data() {
    return {
      data: [],
      total: 0,
      pagenum: 1,
      pagesize: 6,
      addCateDialogFormVisible:false,
      editCateDialogFormVisible:false,
      form:{
        cat_name:'',
        cat_pid:-1,
        cat_level:0
      },
      options:[],
      defaultProps: {
        value:'cat_id',
        label:'cat_name',
        children:'children'
      },
      catIds:[],
      currentCatId:-1,
      currentCat:null
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const response = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      const { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.total = response.data.data.total;
        this.data = response.data.data.result;
      } else {
        this.$message.error(msg);
      }
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.loadData();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.loadData();
    },
    // 打开添加分类对话框
    async handleOpenAddDialog() {
      this.addCateDialogFormVisible = true;
      const response = await this.$http.get('categories?type=2');
      this.options = response.data.data;
    },
    // 确定添加分类
    async handleAddCate() {
      /*
      添加分类需要三个参数
      cat_name  要添加的分类名称 
      cat_pid   父id
      cat_level 分类层级
      */
      this.form.cat_level = this.catIds.length;
      if (this.catIds.length===0) {
        this.form.cat_pid = 0;
      } else if (this.catIds.length===1) {
        this.form.cat_pid = this.catIds[0];
      } else if (this.catIds.length===2) {
        this.form.cat_pid = this.catIds[1];
      }
      const response = await this.$http.post('categories',this.form);
      const { meta: { status, msg } } = response.data;
      if (status === 201) {
        this.$message.success(msg);
        this.addCateDialogFormVisible = false;
        this.loadData();
      } else {
        this.$message.error(msg);
      }
    },
    // 删除当前分类
    handleDeleteCate(id) {
      this.$confirm('是否删除这条数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const response = await this.$http.delete(`categories/${id}`);
        const { meta: { status, msg } } = response.data;
        if (status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.loadData();
        } else {
          this.$message.error(msg);
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    handleOpenEditCate(cate) {
      this.editCateDialogFormVisible = true;
      this.form.cat_name = cate.cat_name;
      this.currentCatId = cate.cat_id;
      this.currentCat = cate;
    },
    async handleEditCate() {
      const response = await this.$http.put(`categories/${this.currentCatId}`,{
        cat_name: this.form.cat_name
      });
      const { meta: { status, msg } } = response.data;
      if (status===200) {
        this.$message.success(msg);
        this.editCateDialogFormVisible = false;
        this.currentCat.cat_name = response.data.data.cat_name;
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style>
.cateButton {
  margin-top: 10px;
}
</style>
