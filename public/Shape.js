var initialW = window.innerWidth/2
var initialH = window.innerHeight/2
class Shape  {
    constructor(x,y,w,h) {
      this.x = x
      this.y = y
      this.w = w
      this.h = h
    }
    resize(w,h) {
      this.w = w
      this.h = h
      this.x = (this.w * this.x)/(initialW)
      this.h = (this.h * this.y)/(initialH)
    }
    draw(ctx) {

    }
}
class Circle extends Shape {
    constructor(x,y,w,h) {
      super(x,y,w,h)
    }
    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.w/20,0,2*Math.PI)
        ctx.fill()
    }
}
class Square extends Shape {
    constructor(x,y,w,h) {
        super(x,y,w,h)
    }
    draw(ctx) {
        var w= this.w/10
        ctx.fillRect(this.x-w/2,this.y-w/2,w,w)
    }
}
class Triangle extends Shape {
    constructor(x,y,w,h) {
        super(x,y,w,h)
    }
    draw(ctx) {
        var w = this.w/10
        ctx.beginPath()
        ctx.moveTo(this.x+w/2,this.y+w/2)
        ctx.lineTo(this.x,this.y-w/2)
        ctx.lineTo(this.x-w/2,this.y+w/2)
        ctx.lineTo(this.x+w/2,this.y+w/2)
        ctx.fill()
    }
}
