<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="装备名称">
        <el-input v-model="item.name"></el-input>
      </el-form-item>
      <el-form-item label="装备图片">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="item.icon" :src="item.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      item: {
        name: "",
        icon: "",
      },
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = this.$http.put(`rest/items/${this.id}`, this.item);
      } else {
        res = this.$http.post("rest/items", this.item);
      }
      // console.log(res);
      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.item = res.data;
    },
    async afterUpload(res) {
      console.log(res);
      this.item.icon = res.url
    },
  },
  created() {
    this.id && this.fetch();
  },
};
</script>

