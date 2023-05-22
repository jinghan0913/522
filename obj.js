class Obj{  //一隻大象物件的設定
    constructor(args){  //預設值，基本資料(包含有物件的顏色，位置，速度，大小...)
      // this.p = args.p ||  {x: random(width), y:random(height) }  //一個物件開始的位置
      this.p = args.p ||  createVector(random(width),random(height))
      // this.v = {x: random(-1,1), y:random(-1,1) }  //速度，x，y移動的速度為亂數產生-1,1之間的數字
      this.v = createVector(random(-1,1),random(-1,1))  //產生一個x座標值為random(-1,1),y座標值為random(-1,1)
      this.size = random(5,10)   //放大倍率
      this.color = random(fill_colors)    //充滿顏色
      this.stroke = random(stroke_colors)  //線條顏色 
    }
    draw()  //把物件畫出來的函數
    {
      push() //重新設定，設定新的原點與顏色設定
        translate(this.p.x,this.p.y)  //原點設定在==>物件所在位置 
        scale((this.v.x<0?1:-1),-1)  //放大縮小的指令，左右翻轉==>this.v.x<0?1:-1 ==>this.v.x<0條件成立的話，則值為1，否則為-1
        fill(this.color)
        stroke(this.stroke)
        strokeWeight(3)
        beginShape()
          for(var i =0;i<points.length;i=i+1){
            // line(points[i][0]*this.size,points[i][1]*this.size,points[i+1][0]*this.size,points[i+1][1]*this.size)
            // vertex(points[i][0]*this.size,points[i][1]*this.size)
            curveVertex(points[i][0]*this.size,points[i][1]*this.size)
          }
        endShape()
      pop()
  
    }
    update(){    //移動後設定位置資料值為何
      //移動的程式碼+++++++++++++++++++++++++++++++++++++
      // this.p.x = this.p.x + this.v.x
      // this.p.y = this.p.y + this.v.y
      this.p.add(this.v)  //此行的效果跟上面兩行一樣,add為加
      // ++++++++++++++++++++++++++++++++++++++++++++++++++
  
      //算出滑鼠位置的向量
      //+++++++++++隨著滑鼠方向移動，每隻大象移動速度都一樣(.limit(3)固定為3，向著滑鼠游標移動)
      // let mouseV = createVector(mouseX,mouseY)   //把目前滑鼠的位置轉成向量值
      //let delta =  mouseV.sub(this.p).limit(3)     //delta值紀錄與滑鼠方向移動的"單位"距離，sub為向量減法，limit為每次移動單位距離
      //++++++++++++++++++++++++++++++++++++++++++++++++

      //++++++++++++++隨著滑鼠方向移動，每隻大象移動速度隨著原本大象既有的速度移動
      // let mouseV = createVector(mouseX,mouseY)   //把目前滑鼠的位置轉成向量值
      // let delta =  mouseV.sub(this.p).limit(this.v.mag()*2)  //與原本物件的速度有關，this.v.mag()==>取得物件的速度值
      // this.p.add(delta)
      //+++++++++++++++++++++++++++++
  
      //碰壁的處理程式碼++++++++++++++++++++++++++++++
      if(this.p.x<=0 || this.p.x >= width)  //<0碰到左邊，>width為碰到右邊
      {
        this.v.x = -this.v.x
      }
      if(this.p.y<=0 || this.p.y >= height)  //<0碰到左邊，>width為碰到右邊
      {
        this.v.y = -this.v.y
      }
      // ++++++++++++++++++++++++++++++++++++++++++++++
    }

    
    //++++++++++++++++++++++碰撞函數
    isBallInRanger(x,y){   //判斷有沒有被滑鼠按到
      let d = dist(x,y,this.p.x,this.p.y)  //計算滑鼠按下的點與此物件位置之間的距離
      if(d<this.size*4){  //4的由來:去看座標點最大的值，以此作為被點選方框的高與寬
        return true   //代表距離有在範圍內
      }else{
        return false  //代表距離沒有在範圍內
      }
    }
    //++++++++++++++++++++++++++++++++++
  
  }