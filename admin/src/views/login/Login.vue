<template>
  <el-card class="box-card">
    <el-form @submit.native.prevent="login">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      model: {},
    };
  },
  methods: {
    login() {
      const res = this.$http.post('login',this.model)
      console.log(res.data);
    },
  },
};
</script>
<style>
.box-card {
  width: 30rem;
  /* height: 20rem; */
  margin: 10rem auto;
}
</style>