const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  title: { type: String },
  avatar: { type: String },
  categories: [{type: mongoose.SchemaTypes.ObjectId, ref:'Category'}],
  scores: {
    survival: { type: Number },
    attrack: { type: Number },
    skills: { type: Number },
    difficult: { type: Number }
  },
  skills: [{icon:{type:String}, name: String, description: String ,tips:String}]
})

module.exports = mongoose.model('Hero', schema)