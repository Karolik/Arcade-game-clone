// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.    
    if (this.x >= 505) {
        this.x = -100;
        let y = [65, 145, 230];
        this.y = y[Math.floor(Math.random() * y.length)];
        this.speed*dt;
    }
    
    if (this.x <= 0) {
        this.speed = Math.floor(Math.random() * 300) + 140;
        this.speed*dt;
    }
    
    this.x += this.speed*dt;

//Check for collisions between the player and enemies :
    for (let i = 0; i < allEnemies.length; i++) {
        const dx = player.x - allEnemies[i].x;
        const dy = player.y - allEnemies[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
//Reset the player's position when the player colides with an enemy
        if (distance < 40) {
          player.reset();
          scoreText.result -= 10;
          if (scoreText.result < 0) scoreText.result = 0;
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function() {
    this.x = 200;           //Initial position of the player
    this.y = 400;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
};

Player.prototype.update = function() {
    if (this.y < 0){
        player.reset();
        scoreText.result += 10;
        //scoreText.setText('Points: '+score);
    }
};

Player.prototype.handleInput = function(key){
    if (key==="left" && this.x <= 400 && this.x > 0){
        this.x -= 100;
    };
    if (key==="up" && this.y <= 400 && this.y > 0){
        this.y -= 85;
    };
    if (key==="right" && this.x < 400 && this.x >= 0){
        this.x += 100;
    };
    if (key==="down" && this.y < 400 && this.y >= 0){
        this.y += 85;
    };

    console.log(key);
    console.log(player);
};

//Reset method: if the player reaches the water, move the player back to the initial location
Player.prototype.reset = function(){
    this.x = 200;
    this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [new Enemy(0, 65, 240), new Enemy(0, 145, 150), new Enemy(0, 230, 190)];
console.log(allEnemies);

// Place the player object in a variable called player
let player = new Player();
console.log(player);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


//Score of the game
const Score = function(x, y) {
    this.x = 0;
    this.y = 0;
    this.sprite = 'images/Star.png';
}
Score.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let score = new Score();
console.log(score);

const ScoreText = function(result, x, y) {
    this.result = result;
    this.x = 44;
    this.y = 110;
}

ScoreText.prototype.render = function() {
    ctx.font="18px arial";
    ctx.fillText(this.result, this.x, this.y);
};

let scoreText = new ScoreText(0);
