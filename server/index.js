const express = require('express')

const app = express()

// 中间件
app.use(require('cors')())
app.use(express.json())

require('./plugins/db')(app)

// 好好理解 将 app 传给 ./routes/admin
require('./routes/admin')(app)

// 静态文件加载设置中间件
app.use('/uploads',express.static('uploads'))

app.listen(3000,() => {
  console.log("App listening on http://localhost:3000");
})