<template>
  <div>
    <h1>广告位列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <!-- <el-table-column label="上级分类" width="120">
        <template slot-scope="scope">
          <span v-for="(item,index) in scope.row.categories" :key="item.id">
            {{item.name}} <span v-if="index !== scope.row.categories.length - 1">/</span>
          </span>
        </template>
      </el-table-column> -->
      <el-table-column prop="name" label="名称" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <!-- scope 是当前这一行的数据 -->
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/ads/edit/${scope.row._id}`)"
          >
            编辑
          </el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('rest/ads')
      this.items = res.data;
    },
    remove(row) {
      // console.log(row);
      this.$confirm(`是否确定要删除分类 ${row.name}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.delete(`rest/ads/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.fetch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style>
</style>