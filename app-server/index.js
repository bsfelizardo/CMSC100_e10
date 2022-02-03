const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/APP', { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if(err) {console.log(err);}
    else {console.log("Connected to Mongo DB")}
  })

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

require('./router')(app)


app.listen(3001, (err) => {
  if (err) { console.log(err) }
  else {console.log('Server started at port 3001')}
})