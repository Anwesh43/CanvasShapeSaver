var express = require('express')
var app = express()
var path = require('path')
var http = require('http')
var PngSaver = require('./pngSaver')
var pngSaver = new PngSaver()
var server = http.createServer(app)
var socketIo = require('socket.io')
var counter = 0
var file_name = "canvas"
var format = "png"
var seqQueue = require('seq-queue')
var queue = seqQueue.createQueue(1000)
app.use(express.static(path.join(__dirname,'public')))
var io = socketIo(server)
io.of('/shapesApp').on('connection',(socket) => {
    console.log('connected to a client')
    socket.emit("welcome","you are connected to the server")
    socket.on("base64image",function(data){
        queue.push((task)=>{
          console.log(data)
          pngSaver.saveFile(`${file_name}_${counter}.${format}`,data,(err)=>{
              if(err == null) {
                  counter++
                  task.done()
              }
          })
        })
    })
})
server.listen(8000)
