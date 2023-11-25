class Food {

    // 130 46 129
    // 170 99 115
    // 57 32 97
    // 159 120 51
    // 180 225 255
    // 171 135 255
    // 255 172 228
    // 72 190 255
    // 67 197 158
    // 61 112 104
    // 195 66 63
    // 140 26 106

    // 249 111 93
    // 97 208 149
    // 9 77 146
    // 100 182 172
    // 79 124 172
    // 211 188 204
    // 138 132 226
    // 9 58 62

    colors = [[130, 46, 129], [170, 99, 115], [57, 32, 97], [159, 120, 51],
    [180, 225, 255], [171, 135, 255], [255, 172, 228], [72, 190, 255],
    [67, 197, 158], [61, 112, 104], [195, 66, 63], [140, 26, 106],
    [249, 111, 93], [97, 208, 149], [9, 77, 146], [100, 182, 172],
    [79, 124, 172], [211, 188, 204], [138, 132, 226], [9, 58, 62]];

    constructor() {

        this.xPositions = new Array(canvasMultiplier);
        this.yPositions = new Array(canvasMultiplier);

        for (var i = 0; i < canvasMultiplier; i++) {
            this.xPositions[i] = i * scl + scl / 2;
            this.yPositions[i] = i * scl + scl / 2;
        }

        this.position();

        this.x = constrain(this.x, 10, width - scl);
        this.y = constrain(this.y, 10, height - scl);

        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];

        //Timer
        this.timer = 0;
        this.timerMax = 100;

        this.points;
        this.itteration = 1;

    }

    //Places the food in a random location. The location should be constrained to the grid, centered in a cell.
    position = () => {

        this.xrand = Math.floor(Math.random(canvasMultiplier) * canvasMultiplier);
        this.yrand = Math.floor(Math.random(canvasMultiplier) * canvasMultiplier);

        this.x = this.xPositions[this.xrand];
        this.y = this.yPositions[this.yrand];
    }

    //If the food is not eaten within 15 seconds, it will be placed in a new random location
    respawn = () => {
        if (this.timer >= this.timerMax) {
            this.position();
            this.timer = 0;
            this.itteration++;
        }
        this.timer++;
    }

    show = () => {
        fill(this.color[0], this.color[1], this.color[2]);
        circle(this.x, this.y, scl);
        this.points = this.timerMax - this.timer;

        if (this.itteration > 1) {
            this.points = 0;
        }
    };

}