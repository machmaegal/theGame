window.onload = function () {
    const startButton = document.querySelector("#start-btn");
    const restartButton = document.querySelector("#restart-btn");
    let jumped = true;

    let myGame;
    startButton.addEventListener("click", () => {
        startGame();
        myGame.theme.loop = true;
        myGame.theme.play();
    });

    restartButton.addEventListener("click", () => {
        restart();
    });

    document.addEventListener('keydown', (event) => {
        switch (true) {
            case (event.code === 'ArrowRight' || event.code === 'KeyD'):
                myGame.player.directionX = 7;
                break;
            case (event.code === 'ArrowLeft' || event.code === 'KeyA'):
                myGame.player.directionX = -7;
                break;
            case (event.code === 'ArrowUp' && myGame.player.didJump === true || event.code === 'KeyW' && myGame.player.didJump === true):
                myGame.player.jump();
                break;
            case (event.code === 'Space'):
                myGame.player.kick();
                break;
        }
    });

    document.addEventListener('keyup', (event) => {
        switch (true) {
            case (event.code === 'ArrowRight' || event.code === 'KeyD'):
                myGame.player.directionX = 0;
                break;
            case (event.code === 'ArrowLeft' || event.code === 'KeyA'):
                myGame.player.directionX = 0;
                break;
        }
    });

    function startGame() {
        myGame = new Game();
        myGame.start();
    }
    function restart() {
        myGame.restart();
        myGame = null;
    }

};