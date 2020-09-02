var preload = class preload extends Phaser.Scene {
    // Carrega os assets do game
    
    constructor ()
    {
        super('preload');
    }
    
    preload(){
        this.load.image('gride', 'assets/gride.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('enime', 'assets/enime.png');
        this.load.image('item', 'assets/item.png');
        this.load.image('obstacle', 'assets/obstacle.png');
    }   

    create(){
        this.add.text(20, 20, "Loading Game...")
        this.scene.start('gameStart');
    }
}