<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="广告名称" style="margin-top: 10px">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="text" @click="model.items.push({})">
          <i class="el-icon-plus"></i> 添加广告</el-button
        >
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col :span="24" v-for="(item, i) in model.items" :key="i">
            <!-- <el-form-item label="广告分类">
              <el-select
                v-model="item.categories"
                multiple
                placeholder="请选择"
              >
                <el-option
                  v-for="(option, i) in options"
                  :key="i"
                  :label="option.name"
                  :value="option._id"
                >
                  {{ option.name }}
                </el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="跳转链接">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="广告图片" style="margin-top: 10px">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="(res) => $set(item, 'image', res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <el-form-item>
              <el-button type="danger" @click="model.items.splice(i, 1)"
                >删除</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
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
      model: {
        items: [],
      },
      options: [],
    };
  },
  methods: {
    async save() {
      // console.log(this.model);
      // const res = await getCategory.post(this.model)
      let res;
      if (this.id) {
        res = this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        res = this.$http.post("rest/ads", this.model);
      }
      // console.log(res);
      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = Object.assign({},this.model,res.data)
      console.log('req',res.data);
      console.log('model',this.model);
    },
    async fetchOptions() {
      const res = await this.$http.get(`rest/ads`);
      this.options = res.data;
    },
  },
  created() {
    this.id && this.fetch();
    this.fetchOptions();
  },
};
</script>

<style>

</style>