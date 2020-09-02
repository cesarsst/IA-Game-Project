const app = require('./server');
const port =3000;

const Game = require('./Server/Game');

// Configurações do servidor
const server = app.listen(port, ()=>{
    console.log('Servidor online na porta: ' + port);
})

const GameInstance = new Game(server);


