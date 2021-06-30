// const { builtinModules } = require('module');
const mongoose = require('mongoose')
// const { stringify } = require('querystring');
const Schema = mongoose.Schema

const product = new Schema({
  title: String,
  price: Number,
  likes: { type: Number, default: 0 }
})

module.exports = mongoose.model('Product', product)
