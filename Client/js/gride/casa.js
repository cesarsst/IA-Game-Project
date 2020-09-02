class Casa{

    constructor(x, y, number){
        this.number = number;
        this.x = x;
        this.y = y;
        this.father = null;
        this.f = null;
        this.g = null;
        this.h = null;
        this.isObstacle = false;
    }


    getNumber(){
        return this.number;
    }

    getX(){
        return this.x;
    }

    getY(valor){
        return this.y;
    }

    setFather(father){
        this.father = father;
    }

    getFather(){
        return this.father;
    }

    setF(valor){
        this.f = valor;
    }

    getF(){
        return this.f;
    }

    setG(valor){
        this.g = valor;
    }

    getG(){
        return this.g;
    }

    setH(valor){
        this.h = valor;
    }

    getH(){
        return this.h;
    }

    setObstacle(){
        this.isObstacle = true;
    }

    getIsObstacle(){
        return this.isObstacle ? true : false;
    }

}

module.exports = Casa;