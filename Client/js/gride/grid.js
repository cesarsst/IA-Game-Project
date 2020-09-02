const Casa = require('./casa');

var gride = [];
var obstacle = [
    {x:4, y:9},
    {x:5, y:8},

]

let number  = 0;
for(let i=0; i<10; i++){
    for(let j=0; j<10; j++){
        
        let instance = new Casa(j,i, number);
        number++;

        for(let k=0; k<obstacle.length;k++){
            if(instance.x == obstacle[k].x && instance.y == obstacle[k].y){
                instance.setObstacle();
            }
        }
        gride.push(instance);
    }
}

module.exports= {gride, obstacle};



  



