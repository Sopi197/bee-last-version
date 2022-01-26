
let canvas = document.getElementById("ball");
let context = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;
let circleFigure = function (x, y, radius, variable, fillFigure) {
   context.beginPath();
   context.arc(x, y, radius, 0, variable, false);
   if (fillFigure) {
      context.fill();
   }
   else {
      context.stroke();
   }
}
let Ball = function () {
   this.x = width / 2;
   this.y = height / 2;
   this.xSpeed = 0.3;
   this.ySpeed = 0.3;
   this.Speed = 1;
   this.bodySize = 10;
   this.earsSize = 5;
   this.eyesSize = 2;
   this.smallSize = 2;
   this.earsDistance = 14;
   this.color = "gold";
   this.colorStroke = "black";
}
Ball.prototype.move = function () {
   this.x += this.xSpeed * this.Speed;
   this.y += this.ySpeed * this.Speed;
   if (this.x < 0) {
      this.xSpeed = -this.xSpeed;
   }
   else if (this.x > width) {
      this.xSpeed = -this.xSpeed;
   }
   else if (this.y < 0) {
      this.ySpeed = -this.ySpeed;
   }
   else if (this.y > height) {
      this.ySpeed = -this.ySpeed;
   }
}
Ball.prototype.draw = function () {
   context.lineWidth = 2;
   context.fillStyle = this.color;
   context.strokeStyle = this.colorStroke;
   circleFigure(this.x, this.y, this.bodySize, Math.PI * 2, true);
   circleFigure(this.x, this.y, this.bodySize, Math.PI * 2, false);
   circleFigure(this.x - 5, this.y - this.earsDistance, this.earsSize, Math.PI * 2, false);
   circleFigure(this.x + 5, this.y - this.earsDistance, this.earsSize, Math.PI * 2, false);
   circleFigure(this.x - 2, this.y - 1, this.eyesSize, Math.PI * 2, false);
   circleFigure(this.x + 2, this.y - 1, this.eyesSize, Math.PI * 2, false);
   circleFigure(this.x, this.y + 3, this.smallSize, Math.PI, false);
}
Ball.prototype.setActivity = function (activity) {
   if (activity === "up") {
      this.xSpeed = 0;
      this.ySpeed = -1;
   }
   else if (activity === "down") {
      this.xSpeed = 0;
      this.ySpeed = 1;
   }
   else if (activity === "left") {
      this.xSpeed = -1;
      this.ySpeed = 0;
   }
   else if (activity === "right") {
      this.xSpeed = 1;
      this.ySpeed = 0;
   }
   else if (activity === "stop") {
      this.xSpeed = 0;
      this.ySpeed = 0;
   }
   else if (activity === "slow") {
      if (this.Speed > 0) {
         this.Speed--;
      }
   }
   else if (activity === "acceleration") {
      this.Speed++;
   }
   else if (activity === "decrease") {
      this.bodySize--;
      this.earsSize--;
      this.eyesSize--;
      this.smallSize--;
      this.earsDistance--;
   }
   else if (activity === "increase") {
      this.bodySize++;
      this.earsSize++;
      this.eyesSize++;
      this.smallSize++;
      this.earsDistance++;
   }
}
let ball = new Ball();
let infoKey = function (event) {
   console.log(event.keyCode);
}
$("body").keydown(infoKey);
let keyActions = {
   40: "down",
   39: "right",
   38: "up",
   37: "left",
   32: "stop",
   90: "slow",
   88: "acceleration",
   67: "decrease",
   86: "increase"
}
let speeds = {
   49: 1,
   50: 2,
   51: 3,
   52: 7,
   53: 10,
   54: 14,
   55: 17,
   56: 20,
   57: 25,
   48: 0
}
let arrayClear = {
   83: "clearRect"
}
let colors = {
   96: "purple",
   97: "pink",
   98: "#7ee098",
   99: "#7eb9e0",
   100: "#a47ee0",
   101: "#cbe07e",
   102: "#7dffe3",
   103: "azure",
   104: "#754242",
   105: "tomato"
}
let colorStrokeObject = {
   81: "#decd9e",
   87: "black",
   69: "#f06767",
   82: "#f5cf36",
   84: "#a47ee0",
   89: "#dff536",
   85: "#585e23",
   73: "#ad3b98",
   79: "#704b69",
   105: "#732c4e",
   80: "#2c4473"
}
let change = function (event) {
   let activity = keyActions[event.keyCode];
   ball.setActivity(activity);
   let speed = speeds[event.keyCode];
   ball.setSpeed(speed);
   let value = arrayClear[event.keyCode];
   ball.clear(value);
   let color = colors[event.keyCode];
   ball.setColors(color)
   let colorStroke = colorStrokeObject[event.keyCode];
   ball.setColorsStroke(colorStroke);
}
$("body").keydown(change);

Ball.prototype.setSpeed = function (speed) {
   if (speed !== undefined) {
      this.Speed = speed;
   }
}
Ball.prototype.clear = function(value) {
   if (value === "clearRect") {
      context.clearRect(0, 0, width, height)
   }
}
Ball.prototype.setColors = function(color) {
   if (color !== undefined) {
      this.color = color;
   }
}
Ball.prototype.setColorsStroke = function(colorStroke) {
   if (colorStroke !== undefined) {
      this.colorStroke = colorStroke;
   }
}
let startGame = function () {
   ball.draw();
   ball.move();
   context.strokeRect(0, 0, width, height);
}
setInterval(startGame, 30);