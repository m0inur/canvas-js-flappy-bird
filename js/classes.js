addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class Object {
    constructor(x, y, vx, width, height, type, img) {
        this.x = x;
        this.y = y;

        this.vx = vx;

        this.width = width;
        this.height = height;

        this.type = type;
        this.img = img;
    }

    move() {
        this.x -= this.vx
    }

    draw() {
        if (this.type == "flappy") {
            frameCount++;

            if (frameCount >= 10 == 0) {
                this.graphics = bird_1_img;
            } else if (frameCount >= 20 == 1) {
                this.graphics = bird_2_img;
            } else if (frameCount >= 30 == 1) {
                this.graphics = bird_3_img;
            }

            if (frameCount == 30) {
                frameCount = 0
            }

            c.drawImage(this.graphics, this.x, this.y, this.width, this.height);
        } else {
            c.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
}

// Bird
class Bird extends Object {
    constructor(x, y, vx, vy, gravity, width, height) {
        super(x, y, vx, width, height, "flappy", null);

        this.vy = vy;
        this.gravity = gravity;
        this.graphics;
    }

    move() {
        // Apply Gravity
        this.y += this.gravity

        // Make bird jump
        if (jump) {
            this.y -= this.vy
            jumpCounter++;

            if (jumpCounter % 20 == 0) {
                jump = false;
            }
        }

        // If it hits floor then game restarts
        if (this.y >= canvas.height + 20) {
            console.log("Ground 0")
            isDead = true;
            restart();
        }
    }
}

// Pipes
class Pipes extends Object {
    constructor(x, y, vx, width, height, img) {
        super(x, y, vx, width, height, null, img);
    }
}

// Coins
class Coin extends Object {
    constructor(x, y, vx, width, height) {
        super(x, y, vx, width, height, null, coin_img);
    }
}