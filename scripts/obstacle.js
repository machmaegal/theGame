class Obstacle {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.positions = [150, 250, 350];
        this.randomIndex = Math.floor(Math.random() * this.positions.length);

        this.bottom = this.positions[this.randomIndex];
        //this.bottom = 150;
        this.right = 0;
        this.width = 100;
        this.height = 100;

        this.element = document.createElement('img');
        this.element.src = '../assets/sprites/chickin/chicken_move1_noBG.png';
        //this.element.src = '../assets/sprites/ghosts/ghost_move_1.png';
        this.element.style.position = 'absolute';
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.bottom = `${this.bottom}px`;
        this.element.style.right = `${this.right}px`;

        this.gameScreen.appendChild(this.element);
    }
    move() {
        this.right += 10;
        this.updatePostition();
    }

    updatePostition() {
        this.element.style.right = `${this.right}px`;
    }
}



