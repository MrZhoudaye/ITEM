const express = require('express')
const app = express()

app.use(express.static(__dirname))

app.listen(3000)

app.on('3000',function(){
    console.log("监听了3000端口")
})
const Server = require('ws').Server

const ws = new Server({port:9999})

ws.on('connection',function(sokect){
    sokect.on('message',function(msg){
        console.log(msg)
        console.log("haha")
        sokect.send(`服务器说:${msg}`)
    })
})
