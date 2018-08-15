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
    <el-form
      label-position="top"
      :model="form">
      <el-tabs
        @tab-click="handleTabClick"
        v-model="activeName"
        class="tabs"
        tab-position="left">
        <el-tab-pane name="0" label="基本信息">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              clearable
              placeholder="请选择商品分类"
              expand-trigger="hover"
              :options="options"
              :props="{ label: 'cat_name', value: 'cat_id', children: 'children'}"
              v-model="selectedOptions2"
              @change="handleChange">
            </el-cascader>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane name="1" label="商品参数">
          <el-form-item
            v-for="item in dynamicParams"
            :key="item.attr_id"
            :label="item.attr_name"
            >
            <el-checkbox-group v-model="item.params">
              <el-checkbox
                v-for="param in item.params"
                :key="param"
                border
                :label="param"
                >
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane name="2" label="商品属性">
          <el-form-item
            v-for="item in staticParams"
            :key="item.attr_id"
            :label="item.attr_name"
            >
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane name="3" label="商品图片">
          <el-upload
            :headers="headers"
            class="upload-demo"
            action="http://localhost:8888/api/private/v1/upload"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-tab-pane>

        <el-tab-pane name="4" label="商品内容">
          <el-button @click="handleAdd" type="success" plain>添加商品</el-button>
          <quill-editor v-model="form.goods_introduce"></quill-editor>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 导入富文本组件
import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  created() {
    this.loadOptions();
  },
  data() {
    return {
      activeName: '0',
      form: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        pics: [],
        goods_introduce: '',
        attrs: []
      },
      options: [],
      selectedOptions2: [],
      // 动态参数列表
      dynamicParams: [],
      // 静态参数列表
      staticParams: [],
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    }
  },
  methods: {
    // 获取三级列表数据
    async loadOptions() {
      const response = await this.$http.get('categories?type=3');
      this.options = response.data.data;
    },
    // 获取参数
    async loadParams(index) {
      // 判断点击的是动态参数选项卡还是静态参数选项卡
      const sel = index==='1'? 'many':'only';
      const response = await this.$http.get(`categories/${this.selectedOptions2[2]}/attributes?sel=${sel}`);

      if (sel==='many') {
        // 动态参数
        this.dynamicParams = response.data.data;
      
        // 获取动态参数里的选项
        this.dynamicParams.map((item)=>{
          const arr = item.attr_vals.length===0 ? []:item.attr_vals.split(',');
          this.$set(item,'params',arr);
        });     
      } else if (sel==='only') {
        // 静态参数
        this.staticParams = response.data.data;
      }

    },
    // 点击tab选项卡时执行的操作
    handleTabClick(tab,event) {
      if (tab.index === '1' || tab.index === '2') {
        
        if (this.selectedOptions2.length !== 3) {
          // 没有选择三级列表
          this.$message.error('请先选择商品分类');
          return;
        }
        // 加载动态参数
        this.loadParams(tab.index);
      }
    },
    // 点击级联列表时执行的函数
    handleChange() {
      if (this.selectedOptions2.length !== 3) {
        this.$message.warning('请选择三级分类');
        this.selectedOptions2.length=0;
      }
    },
    // 图片上传成功
    handleSuccess(response) {
      if (response.meta.status === 200) {
        this.form.pics.push({
          pic: response.data.tmp_path
        });
      } else {
        this.$message.error('上传失败');
      }
    },
    // 图片移除
    handleRemove(file) {
      const index = this.form.pics.findIndex((item)=>{
        if (item.pic === file.response.data.tmp_path) {
          return true;
        }
      })
      this.form.pics.splice(index,1);
    },
    async handleAdd() {
      this.form.goods_cat = this.selectedOptions2.join(',');

      const arr1 = this.dynamicParams.map((item)=>{
        return { "attr_id": item.attr_id, "attr_value": item.params.join(',') };
      });
      const arr2 = this.staticParams.map((item)=>{
        return { "attr_id": item.attr_id, "attr_value": item.attr_vals };
      });

      this.form.attrs = [...arr1, ...arr2];

      const response = await this.$http.post('goods',this.form);
      const { meta: { status, msg } } = response.data;
      if (status === 201) {
        this.$message.success(msg);
        this.$router.push('/goods');
      } else {
        this.$message.error(msg);
      }
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
.ql-editor {
  height: 400px;
}
</style>
