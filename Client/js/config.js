var config = {
    type: Phaser.AUTO,
    backgroundColor: '#ffff',
    scale: {
        parent: 'phaser-example',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1000,
        height: 1000
    },
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0},
            debug: false,
            enableBody: true,
        }
    },
    scene: [preload, gameStart]

};

var game = new Phaser.Game(config);