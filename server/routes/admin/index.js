const Category = require('../../models/Category')

module.exports = app => {
  const express = require('express')
  const router = express.Router({
    // 合并 url 参数 不然获取不到 resource
    mergeParams:true
  })
  // const Category = require('../../models/Category')
  
  router.post('/',async (req,res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  router.put('/:id',async (req,res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
    res.send(model)
  })

  router.delete('/:id',async (req,res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({type:'success'})
  })

  router.get('/',async (req,res) => {
    // populate 关联查询 查询的 parent 属性是对象 不是 id
    // const items = await req.Model.find().populate('parent').limit(10)
    const queryOptions = {}
    if(req.Model.modelName === "Category"){
      queryOptions.populate = 'parent'
    }
    if(req.Model.modelName === "Hero"){
      queryOptions.populate = {
        path:'categories',
        model:Category
      }
    }
    if(req.Model.modelName === "Ad"){
      queryOptions.populate = {
        path:'categories',
        model:Category
      }
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items) 
  })

  router.get('/:id',async (req,res) => {
    // const item = await Category.findOne({_id:req.query.id})
    // res.send(item)
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })


  // 定义子路由 router
  // 使用中间件匹配 路径上的路由 对其进行处理 router.get 也可以有 next 参数，但是由于是最后处理可以省略
  app.use('/admin/api/rest/:resource',async (req,res,next) => {
    // inflection 模块用来处理单复数 下划线...
    const modelName = require('inflection').classify(req.params.resource)
    // const Model = require(`../../models/${modelName}`) 直接这样在后面访问不到
    req.Model = require(`../../models/${modelName}`)
    next()
  },router)

  // 登录
  app.post('/admin/api/login',async (req,res) => {
    console.log(req.body)
  })


  // multer 是上传文件所做的配置
  const multer = require('multer') 
  // var storage = multer.diskStorage({
  //   destination:__dirname + '../../uploads',
  //   filename:function(req,file,cb){
  //     cb(null,file.filename)
  //   }
  // })
  // multer({storage:storage})
  const upload = multer({dest:__dirname + '/../../uploads'})
  app.post('/admin/api/upload',upload.single('file'),async (req,res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
    
}