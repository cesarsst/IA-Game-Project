module.exports = (ServerGame, socket) => {

    // Quando um novo jogo é iniciado 
    socket.on('newGame', async (data)=>{
        ServerGame.startGame(socket)
    });

   



}


//let pathFind = pathfinder.run(95, 51, gride);
//console.log(pathFind);

