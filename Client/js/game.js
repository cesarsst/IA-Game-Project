var socket  = io();

class gameStart extends Phaser.Scene{

    constructor(){
        super('gameStart');
    }

    create(){
        
        // Criação do mapa
        this.createMap();

        // Cria o player
        this.Player();

        // Cria o inimigo
        this.Enime();

        // Cria os obstaculos
        this.Obstacles = this.add.group();

        this.cursors = this.input.keyboard.createCursorKeys();

        Events(this);
    }

    update(){
        if (this.cursors.left.isDown)
        {
            socket.emit('command', {tecla:4});
        }
        else if (this.cursors.right.isDown)
        {
            socket.emit('command', {tecla:6});
        }
        else if (this.cursors.up.isDown)
        {
            socket.emit('command', {tecla:8});;
        }
        else if (this.cursors.down.isDown)
        {
            socket.emit('command', {tecla:2});;
        }
    }

    // Funções da Scene
    createMap(){
         // Céu

        
         // PROPRIEDADES DO MUNDO
         this.physics.world.setBounds(0, 0, 1000, 1000);
         this.add.image(0,0,'gride').setOrigin(0,0);
        
    }
    
    Player(){
        this.playerSprite = this.add.sprite(0, 0, 'player');
        let container = this.add.container(0, 0);
        container.setSize(100,100);
        container.add(this.playerSprite);

        this.player = container;
    }

    Enime(){
        this.enimeSprite = this.add.sprite(0,0, 'enime');
        let container = this.add.container(0,0);
        container.setSize(100,100);
        container.add(this.enimeSprite);
        this.enime = container;
    }

}
