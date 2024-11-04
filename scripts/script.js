window.onload = function () {
    const startButton = document.querySelector("#start-btn");
    const restartButton = document.querySelector("#restart-btn");

    let myGame;
    startButton.addEventListener("click", () => {
        startGame();
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
            case (event.code === 'ArrowUp' || event.code === 'KeyW' && myGame.player.bottom === 150):
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
        //myGame.player.directionX = 0;
        //myGame.player.directionY = 0;
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