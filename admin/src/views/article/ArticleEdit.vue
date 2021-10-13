<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="文章分类">
        <el-select v-model="model.categories" placeholder="请选择" multiple>
          <el-option
            v-for="item in options"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  props: {
    id: {},
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {
        categories: [],
        title: "",
        body: "",
      },
      options: [],
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        res = this.$http.post("rest/articles", this.model);
      }
      // console.log(res);
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    // 获取分类数据信息
    async getOptions() {
      const categories = await this.$http.get("rest/categories");
      this.options = categories.data;
    },
    // 处理富文本编辑器中的图片上传
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
 
      var formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post("upload",formData);
      Editor.insertEmbed(cursorLocation,"image",res.data.url);
      resetUploader();
      
      // axios({
      //   url: "https://fakeapi.yoursite.com/images",
      //   method: "POST",
      //   data: formData
      // })

      // this.$http.post('/uploads',formData)
      //   .then(result => {
      //     let url = result.data.url; // Get url from response
      //     Editor.insertEmbed(cursorLocation, "image", url);
      //     resetUploader();
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  },
  created() {
    this.getOptions();
    this.id && this.fetch();
  },
};
</script>

