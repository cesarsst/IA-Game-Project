const Events = require('./Events/GameEvents');
const Enime = require('./Data/Enime');
const Player = require('./Data/Player');
const Gride = require('./Data/gride/grid');
class Game {

    constructor(server){

        this.io = require('socket.io')(server);

        // SETANDO EVENTOS QUE SERAM RECEBIDO DOS PLAYERS
        this.io.on('connection', async (socket) => {

            Events(this, socket);

        })
        this.player = new Player(50, 50);
        this.enime = new Enime(750, 50);
        this.controlCommand = 0;
    }


    startGame(socket){

        let obstacle = Gride.createGrid()
        socket.emit('setObstacles', {Obstacles: obstacle.obstacle});


        socket.on("command", (data)=>{

            if(this.controlCommand == 0){
                this.player.getCommand(data.tecla);
            }
            this.controlCommand = 1;
        
        })

        
        setInterval(()=>{

            this.controlCommand = 0;
            this.enime.update(this);

            socket.emit("GameData", {
                enimePosition: {x:this.enime.getX(), y:this.enime.getY()},
                playerPosition: {x: this.player.getX(), y:this.player.getY()}
            });
        }, 500);
     
    
       
    
        
    }


}

module.exports = Game;