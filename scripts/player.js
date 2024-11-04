class Player {
    constructor() {
        this.gameScreen = document.querySelector('#game-screen');

        this.bottom = 150;
        this.left = 0;
        this.width = 155;     //try vw 
        this.height = 200;   //try vh
        this.directionX = 0;
        this.directionY = 0;
        this.jumpIntervalId = null;
        this.fallIntervalId = null;
        this.hp = 100;
        this.points = 0;
        this.didKick = false;

        this.element = document.createElement('img');
        this.element.src = '../assets/sprites/notSaitama/notSaitama_move_1noBG.png';
        this.element.style.position = 'absolute';
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.bottom = `${this.bottom}px`;
        this.element.style.left = `${this.left}px`;

        this.gameScreen.appendChild(this.element);
    }

    move() {
        this.left += this.directionX;
        this.bottom += this.directionY;

        if (this.left < 0) this.left = 7;
        if (this.bottom < 150) this.bottom = 150;

        this.updatePosition();
    }

    jump() {
        clearInterval(this.fallIntervalId);
        this.jumpIntervalId = setInterval(() => {
            this.bottom += 30;
            if (this.bottom >= 450) this.fall();

            this.updatePosition;
        }, 30);
    }

    fall() {
        clearInterval(this.jumpIntervalId);
        this.fallIntervalId = setInterval(() => {
            this.bottom -= 40;

            this.updatePosition;
        }, 30);

    }

    kick() {
        setTimeout(() => {
            this.element.src = '../assets/sprites/notSaitama/notSaitama_move_1noBG.png';
            this.didKick = false;
        }, 300);
        this.didKick = true;
        this.element.src = '../assets/sprites/notSaitama/notSaitama_attack_noBG.png';
    }

    updatePosition() {
        this.element.style.left = ` ${this.left}px`;
        this.element.style.bottom = ` ${this.bottom}px`;
    }

    didCollide(obstacle) {
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();

        if (
            playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top
        ) {
            return true;

        } else {
            return false;
        }
    }
}