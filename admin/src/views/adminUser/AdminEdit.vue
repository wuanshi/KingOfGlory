<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="text" v-model="model.password"></el-input>
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
        res = this.$http.put(`rest/admin_users/${this.id}`, this.model);
      } else {
        res = this.$http.post("rest/admin_users", this.model);
      }
      // console.log(res);
      this.$router.push("/admin_users/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`);
      console.log(res.data);
      this.model = res.data;
    },
  },
  created() {
    this.id && this.fetch();
    this.fetchParents()
  },
};
</script>

<style>
</style>