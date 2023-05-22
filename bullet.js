class Bullet{
    constructor(args){  //預設值，基本資料(包含有物件的顏色，位置，速度，大小...)
        this.r = args.r || 10    //如果飛彈有傳回直徑的大小，就以參數為直徑，否則預設為10
        this.p = args.p ||  shipP.copy()   //createVector(width/2,height/2)  //飛彈起始的位置(以向量方式表示該座標) ，要以中間砲台發射，所以座標為(width/2,height/2)        
        this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(6) //飛彈的速度    
        this.color = args.color || "red"   //飛彈顏色
    }
    draw(){  //劃出飛彈
        push()
            translate(this.p.x,this.p.y)
            fill(this.color)
            noStroke()
            ellipse(0,0,this.r)
            // rectMode(CENTER)
            // rect(0,0,20,40)
            // triangle()
        pop()
    }
    update(){  //計算移動後的位置
        this.p.add(this.v) 
    }
}