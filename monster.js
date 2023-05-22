var monster_colors = "004b23-006400-007200-008000-38b000-70e000-9ef01a-ccff33".split("-").map(a=>"#"+a)
class Monster{
    constructor(args){  //預設值，基本資料(包含有物件的顏色，位置，速度，大小...)
        this.r = args.r || random(50,70)    //怪物的外圓
        this.p = args.p ||  createVector(random(width),random(height))  //怪物起始的位置(以向量方式表示該座標)      
        this.v = args.v || createVector(random(-1,1),random(-1,1)) //怪物的速度    
        this.color = args.color || random(monster_colors)   //怪物顏色
        this.mode = random(["happy","bad"])
        this.IsDead = false  //false代表該怪物還活著
        this.timenum=0
    }

    draw(){    //畫怪物
        if(this.IsDead==false){  //活著時，畫的畫面
            push()
                translate(this.p.x,this.p.y)
                fill(this.color)
                noStroke() //不要有框線
                ellipse(0,0,this.r)
                if(this.mode == "happy"){ //眼睛為全圓
                    fill(255)
                    ellipse(0,0,this.r/2)
                    fill(0)
                    ellipse(0,0,this.r/3)
                }else{   //眼睛為半圓
                    fill(255)
                    arc(0,0,this.r/2,this.r/2,0,PI)
                    fill(0)
                    arc(0,0,this.r/3,this.r/3,0,PI)               

                }
                //產生腳
                stroke(this.color) 
                strokeWeight(4)
                // line(this.r/2,0,this.r,0)
                noFill();
                for(var j=0;j<8;j++){
                    rotate(PI/4)   //因為要產生八隻腳，一隻腳要旋轉45度，PI代表180，PI/4代表45度
                    beginShape()
                        for (var i=0;i<(this.r/2);i++){
                            vertex(this.r/2+i,sin(i/5+frameCount/10)*10)
                        }
                    endShape()
                }
            pop()
        }else{  //死後爆炸的畫面圖
            this.timenum = this.timenum+1
            push()
                translate(this.p.x,this.p.y)
                fill(this.color)
                noStroke() //不要有框線
                ellipse(0,0,this.r)
                stroke(255)
                line(-this.r/3,0,this.r/3,0) //眼睛的線
                //產生腳
                stroke(this.color) 
                strokeWeight(4)
                // line(this.r/2,0,this.r,0)
                noFill();
                for(var j=0;j<8;j++){
                    rotate(PI/4)   //因為要產生八隻腳，一隻腳要旋轉45度，PI代表180，PI/4代表45度
                    line(this.r/2,0,this.r,0)  //八隻腳產生一個直線
                }
            pop()
        }

    }

    update(){   
        this.p.add(this.v)
        if(this.p.x<=0 || this.p.x >= width)  //<0碰到左邊，>width為碰到右邊
        {
            this.v.x = -this.v.x
        }
        if(this.p.y<=0 || this.p.y >= height)  //<0碰到左邊，>width為碰到右邊
        {
            this.v.y = -this.v.y
        }
    }
    isBallInRanger(x,y){   //判斷有沒有被滑鼠按到
        let d = dist(x,y,this.p.x,this.p.y)  //計算飛彈與此物件(怪物)中心位置之間的距離
        if(d<this.r/2){  //飛彈與怪物間的距離如果小於半徑(this.r/2)，代表碰撞到
          return true   //代表距離有在範圍內
        }else{
          return false  //代表距離沒有在範圍內
        }
      }
}