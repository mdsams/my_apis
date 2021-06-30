require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.MON_URI, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) {
    throw err
  } else {
    console.info('Connected to db')
  }
})

const Product = require('./model/product')
const Wishlist = require('./model/wishlist')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/product', function (request, response) {
  console.log(request.body)
  const product = new Product()
  product.title = request.body.title
  product.price = request.body.price
  product.save().then((doc) => {
    response.send(doc)
  }).catch((err) => {
    console.log(err)
    response.status(500).send({ error: 'Could Not Saved to Database' })
  })
})

app.post('/wishlist', function (request, response) {
  const wishlist = new Wishlist()
  wishlist.title = request.body.title
  wishlist.save = function (err, newWishlist) {
    if (err) {
      response.status(500).send({ error: 'Could Not Create Wishlist' })
    } else {
      response.send(newWishlist)
    }
  }
})

app.listen(9999, function () {
  console.log('API running on port 9999....')
})
