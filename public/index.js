var canvas = document.getElementById('canv')
var context = canvas.getContext('2d')
var shapes = []
var socket = io.connect('http://localhost:8000/shapesApp')
socket.on('welcome',(message)=>{
    alert(message)
})
window.onresize = ()=>{
    setDimensions()
}
function setDimensions() {
  canvas.width = window.innerWidth/2
  canvas.height = window.innerHeight/2
  shapes.forEach((shape)=>{
      shape.resize(canvas.width,canvas.height)
  })
  draw()
}
setDimensions()
function draw() {
    context.clearRect(0,0,canvas.width,canvas.height)
    context.strokeRect(0,0,canvas.width,canvas.height)
    context.fillStyle = "#00838F"
    shapes.forEach((shape)=>{
        shape.draw(context)
    })
    var dataUrlArray = canvas.toDataURL().split(";");
    var base64Array = dataUrlArray.length == 2 ? dataUrlArray[1].split(","):[]
    var data = base64Array.length == 2?base64Array[1]:""
    socket.emit("base64image",data)
}
canvas.onmousedown = function(event) {
    var x = event.pageX,y = event.pageY
    var shapesLen = shapes.length%3
    switch(shapesLen) {
        case 0:
            shapes.push(new Circle(x,y,canvas.width,canvas.height))
            break
        case 1:
            shapes.push(new Square(x,y,canvas.width,canvas.height))
            break
        case 2:
            shapes.push(new Triangle(x,y,canvas.width,canvas.height))
            break
        default:
            break
    }
    draw()
}
