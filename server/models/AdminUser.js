const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String },
  // set 对密码进行设置保存 bcrypt 对密码进行散列处理
  password: { 
    type: String,
    select:false,
    set:function(val){
      return require('bcrypt').hashSync(val,10)
    }
  }
})

module.exports = mongoose.model('AdminUser',schema)