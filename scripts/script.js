window.onload = function () {
    const startButton = document.getElementById("start-btn");
    const restartButton = document.getElementById("restart-btn");

    let myGame;
    startButton.addEventListener("click", function () {
        startGame();
    });

    document.addEventListener('keydown', (event) => {
        switch (true) {
            case (event.code === 'ArrowRight'):
                myGame.player.directionX = 7;
                break;
            case (event.code === 'ArrowLeft'):
                myGame.player.directionX = -7;
                break;
            case (event.code === 'ArrowUp' && myGame.player.bottom === 150):
                // myGame.player.directionY = 50;
                myGame.player.jump();
                break;

        }

    });

    document.addEventListener('keyup', (event) => {
        myGame.player.directionX = 0;
        //myGame.player.directionY = 0;
    });

    function startGame() {
        myGame = new Game();
        myGame.start();
    }
};