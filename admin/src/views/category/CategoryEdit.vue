<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent"  placeholder="请选择">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { getCategory } from '../network/category'
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
      parents:[]
    };
  },
  methods: {
    async save() {
      // console.log(this.model);
      // const res = await getCategory.post(this.model)
      let res;
      if (this.id) {
        res = this.$http.put(`rest/categories/${this.id}`, this.model);
      } else {
        res = this.$http.post("rest/categories", this.model);
      }
      // console.log(res);
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`);
      console.log(res.data);
      this.model = res.data;
    },
    async fetchParents(){
      const res = await this.$http.get(`rest/categories`)
      this.parents = res.data
      console.log(res.data);
    }
  },
  created() {
    this.id && this.fetch();
    this.fetchParents()
  },
};
</script>

<style>
</style>