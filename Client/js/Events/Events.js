/*
    CLIENT SIDE
*/ 
var socket  = io();


function Events(self){


    socket.emit('newGame');
   
    socket.on('setObstacles', (data)=>{

        data.Obstacles.forEach(element =>{
            let newObstacle = self.add.sprite(0,0, 'obstacle');
            let container = self.add.container(((element.x*100 )+50), ((element.y*100 )+50));
            container.setSize(100, 100);
            container.add(newObstacle);
            self.Obstacles.add(container);
        });
       
    });

    // Criando o jogo
    socket.on('GameData', (data)=>{

        let enimePosition = data.enimePosition; 
        let playerPosition = data.playerPosition; 
        self.player.setPosition(playerPosition.x,playerPosition.y);
        self.enime.setPosition(enimePosition.x, enimePosition.y);
    }); 


}

