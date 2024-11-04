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
        this.player = new Player();
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

    end() {
        clearInterval(this.gameIntervalId);
        this.gameScreen.style.display = 'none';
        this.gameScreen.innerHTML = '';
        this.endScreen.style.display = 'flex';
    }

    restart() {
        this.endScreen.style.display = 'none';
        this.startScreen.style.display = 'flex';
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
            let kicked = this.player.didKick;

            switch (true) {
                case (solidHit && kicked):
                    this.player.points += 1;
                    console.log('solid hit ' + this.player.points + ' points');
                    this.obstacles.splice(anObstacleIndex, 1);
                    anObstacle.element.remove();
                    break;

                case (solidHit):
                    this.player.hp -= 10;
                    console.log('ouch! down to ' + this.player.hp + 'hp');
                    this.obstacles.splice(anObstacleIndex, 1);
                    anObstacle.element.remove();
                    break;
            }

            //remove obstacles that pass left screen boundary
            if (anObstacle.right > this.width) {
                this.obstacles.splice(anObstacleIndex, 1);
                anObstacle.element.remove();
            }

            if (this.player.hp <= 0) {
                this.player.element.src = '../assets/sprites/trolls/trolololface_noBG.png';
                setTimeout(() => {
                    this.end();
                }, 1000);
            }
        });
    }
}