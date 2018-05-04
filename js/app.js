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

        if (distance < 40) {
          player.reset();       //Reset the player's position when collision
          player.score -=10;
          if (player.score < 0) player.score = 0;
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
    this.score = 0;
    //this.char = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png' ];
    this.sprite = 'images/char-boy.png';
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);    
};

Player.prototype.update = function() {
    if (this.y < 0){
        player.reset();
        this.score += 10;

        if (player.score === 110){
            swal({
                title: "Congratulations! You won!",
                //text: "With "+ m.innerText +"\n"+"Your time is "+time.innerText+"!",
                type: "success",
                confirmButtonText: "Play again!",
            //TODO: When the button is clicked to Play again, the game is restarted   
            }).then((result) => {
                document.location.href="";
            })
        };
    };    

    if (this.score === 0){
        Player.prototype.currentScore = function () {
            ctx.font="18px arial";
            ctx.fillText(this.score, 40, 105);
        };
     } else if (this.score >= 10){
        Player.prototype.currentScore = function () {
            ctx.fillText(this.score, 35, 105);
        };
    } else if (this.score >= 100){
        Player.prototype.currentScore = function () {
            ctx.fillText(this.score, 30, 105);
        };
    };
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
    console.log(player);
};

//Reset method: if the player reaches the water, move the player back to the initial location
Player.prototype.reset = function(){
    this.x = 200;
    this.y = 400;
};

//Score of the game
Player.prototype.currentScore = function () {
    ctx.font="18px arial";
    ctx.fillText(this.score, 40, 105);
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
