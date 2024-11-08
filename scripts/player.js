class Player {
    constructor() {
        this.gameScreen = document.querySelector('#game-screen');
        this.jumpIntervalId = null;
        this.fallIntervalId = null;
        this.hp = 30;
        this.score = 0;
        this.didKick = false;
        this.didJump = true;
        //toon
        this.bottom = 150;
        this.left = 0;
        this.width = 155;     //try vw 
        this.height = 200;   //try vh
        this.directionX = 0;
        this.directionY = 0;
        this.element = document.createElement('img');
        this.element.src = 'assets/sprites/notSaitama/notSaitama_move_1noBG.png';
        this.element.style.position = 'absolute';
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.bottom = `${this.bottom}px`;
        this.element.style.left = `${this.left}px`;
        //hp bar
        this.hpBar = document.createElement('img');
        this.hpBar.src = 'assets/ui/hp_ball.png';
        this.opacity = 1;
        this.hpBar.classList.add('hp-bar');
        this.hpBar.style.opacity = `${this.opacity}`;
        //display elements
        this.gameScreen.appendChild(this.element);
        this.gameScreen.appendChild(this.hpBar);
    }

    move() {
        this.left += this.directionX;
        this.bottom += this.directionY;

        if (this.left < 0) this.left = 7;
        if (this.bottom < 150) this.bottom = 150;
        if (this.left >= Math.floor(window.innerWidth) - 155) this.left = 0;
        this.updatePosition();
    }

    jump() {
        this.didJump = false;
        this.jumpIntervalId = setInterval(() => {
            this.bottom += 30;

            if (this.bottom >= 450) {
                clearInterval(this.jumpIntervalId);
                this.fallIntervalId = setInterval(() => {
                    this.bottom -= 40;

                    if (this.bottom <= 150) {
                        clearInterval(this.fallIntervalId);
                        this.didJump = true;
                    };
                }, 30);
            };
        }, 30);
    }

    kick() {
        setTimeout(() => {
            this.element.src = 'assets/sprites/notSaitama/notSaitama_move_1noBG.png';
            this.didKick = false;
        }, 200);
        this.didKick = true;
        this.element.src = 'assets/sprites/notSaitama/notSaitama_attack_noBG.png';
    }

    updatePosition() {
        this.element.style.left = ` ${this.left}px`;
        this.element.style.bottom = ` ${this.bottom}px`;
    }

    didCollide(npc) {
        const playerRect = this.element.getBoundingClientRect();
        const npcRect = npc.element.getBoundingClientRect();

        if (
            playerRect.left < npcRect.right &&
            playerRect.right > npcRect.left &&
            playerRect.top < npcRect.bottom &&
            playerRect.bottom > npcRect.top
        ) {
            return true;

        } else {
            return false;
        }
    }
}