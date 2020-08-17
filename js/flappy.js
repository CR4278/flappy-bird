function Bird() {
    // this.count = 0;
    // this.skyposition = 0;
    // this.skystep = 2;
    // this.startColor = 'blue';
    // this.birdTop = 235;
    this.el = document.getElementById('game');
    this.oStart = document.getElementsByClassName('start')[0];
    this.oBird = document.getElementsByClassName('bird')[0];
}
Bird.prototype.init = function () {
    this.count = 0;
    this.skyposition = 0;
    this.skystep = 2;
    this.startColor = 'blue';
    this.birdTop = 235;
    this.animate();
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
    setInterval(function () {
        This.skyMove();
        if(++This.count%10===0){
        This.birdJump();
        console.log(This.count);
        This.startBound();
        This.birdFly();
        }
    }, 30);
}
var bird = new Bird();
bird.init();