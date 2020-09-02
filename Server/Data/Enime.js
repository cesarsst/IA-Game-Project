const pathfinder = require('../Data/pathfinder/pathfinder');
const grides  = require('./gride/grid');
class Enime{

    constructor(x, y){
        this.x = x;
        this.y = y;
        this.state =0;
        this.lista;
        this.atualCasa;
        this.inPath;
        this.statePath=0;
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    getState(){
        return this.state;
    }


    update(world){

        this.findState(world);
        let state = this.getState();
        if(state == 0){
            this.patrulhar();
        } else if(state == 1){
            // Pathfinder A*
            console.log("Seguindo...")
            this.seguir(world);
        } else if(state == 2){
            // Atacar
            console.log("Atacar...")
        }

    }
    
    patrulhar(){

        // Se for zero, pega novo alvo
        if(this.statePath == 0){
            let inicio = this.getAtualCasa();
            let destino = this.getRandomCasa(0,9);
            this.lista =  pathfinder.run(inicio.number,destino);
            //console.log(this.lista);
            this.statePath = 1;
        }else if(this.statePath = 1){
            let casaTarject = this.lista.pop();
            let {x, y} = this.getPositionByCasaNumber(casaTarject)
            this.setPosition(x, y);
            if(this.lista.length == 0){
                this.statePath = 0;
            }
        }
    
    
    }

    getAtualCasa(){
        let {gride} = grides.createGrid();
        let x = (this.getX()-50)/100;
        let y = (this.getY()-50)/100;
        
        for(let i=0; i<gride.length; i++){
            if(gride[i].x == x && gride[i].y == y){
                return gride[i];
            }
        }
    }

    getPositionByCasaNumber(number){
        let {gride} = grides.createGrid();
        for(let i=0; i<gride.length; i++){
            if(gride[i].number == number){
                let x = (gride[i].x*100)+50;
                let y = (gride[i].y*100)+50;
                return {x, y};
            }
        }
    }
  
    getRandomCasa(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        let x = Math.floor(Math.random() * (max - min )) + min;
        let y = Math.floor(Math.random() * (max - min )) + min;
        let {gride} = grides.createGrid();
        for(let i=0; i<gride.length; i++){
            if((gride[i].x == x && gride[i].y == y) && !gride[i].getIsObstacle()){
                return gride[i].number;
            }
        }

    }

    findCasaByCoord(x, y){
        let {gride} = grides.createGrid();
        for(let i=0; i<gride.length; i++){
            // Procura a casa de acordo com as coordenadas se não for um obstaculo.
            if(gride[i].x == x && gride[i].y == y){
                return gride[i];
            }
        }
    }

    findState(world){
        let player = world.player;
        let playerX = (player.x-50)/100;
        let playerY = (player.y-50)/100;
        let enimeX = (this.getX()-50)/100;
        let enimeY = (this.getY()-50)/100;

        let casaPlayer = this.findCasaByCoord(playerX, playerY);
        let casaEnime = this.findCasaByCoord(enimeX, enimeY);

        let distanciaX = Math.abs(casaPlayer.x - casaEnime.x);
        let distanciaY = Math.abs(casaPlayer.y - casaEnime.y);
        
        console.log(distanciaX, distanciaY);

        if(distanciaX <= 1 && distanciaY <=1){  // Atacar
            this.state = 2; 
        }else if(distanciaX <=2 && distanciaY <=2){  // Seguir
            this.state = 1;
        } else{
            this.state = 0;                     // Patrulhar
        }

    }

    seguir(world){

        let player = world.player;
        let playerX = (player.x-50)/100;
        let playerY = (player.y-50)/100;
        let destino = this.findCasaByCoord(playerX, playerY);
        // Se for zero, pega novo alvo
        if(this.statePath == 0){
            let inicio = this.getAtualCasa();
            this.lista =  pathfinder.run(inicio.number,destino.number);
            this.statePath = 1;
        }else if(this.statePath = 1){
            let casaTarject = this.lista.pop();
            let {x, y} = this.getPositionByCasaNumber(casaTarject)
            this.setPosition(x, y);
            if(this.lista.length == 0){
                this.statePath = 0;
            }
        }
    }


}

module.exports = Enime;