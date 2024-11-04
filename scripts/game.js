class Game {
    constructor() {
        //create scene
        this.startScreen = document.querySelector('#start-menu');
        this.gameScreen = document.querySelector('#game-screen');
        this.endScreen = document.querySelector('#game-over-menu');
        this.hpBar = document.querySelector('#hp-bar');
        this.height = window.innerHeight;
        this.width = window.innerWidth;
        //create player
        this.player = new Player(150, 0, '../assets/sprites/notSaitama/notSaitama_move_1noBG.png');
        //create mobs
        this.obstacles = [new Obstacle(this.gameScreen)];

        this.isGameOver = false;
        this.gameIntervalId = null;
        this.gameLoopFrequency = Math.round(1000 / 60); //60 FPS
        this.frames = 0;
    }

    start() {
        this.startScreen.style.display = 'none';
        this.gameScreen.style.display = 'block'; //flex


        this.gameIntervalId = setInterval(() => {
            this.gameLoop();
        }, this.gameLoopFrequency);

    }

    gameLoop() {
        this.frames++;
        this.update();

        if (this.isGameOver) clearInterval(this.gameIntervalId);

        if (this.frames % 90 === 0) this.obstacles.push(new Obstacle(this.gameScreen));
    }

    update() {
        this.player.move();
        this.obstacles.forEach((anObstacle, anObstacleIndex) => {
            anObstacle.move();
            const solidHit = this.player.didCollide(anObstacle);

            if (solidHit /*and not in kick animation */) {
                console.log(('ouch'));

                this.obstacles.splice(anObstacleIndex, 1);
                anObstacle.element.remove();
            }

            if (anObstacle.right > this.width) {
                this.obstacles.splice(anObstacleIndex, 1);
                anObstacle.element.remove();
            }
        });
    }
}