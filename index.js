const express = require('express')
const app = express()
const bodyParseer = require('body-parser')//解析参数
const cors = require('cors')
const mysql = require('mysql')
const option = {
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: '123456',
  database: 'mydata',
  connectTimeout: 5000,
  multipleStatements: false
}
app.use(bodyParseer.json())//json请求
app.use(bodyParseer.urlencoded({extended: false}))//表单请求
app.use(cors())//解决跨域

const conn = mysql.createConnection(option)

app.listen(80,() => {
  console.log('服务启动')
})

// let login = true
// app.all('*', (req,res,next) => {
//   if(!login) return res.json('****')
//   next()
// })

//增
app.post('/add', (req,res) => {
  let data = req.body
  res.json(req.query)
  conn.query(`INSERT INTO user (name,age,sex) VALUES (?,?,?)`, [data.name,data.age,data.sex], (error, results, fields) => {
    if (error) 
        throw error
  })
})

//删
app.get('/del', (req,res) => {
  let id = req.query.name
  res.json(req.query)
  conn.query(`DELETE FROM user where name = ?`, id, (error, results, fields) => {
    if (error) 
        throw error
  })
})

//改
app.post('/updata', (req,res) => {
  let data = req.body
  res.json(req.query)
  conn.query(`UPDATE user SET age = ?, name = ? WHERE sex = ?`, [data.age,data.name,data.sex], (error, results, fields) => {
    if (error) 
        throw error
  })
})

//查
app.all('/g3', (req,res,next) => {
  conn.query('SELECT * FROM user',(e,r) => {
    console.log(e,r,123)
    return res.json(new Result({data: r}))
  })
  // next()
})
function Result({code=1,msg='',data={}}) {
  this.code = code
  this.msg = msg
  this.data = data
}

// app.get('/', (req,res) => {
//   res.send('<div style="color: red">hellword</div>')
// })

// app.post('/test/:data', (req,res) => {
//   return res.json({qurey:req.query,data:req.params,json:req.body})
// })
