const mongoose = require('mongoose')

// 设定集合规则
const schema = new mongoose.Schema({
  name: { type: String },
  // 指定类型为 数据库中 id 类型 ref 关联 Category
  parent:{ type: mongoose.SchemaTypes.ObjectId, ref:'Category' }
})
// 创建集合并应用规则
// 接下来 导出 Category 并创建实例 
/**
const cate = new Category({
  name:'xxxx'
})
cate.save()
 */
module.exports = mongoose.model('Category', schema)
