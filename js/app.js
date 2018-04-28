// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    //ctx.drawImage(Resources.get(this.sprite), 0, 65);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function(){
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

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

Player.prototype.handleInput = function(key){
    if (key==="left" && this.x <= 400 && this.x > 0){
        this.x -= 100;
    };
    if (key==="up" && this.y <= 400 && this.y > 100){
        this.y -= 85;
    };
    if (key==="right" && this.x < 400 && this.x >= 0){
        this.x += 100;
    };
    if (key==="down" && this.y < 400 && this.y >= 0){
        this.y += 85;
    };

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    console.log(key);
    console.log(player);
};

//Reset method: if the player reaches the water, move the player back to the initial location
Player.prototype.reset = function(){
    if (this.y <= 60) {
        this.x = 200;
        this.y = 400; 
    } 
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let enemy1 = new Enemy(0, 65);
let enemy2 = new Enemy(0, 145);
let enemy3 = new Enemy(0, 145);
let enemy4 = new Enemy(0, 230);
//let allEnemies = [];
let allEnemies = new Array();
allEnemies.push(enemy1, enemy2, enemy3, enemy4);
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
