<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>

    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="skills" type="border-card">
        <el-tab-pane label="基本信息">
          <el-form-item label="英雄名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="英雄称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="定位">
            <template>
              <el-select
                v-model="model.categories"
                multiple
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.name"
                  :value="item._id"
                >
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="评分">
            <template>
              <div class="block">
                生存能力：<el-rate
                  v-model="model.scores.survival"
                  show-score
                  allow-half
                ></el-rate>
              </div>
              <div class="block">
                攻击伤害：<el-rate
                  v-model="model.scores.attrack"
                  show-score
                  allow-half
                ></el-rate>
              </div>
              <div class="block">
                技能效果：<el-rate
                  v-model="model.scores.skills"
                  show-score
                  allow-half
                ></el-rate>
              </div>
              <div class="block">
                上手难度：<el-rate
                  v-model="model.scores.difficult"
                  show-score
                  allow-half
                ></el-rate>
              </div>
            </template>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能信息" name="skills">
          <el-button type="text" @click="model.skills.push({})">
            <i class="el-icon-plus"></i> 添加技能</el-button
          >
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :span="12" v-for="(item, i) in model.skills" :key="i">
              <el-form-item label="技能图片">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="(res) => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="icon" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="技能名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="技能描述">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="item.description"
                >
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="model.skills.splice(i,1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

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
        name: "",
        title: "",
        avatar: "",
        categories: [],
        scores: {
          survival: 0,
          attrack: 0,
          skills: 0,
          difficult: 0,
        },
        skills: [],
      },
      options: [],
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        res = this.$http.post("rest/heroes", this.model);
      }
      // console.log(res);
      this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      this.item = Object.assign({}, this.model, res.data);
    },
    async afterUpload(res) {
      // console.log(res);
      this.item.avatar = res.url;
    },
    // 获取分类数据信息
    async getOptions() {
      const categories = await this.$http.get("rest/categories");
      this.options = categories.data;
    },
  },
  created() {
    this.getOptions();
    this.id && this.fetch();
  },
};
</script>

