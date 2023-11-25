/* 
 *                      Snake Object
 * The snake class contains the following properties:
 * - this.x : int = The x position of the snake's head
 * - this.y : int = The y position of the snake's head
 * 
 * - this.xspeed : int = The speed of the snake's head in the x direction
 * - this.yspeed : int = The speed of the snake's head in the y direction
 * 
 * - this.total : int = The number of food items the snake has eaten
 * - this.tail : array = An array of vectors that stores the position of the snake's tail
 * 
 * The snake class contains the following functions:
 * - this.update() : void = Continuously updates the position of the snake's head and tail throughout the game.
 * - this.show() : void = Draws the snake's head and tail on the canvas
 * - this.direction(x, y) : void = Changes the direction of the snake's head
 * - this.death() : void = Checks if the snake has hit itself or the edge of the canvas
 * 
 * While the app is open, there is always an instance of the snake object (provided the snake hasn't died).
 * The snake object is created in the sketch.js file.
 * The snake object interacts with the food class in the food.js file for verious functions.
*/

class Snake {
    //Creates the snake object
    constructor() {
        this.x = 300;
        this.y = 300;

        this.xspeed = 1;
        this.yspeed = 0;
        this.difficulty = 1;

        this.total = 0;
        this.tail = [];
    }


    //#region update() : void
    //Continuously updates the position of the snake's head and tail throughout the game.
    //Calls the death() function to check if the snake has hit itself or the edge of the canvas
    update = () => {
        //#region Tail Update
        for (var i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }
        this.tail[this.total - 1] = createVector(this.x, this.y);
        //#endregion

        //When at level 10, i need scale to feel 2x as fast
        //level 0: this.x = 100 + 1*20
        //Level 1: 1.1
        //Level 2: 1.2
        //Level 3: 1.3
        //level 10: this.x = 100 + 2*20
        //

        //Updates the position of the snake's head
        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;

        // If the snake hits itself or the edge of the canvas, the game will end
        this.death();
    };
    //#endregion

    //#region show() : void
    //Function that draws the snake on the canvas
    show = () => {
        //color
        fill(50, 168, 82);

        //Tail
        for (var i = 0; i < this.total; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }

        //Head
        rect(this.x, this.y, scl, scl);
    };
    //#endregion

    //#region direction(x : int, y : int) : void
    //Function that changes the direction of the snake based on the arrow keys pressed
    direction = (x, y) => {
        //Prevents the snake from going backwards
        if (this.xspeed === -x || this.yspeed === -y) {
            return;
        }
        this.xspeed = x;
        this.yspeed = y;
    };
    //#endregion

    //#region death() : void
    //Function that ends the game if the snake has made contact with itself or the edge of the canvas.
    //  ! This function doesn't seem to work is the snake is 2 squares long. It functions if the snake is 3+, though.
    death = () => {
        // Snake hits the edge of the canvas
        if (this.x < 0 || this.x === width || this.y < 0 || this.y === height) {
            console.log("Game Over");
            noLoop();
        }

        // Snake hits itself
        for (var i = 0; i < this.tail.length; i++) {
            if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                console.log("Game Over");
                noLoop();
            }
        }
    };
    //#endregion
}
