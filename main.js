var config = {
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    backgroundColor: '#2f2f2f',
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
            //gravity: { y: 300 }
            // Top down game, so no gravity is needed
            gravity: { y: 0 }
        }
    },
    scene:[MainMenuScene,MainGameScene]
};


// create game object from the config object
var game = new Phaser.Game(config);