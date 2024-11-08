class Game {
    constructor() {
        this.startScreen = document.querySelector('#start-menu');
        this.gameScreen = document.querySelector('#game-screen');
        this.endScreen = document.querySelector('#game-over-menu');
        this.scoreDisplay = document.querySelector('#player-score');
        this.hpBar = document.querySelector('#hp-bar');
        this.floor = document.createElement('img');
        this.floor.src = 'assets/background/lightning_floor.png';
        this.floor.classList.add('floor');
        this.height = window.innerHeight;
        this.width = window.innerWidth;

        this.player = new Player();
        this.npcs = [new Npc(this.gameScreen)];

        //sounds
        this.theme = new Audio('assets/fx/midnight-ride-01a.mp3');
        //this.outro = new Audio('assets/fx/destination-01.mp3');
        this.npcOnDeath = new Audio('assets/fx/bone-crack-1.mp3');
        this.playerOnHit = new Audio('assets/fx/man-scream-ahh-01.mp3');
        this.playerOnKick = new Audio('.assets/fx/whip-whoosh-01.mp3');
        this.playerOnDeath = new Audio('assets/fx/man-laughing-04.mp3');
        this.isGameOver = false;
        this.gameIntervalId = null;
        this.gameLoopFrequency = Math.round(1000 / 60); //60 FPS
        this.frames = 0;

        this.gameScreen.appendChild(this.floor);
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
        this.scoreDisplay.innerText = `#${this.player.score}`;
    }

    restart() {
        this.playerOnDeath.pause();
        this.playerOnDeath.currentTime = 0;
        this.endScreen.style.display = 'none';
        this.startScreen.style.display = 'flex';
    }

    gameLoop() {
        this.frames++;
        this.update();

        if (this.frames % 90 === 0) this.npcs.push(new Npc(this.gameScreen));
    }

    update() {
        this.player.move();
        //collision handling for npc
        this.npcs.forEach((npc, npcIndex) => {
            npc.move();
            const solidHit = this.player.didCollide(npc);
            const kicked = this.player.didKick;
            switch (true) {
                case (solidHit && kicked):
                    this.npcOnDeath.play();
                    this.player.score += 25;
                    this.npcs.splice(npcIndex, 1);
                    npc.element.remove();
                    break;
                case (solidHit):
                    this.playerOnHit.play();
                    this.player.hp -= 10;
                    this.player.hpBar.style.opacity -= 0.33;
                    this.npcs.splice(npcIndex, 1);
                    npc.element.remove();
                    break;
            }
            //remove npc that pass left screen boundary
            if (npc.right > this.width) {
                this.npcs.splice(npcIndex, 1);
                npc.element.remove();
            }

            if (this.player.hp <= 0) {
                this.playerOnDeath.play();
                this.player.element.src = 'assets/sprites/trolls/trolololface_noBG.png';
                setTimeout(() => {
                    this.theme.pause();
                    this.theme.currentTime = 0;
                    this.end();
                }, 1000);
            }
        });
    }
}