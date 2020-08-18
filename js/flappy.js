function Bird() {
    // this.count = 0;
    // this.skyposition = 0;
    // this.skystep = 2;
    // this.startColor = 'blue';
    // this.birdTop = 235;
    this.birdStepY = 0;//开始游戏后小鸟自动下坠的距离
    this.startFlag = false;//游戏开始标志
    this.minTop = 0;
    this.maxTop = 560;//判断小鸟是否触碰边界
    this.pipeLength = 7;
    this.pipeArr = [];//游戏内存放管道的数组
    this.el = document.getElementById('game');
    this.oStart = document.getElementsByClassName('start')[0];
    this.oBird = document.getElementsByClassName('bird')[0];
    this.oScore = document.getElementsByClassName('score')[0];
    this.oMask=document.getElementsByClassName('mask')[0];
}
Bird.prototype.init = function () {
    this.count = 0;
    this.skyposition = 0;
    this.skystep = 2;
    this.startColor = 'blue';
    this.startFlag = false;
    this.birdTop = 235;
    this.pipeArr = [];
    this.birdStepY = 0;
    this.animate();//动态
    this.handleStart();
    this.handleClick();
}
Bird.prototype.skyMove = function () {
    this.skyposition -= this.skystep;
    this.el.style.backgroundPositionX = this.skyposition + 'px';//使天空移动
}
Bird.prototype.birdJump = function () {
    this.birdTop = this.birdTop === 235 ? 265 : 235;
    this.oBird.style.top = this.birdTop + 'px';//使小鸟上下跳跃
}
Bird.prototype.birdFly = function () {
    this.oBird.style.backgroundPositionX = this.count % 3 * -30 + 'px';//每一次换一帧，达到运动的效果
}
Bird.prototype.startBound = function () {//开始游戏的不断变换
    var prevColor = this.startColor;
    this.startColor = this.startColor === 'blue' ? 'white' : 'blue';
    this.oStart.classList.remove('start-' + prevColor);
    this.oStart.classList.add('start-' + this.startColor);
}
Bird.prototype.animate = function () {//使整个程序活起来
    var This = this;
    this.timer = setInterval(function () {
        This.skyMove();
        if (++This.count % 10 === 0) {
            //console.log(This.count);
            if (!This.startFlag) {
                This.birdJump();
                This.startBound();
            }
            This.birdFly();
        }
        if(This.startFlag){
            This.birdDrop();
            This.pipeMove();
        }
    }, 30);
}
Bird.prototype.handleStart = function () {//开始游戏点击后
    var This = this;
    this.oStart.onclick = function () {
        This.startFlag = true;
        This.oStart.style.display = 'none';
        This.oBird.style.left = '80px';
        This.oScore.style.display = 'block';
        This.oBird.style.transition = 'none';
        This.skystep = 5;
        for(var i=0;i<This.pipeLength;i++){
            This.createPipe(300*(i+1));
        }
    }
}
Bird.prototype.handleClick = function () {//全屏点击使小鸟向上移动
    var This = this;
    this.el.onclick = function (e) {
        var target = e.target;
        var isStart=target.classList.contains('start');
        if (!isStart){
            This.birdStepY=-10;
        }
    }
}
Bird.prototype.birdDrop=function(){//小鸟自动下坠
    this.birdTop += ++this.birdStepY;
    this.oBird.style.top=this.birdTop+'px';
    this.judgeKnock();
}
Bird.prototype.judgeKnock = function () {
    this.judgeBoundary();
    this.judgePipe();
}
Bird.prototype.judgeBoundary = function () {//判断小鸟是否触碰上下边界
    if (this.birdTop <= this.minTop || this.birdTop >= this.maxTop) {
        this.failGame();
    }
}
Bird.prototype.judgePipe = function () {//判断小鸟是否触碰管道

}
Bird.prototype.createPipe=function(x){//创建上下管道，并传入x作为left的值
    var upHeight=50+Math.floor(Math.random()*175);//随机产生管道高度
    var downHeight=450-upHeight;
    var oUpPipe=createEle('div',['pipe','pipeUp'],{
        height:upHeight+'px',
        left:x+'px'
    });
    var oDownPipe=createEle('div',['pipe','pipeDown'],{
        height:downHeight+'px',
        left:x+'px'
    });
    this.el.appendChild(oUpPipe);
    this.el.appendChild(oDownPipe);//将管道添加到主页面

    this.pipeArr.push({
        up:oUpPipe,
        down:oDownPipe
    })//存放管道数组
}
Bird.prototype.pipeMove=function(){
    for(var i=0;i<this.pipeLength;i++){
        var oUpPipe=this.pipeArr[i].up;
        var oDownPipe=this.pipeArr[i].down;
        var x=oUpPipe.offsetLeft-this.skystep;

        oUpPipe.style.left=x+'px';
        oDownPipe.style.left=x+'px';
    }
}
Bird.prototype.failGame = function () {//游戏结束
    clearInterval(this.timer);
    this.oMask.style.display='block';
}
var bird = new Bird();
bird.init();