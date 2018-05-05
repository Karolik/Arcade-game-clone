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
    if (this.x >= 505) {        //When the enemy gets outside the canvas
        this.x = -100;          //bring back the enemy to the beginning of the canvas
        let y = [65, 145, 230];
        this.y = y[Math.floor(Math.random() * y.length)];   //Position the enemy randomly between the 3 rows of paved blocks
        this.speed*dt;
    }
    
    if (this.x <= 0) {
        this.speed = Math.floor(Math.random() * 300) + 140; // Randomly change the speed of the enemy
        this.speed*dt;
    }
    
    this.x += this.speed*dt;

// Check for collisions between the player and the enemies :
    for (let i = 0; i < allEnemies.length; i++) {
        const dx = player.x - allEnemies[i].x;
        const dy = player.y - allEnemies[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // When collision:
        if (distance < 40) {
          player.reset();       // Bring back the player to the initial position
          player.score -= 10;   // Decrease the score by 10
          if (player.score < 0) player.score = 0;   // The score cannot be negative
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
    this.x = 200;           // Initial position of the player
    this.y = 400;
    this.score = 0;         // Initial score
    this.sprite = 'images/char-boy.png';    // The image/sprite for the player
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);    
};

//When the player reaches water:
Player.prototype.update = function() {
    if (this.y < 0){
        player.reset();        //Return the player to the initial position
        this.score += 10;      //Add 10 points to the score
        gem.upload();          //Upload a new gem

        if (player.score >= 200){      // When the player achieves 200 points, finish the game
            swal({
                imageUrl: 'images/winning.png',
                imageWidth: 300,
                imageHeight: 200,
                imageAlt: 'Winning',
                title: "Congratulations! You won!",
                type: "success",
                confirmButtonText: "Play again!",
            // When the button is clicked to Play again, the game is restarted   
            }).then((result) => {
                document.location.href="";
            });
        };
    };

    // Place the number of points exactly in the middle of the star:
    if (this.score === 0) {                             // When the score is 0,
        Player.prototype.currentScore = function () {
            ctx.font="18px arial";
            ctx.fillText(this.score, 40, 105);          // the initial coordinates of the score
        };
     } else if (this.score >= 10 && this.score <100) {  // When the score has 2 digits,
        Player.prototype.currentScore = function () {
            ctx.fillText(this.score, 35, 105);          // move the y coordinate to the left.
        };
    } else if (this.score >= 100) {                     // When the score has 3 digits
        Player.prototype.currentScore = function () {
            ctx.fillText(this.score, 30, 105);
        };
    };
};

// Move the player to the left, right, up, down using the arrow keys:
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

// The gem possible to collect by the player to obtain extra points
const Gem = function () {
   /* let x = [0, 100, 200, 300, 400];                    //Gem appears randomly on the 3 rows of the paved blocks
    this.x = x[Math.floor(Math.random() * x.length)];   //The x and y coordinates must be able to match the ones of the player 
    let y = [60, 145, 230];
    this.y = y[Math.floor(Math.random() * y.length)];   */
    this.sprite = 'images/Gem Blue.png';                // The sprite/image of the gem
}

// Draw the gem on the screen
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);    
};

//When the player reaches the gem, add 30 points to the score and remove the star off the canvas
Gem.prototype.update = function() {
    const dx = player.x - gem.x;
    const dy = player.y - gem.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) {   
        player.score += 30;
        this.x = -100;
        this.y = -100; 
    };

    if (distance === 0 && player.score >= 200) {   // When the player achieves at least 200 points, finish the game
        swal({
            imageUrl: 'images/winning.png',
            imageWidth: 300,
            imageHeight: 200,
            imageAlt: 'Winning',
            title: "Congratulations! You won!",
            type: "success",
            confirmButtonText: "Play again!",
        //When the button is clicked to Play again, the game is restarted   
        }).then((result) => {
            document.location.href="";
        });
    };
};

//Function to upload the gem in a random place on the paved blocks 
Gem.prototype.upload = function() {
    let x = [0, 100, 200, 300, 400];
    this.x = x[Math.floor(Math.random() * x.length)]; 
    let y = [60, 145, 230];
    this.y = y[Math.floor(Math.random() * y.length)];
};

// Instantiate the gem by placing it in a variable called 'gem'
let gem = new Gem;
console.log(gem);
