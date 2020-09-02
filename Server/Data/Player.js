const grides  = require('./gride/grid');

class Player{

    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
    }

    getCommand(command){
        let x;
        let y;
        
        if(command == 2){                  // Down      
            this.downMove();
        } else if(command == 6) {       // Right
            this.rightMove();
        }else if(command == 8){          // Up
            this.upMove();
        } else if(command == 4){        // Left
            this.leftMove();
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
    
    downMove(){
        let casaAtual = this.getAtualCasa();
        
        if(casaAtual.y >= 0 & casaAtual.y <9){
            let tarjectCasa = this.getCasaByNumber(casaAtual.number + 10);
            if(!tarjectCasa.getIsObstacle()){
                let {x, y} = this.getPositionByCasaNumber(tarjectCasa.number);
                this.setPosition(x, y);
            }
        }

    }

    upMove(){
        let casaAtual = this.getAtualCasa();
        
        if(casaAtual.y > 0 & casaAtual.y <= 9){
            let tarjectCasa = this.getCasaByNumber(casaAtual.number - 10);
            if(!tarjectCasa.getIsObstacle()){
                let {x, y} = this.getPositionByCasaNumber(tarjectCasa.number);
                this.setPosition(x, y);
            }
        }

    }

    leftMove(){
        let casaAtual = this.getAtualCasa();
        
        if(casaAtual.x > 0 & casaAtual.y <=9){
            let tarjectCasa = this.getCasaByNumber(casaAtual.number - 1);
            if(!tarjectCasa.getIsObstacle()){
                let {x, y} = this.getPositionByCasaNumber(tarjectCasa.number);
                this.setPosition(x, y);
            }
        }

    }

    rightMove(){
        let casaAtual = this.getAtualCasa();
        
        if(casaAtual.x >= 0 & casaAtual.x <9){
            let tarjectCasa = this.getCasaByNumber(casaAtual.number + 1);
            if(!tarjectCasa.getIsObstacle()){
                let {x, y} = this.getPositionByCasaNumber(tarjectCasa.number);
                this.setPosition(x, y);
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

    getCasaByNumber(number){
        let {gride} = grides.createGrid();
        for(let i=0; i<gride.length; i++){
            if(gride[i].number == number){
                return gride[i];
            }
        }
    }

}

module.exports = Player;