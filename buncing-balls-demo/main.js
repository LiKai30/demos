const BALLS_COUNT = 35;
const BALL_SIZE_MIN = 10;
const BALL_SIZE_MAX = 20;
const BALL_SPEED_MAX = 7;

// 设定画布,ctx对象直接代指画布上的一块允许我们绘制 2D 图形的区域。
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// 将画布窗尺寸置为窗口内尺寸
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 定义一个数组来保存所有的球
const balls = [];

// 生成[min,max]随机数的函数
function random(min,max) {
  return Math.floor(Math.random()*(max-min)) + min;
}

// 生成随机颜色的函数
function randomColor() {
    return 'rgb(' +
           random(0, 255) + ', ' +
           random(0, 255) + ', ' +
           random(0, 255) + ')';
}

// 定义 Ball 对象构造器
//x,y 小球在屏幕上最开始时候的坐标。默认从左上角开始
//水平和竖直速度（velX 和 velY）
function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

// 定义绘制球的函数
Ball.prototype.draw = function() {
  //保存当前canvas状态到栈中。可多次保存
  ctx.save();
  //开始一条路径，或重置当前的路径。需要使用moveTo()、
  //lineTo()、quadricCurveTo()、bezierCurveTo()、arcTo()、arc等方法创建路径或者图像
  ctx.beginPath();
  //来填充另一种颜色/渐变。
  ctx.fillStyle = this.color;
  //创建一个圆弧，x，y为圆弧的中心坐标，sze为半径，后两个参数是圆弧对应的夹角
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  //声明我们结束了以 beginPath() 开始的绘画，并填充当前的图像（路径）。默认颜色是黑色。
  ctx.fill();
  //恢复保存的canvas状态，从栈中弹出
  ctx.restore();
};

// 定义更新球的函数
Ball.prototype.update = function() {
  //小球碰到右边屏幕，则反转水平速度方向
  if((this.x + this.size) >= width) {
    //这种写法，可以实现不断反转
    this.velX = -(this.velX);
  }
  //小球碰到左边屏幕，则反转水平速度方向
  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }
  //小球碰到底部屏幕，则反转垂直速度方向
  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }
  //小球碰到上面屏幕，则反转垂直速度方向
  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }
  //实现移动
  this.x += this.velX;
  this.y += this.velY;
};

// 定义碰撞检测函数
Ball.prototype.collisionDetect = function() {
  for(let j = 0; j < balls.length; j++) {
    //检查遍历的小球是否是当前的小球。
    if( this !== balls[j]) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      //两个小球中心的距离是否小于两个小球的半径之和。
      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = randomColor();
      }
    }
  }
};

// 定义一个循环来不停地播放
function loop() {
  //设置画布为半透明的黑色
  ctx.fillStyle = 'rgb(0, 0, 0, 0.25)';
  //这四个参数分别是起始的坐标、绘制的矩形的宽和高
  ctx.fillRect(0, 0, width, height);

  while(balls.length < BALLS_COUNT) {
    const size = random(BALL_SIZE_MIN, BALL_SIZE_MAX);
    const ball = new Ball(
      // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-BALL_SPEED_MAX, BALL_SPEED_MAX),
      random(-BALL_SPEED_MAX, BALL_SPEED_MAX),
      randomColor(),
      size
    );
    balls.push(ball);
  }

  for(let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();