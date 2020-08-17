function Plane() {
    this.tds = [];//存放dom节点
    this.squares = [];//存放单元格数据
    this.point = [];//存放飞机的中心点
    this.parent = document.querySelector('.gameBox');
    this.count = document.querySelector('.count');
    this.step = 0;
    this.flag=0;//获胜的标志
}
//随机产生飞机的位置
Plane.prototype.random = function () {
    var arr = [];
    x = Math.round(Math.random() * 5 + 2);
    y = Math.round(Math.random() * 6 + 1);
    this.point=[y,x];
    arr.push([y, x]);
    for (let i = x - 2; i <= x + 2; i++) {//将横向的坐标入数组
        if (i != x) {
            arr.push([y, i]);
        }
    }
    for (let j = y - 1; j <= y + 2; j++) {//将纵向的坐标入数组
        if (j != y) {
            arr.push([j, x]);
        }
    }
    for (let i = x - 1; i <= x + 1; i++) {//将机尾坐标如数组
        if (i != x) {
            arr.push([y + 2, i]);
        }
    }
    return arr;
}
//创建dom节点 利用table标签
Plane.prototype.creatDom = function () {
    var This=this;
    var table = document.createElement('table');
    for (var i = 0; i < 10; i++) {
        var domTr = document.createElement('tr');
        this.tds[i] = [];
        for (var j = 0; j < 10; j++) {
            var domTd = document.createElement('td');
            domTd.pos = [i,j];
            domTd.onclick=function(){
                This.play(this);
            }
            this.tds[i][j] = domTd;
            domTr.appendChild(domTd);
        }
        table.appendChild(domTr);
    }
    this.parent.innerHTML = '';
    this.parent.appendChild(table);
}

Plane.prototype.init = function () {
    this.step=0;
    this.flag=0;
    this.count.innerHTML = this.step;
    var rn = this.random();//飞机位置坐标
    //console.log(rn);
    for (var i = 0; i < 10; i++) {
        this.squares[i] = [];
        for (var j = 0; j < 10; j++) {
            this.squares[i][j] = {type:"blank", x:j, y:i};
        }
    }
    for (var i = 0; i < rn.length; i++) {
        var te = rn[i];
        this.squares[te[0]][te[1]].type = "plane";//将飞机位置的类型改为plane
        //this.tds[te[0]][te[1]].style.backgroundColor='#f40';
    }
    //console.log(this.squares);
    this.creatDom();
}
Plane.prototype.play=function(obj){
    var curSquare=this.squares[obj.pos[0]][obj.pos[1]];
    if(curSquare.type=="plane"){
        if(obj.pos[0]==this.point[0]&&obj.pos[1]==this.point[1]){
            this.win();
        }else{
            this.flag++;
            obj.className='red';
            this.step++;
        }
        if(this.flag>=3){
            this.win();
        }
        this.count.innerHTML = this.step;
    }else{
        obj.className='blue';
        this.step++;
        this.count.innerHTML = this.step;
    }
}
Plane.prototype.win=function(){
    for(var i=0;i<10;i++){
        for(var j=0;j<10;j++){
            if(this.squares[i][j].type=="plane"){
                this.tds[i][j].className='red';//将飞机显示出来
            }
            this.tds[i][j].onclick=null;//取消所有td元素的鼠标事件
        }
    }
}
var btn=document.getElementsByTagName('button')[0];
var plane = new Plane();
plane.init();
btn.onclick=function(){
    plane.init();
}

