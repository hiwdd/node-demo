// 导入express框架
const express = require('express')
const app = express()

// 解决跨域
const cors = require('cors')

// 中间件 获取参数的
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// 获取json数据
var data = require('./data.json')
app.all('*',(req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OP0TIONS")
  res.header("X-Powered-By", "3.2.1")
  res.header("Content-Type", "application/json;charset=utf-8")
  next();
})

app.post('/123', (req, res) => {
  res.status(200)
  res.json(data)
  // res.send()
})

var server = app.listen('3000',() => {
  var hostname = server.address().address
  var port = server.address().port
  console.log(`Server running at http://${hostname}:${port}/`)
})
