function Starry() {//构造函数
            this.cxt = canvas.getContext('2d');//创建绘画2d空间，画笔
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            this.cW = canvas.width;
            this.cH = canvas.height;
            this.num = 100;
            this.data = [];

        }
        Starry.prototype = {
            //初始化粒子：实心圆
            init: function(){
                for(var i=0;i<this.num;i++){
                    this.data[i] = {
                        x: Math.random() * this.cW,
                        y: Math.random() * this.cH,
                        cX: Math.random() * 0.2,
                        cY: Math.random() *0.2,
                    };
                        this.drawCircle(this.data[i].x,this.data[i].y);
                }
            },
            //绘制粒子
            drawCircle: function(x,y){
                var cxt = this.cxt;
                cxt.save();//保存路径
        cxt.fillStyle = '#c0c0c0';
        cxt.beginPath();//开始路径
        cxt.arc(x,y,1,0,Math.PI*2,false)
        /*arc代表圆，x（与y均为圆心坐标），y，r（半径），0（初始度数），
        math.pi*2（结束度数），false（顺时针，true表示逆时针）*/
        cxt.closePath();//结束路径
        cxt.fill();//填充方法fill表示实心，stroke表示空心
        cxt.restore();//释放路径
            },
            //绘制线条
            drawLine: function(x1,y1,x2,y2){
                var cxt = this.cxt;
        var color = cxt.createLinearGradient(x1,y1,x2,y2);
        color.addColorStop(0,'#c0c0c0');
        color.addColorStop(1,'#c0c0c0');
        cxt.save();//保存路径
        cxt.strokeStyle = color;
        cxt.beginPath();//开始路径
        cxt.moveTo(x1,y1);//起点
                cxt.lineTo(x2,y2);//终点
        cxt.closePath();//结束路径
        cxt.stroke();//填充方法fill表示实心，stroke表示空心
        cxt.restore();//释放路径
            },
            //粒子运动
            moveCircle: function(){
                var self = this;
                self.cxt.clearRect(0,0,self.cW,self.cH);
                //模拟速度增量
                for(var i=0;i<self.num;i++){
                    self.data[i].x += self.data[i].cX;
                    self.data[i].y += self.data[i].cY;
                    //边界值判断
                    if(self.data[i].x > self.cW || self.data[i].x < 0 )
                    {    self.data[i].cX = -self.data[i].cX;}
                    if(self.data[i].y > self.cH || self.data[i].y < 0 )
                    {self.data[i].cY = -self.data[i].cY;}
                    this.drawCircle(this.data[i].x,this.data[i].y);
                    //用勾股定理判断是否联系那
                    for(var j=i+1;j<self.num;j++)//下一个点
                        if(Math.pow(self.data[i].x - self.data[j].x,2)+
                    Math.pow(self.data[i].y - self.data[j].y,2)<= 80 * 80){
                        self.drawLine(self.data[i].x,self.data[i].y,self.data[j].x,self.data[j].y);
                    }
                }
            }
    }
    var starry = new Starry();//生成的实例化
        starry.init();
        setInterval(function(){
            starry.moveCircle();
        },5);