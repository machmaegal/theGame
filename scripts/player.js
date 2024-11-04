class Player {
    constructor(bottom, left, playerImageSrc) {
        this.gameScreen = document.querySelector('#game-screen');

        this.bottom = bottom;
        this.left = left;
        this.width = 155;     //try vw 
        this.height = 200;   //try vh
        this.directionX = 0;
        this.directionY = 0;

        this.element = document.createElement('img');
        this.element.src = playerImageSrc;
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