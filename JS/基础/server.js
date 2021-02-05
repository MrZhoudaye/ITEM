const { fstat } = require("fs")
const http = require("http")
const path = require("path")
const fs = require("fs")
const express = require("../node_modules/express")

let app = express()

app.listen(3003, () => {
  console.log('启动了 http://localhost:3003')
})
let dbpath = path.join(__dirname, '/test.json')
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*")
    next()
})
app.get("/getapi",(req,res) => {
    console.log(req.url)
    fs.readFile(dbpath,"utf-8",(err,data) => {
        if(err) return false
        data = JSON.parse(data)
        console.log(data)
        res.end(JSON.stringify(data))
    })
})
