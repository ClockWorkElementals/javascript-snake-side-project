var snake = new Snake();

var foods = new Array(3);
var scl = 20;

var columns;
var rows;
var canvasMultiplier = 30;

var level = 1;
var score = 0;

// Creates the canvas for the Snake game
setup = () => {
  createCanvas((scl * canvasMultiplier), (scl * canvasMultiplier));

  columns = Math.floor(width / scl);
  rows = Math.floor(height / scl);

  for (var i = 0; i < foods.length; i++) {
    foods[i] = new Food();
  }

  frameRate(10);
}



// Draws the background for the Snake game
draw = () => {
  background(29, 40, 89);

  //Draws the grid
  for (var i = 0; i < width; i += scl) {
    for (var j = 0; j < height; j += scl) {
      stroke(0);
      noFill();
      rect(i, j, scl, scl);
    }
  }

  overlap();
  snake.show();
  //for each instance of food, show it
  for (var i = 0; i < foods.length; i++) {
    foods[i].show();
  }
}

// updates the snake's speed and position
keyPressed = () => {
  if (keyCode === UP_ARROW || keyCode === 87) {
    snake.direction(0, -1);
  } else if (keyCode === DOWN_ARROW || keyCode === 83) {
    snake.direction(0, 1);
  } else if (keyCode === LEFT_ARROW || keyCode === 65) {
    snake.direction(-1, 0);
  } else if (keyCode === RIGHT_ARROW || keyCode === 68) {
    snake.direction(1, 0);
  }
}

//Checks if the snake and food are overlapping
//If they are, the food will be placed in a new random location
//If they are not, the snake will continue to move
overlap = () => {
  var snakeXStart = snake.x;
  var snakeXEnd = snake.x + scl;
  var snakeYStart = snake.y;
  var snakeYEnd = snake.y + scl;


  //If any part of the snake is overlapping with the food, the food will be placed in a new random location
  for (var i = 0; i < foods.length; i++) {
    if (snakeXStart <= foods[i].x && foods[i].x <= snakeXEnd && snakeYStart <= foods[i].y && foods[i].y <= snakeYEnd) {
      snake.total++;
      this.score += (foods[i].points * level)
      foods[i] = new Food();
      console.log("Snake Total: " + snake.total);
      console.log("Score: " + score);

      //when 5 food items are eaten, the snake's speed will increase
      if (snake.total % 5 == 0) {
        console.log("Snake Speed Increased");
        frameRate(frameRate() + 1);
        level++;
      }
    }
    foods[i].respawn();
  }
  snake.update();
}


