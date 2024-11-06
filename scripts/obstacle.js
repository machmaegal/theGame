class Obstacle {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.positions = [300, 300, 300];
        this.randomIndex = Math.floor(Math.random() * this.positions.length);

        this.bottom = this.positions[this.randomIndex];
        //this.bottom = 150;
        this.right = 300;
        this.width = 300;
        this.height = 30;

        this.element = document.createElement('img');
        this.element.src = '../assets/background/lightning_floor.png';

        this.element.style.position = 'absolute';
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.bottom = `${this.bottom}px`;
        this.element.style.right = `${this.right}px`;

        this.gameScreen.appendChild(this.element);
    }

    move() {
        /* this.right += 7;
        this.updatePostition(); */
    }

    updatePostition() {
        //this.element.style.right = `${this.right}px`;
    }
}