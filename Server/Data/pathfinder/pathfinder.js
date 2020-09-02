const grides  = require('../gride/grid');

module.exports.run = (inicio, destino) => {

    var {gride} = grides.createGrid();
    var listaAberta = [];
    var listaFechada = [];
    var vizinhoDireita, vizinhoEsquerda, vizinhoCima, vizinhoBaixo;

    destino = findCasaByNumber(destino, gride);
    inicio = findCasaByNumber(inicio, gride);

    // Adicionando inicio a lista aberta
    var casa = inicio;
    listaAberta.push(casa);
    
    while(1){

        if(casa.number == destino.number){
            listaFechada.push(casa);
            break;
        }

        // Descobrindo vizinhos 
        if(casa.x < 9){
            vizinhoDireita = findCasaByCoord(casa.x+1, casa.y, gride);
        }else{
            vizinhoDireita = null;
        }

        if(casa.x > 0){
            vizinhoEsquerda = findCasaByCoord(casa.x-1, casa.y, gride);
        } else{
            vizinhoEsquerda = null;
        }

        if(casa.y > 0){
            vizinhoCima = findCasaByCoord(casa.x, casa.y - 1, gride);
        }else{
            vizinhoCima = null;
        }

        if(casa.y < 9){
            vizinhoBaixo = findCasaByCoord(casa.x, casa.y +1, gride);
        }else{
            vizinhoBaixo = null;
        }

        // Setando o pai dos vizinhos e calculando seus custo
        if(vizinhoDireita != null && notWorkYet(vizinhoDireita, listaAberta, listaFechada)){
            vizinhoDireita.setFather(casa.number);
            findCustoH(vizinhoDireita, destino);
            findCustoG(vizinhoDireita, inicio);
            findCustoF(vizinhoDireita);
            listaAberta.push(vizinhoDireita);
        }
        if(vizinhoEsquerda != null && notWorkYet(vizinhoEsquerda, listaAberta, listaFechada)){
            vizinhoEsquerda.setFather(casa.number);
            findCustoH(vizinhoEsquerda, destino);
            findCustoG(vizinhoEsquerda, inicio);
            findCustoF(vizinhoEsquerda);
            listaAberta.push(vizinhoEsquerda);
        }
        if(vizinhoCima != null && notWorkYet(vizinhoCima, listaAberta, listaFechada)){
            vizinhoCima.setFather(casa.number);
            findCustoH(vizinhoCima, destino);
            findCustoG(vizinhoCima, inicio);
            findCustoF(vizinhoCima);
            listaAberta.push(vizinhoCima);
        }
        if(vizinhoBaixo != null && notWorkYet(vizinhoBaixo, listaAberta, listaFechada)){
            vizinhoBaixo.setFather(casa.number);
            findCustoH(vizinhoBaixo, destino);
            findCustoG(vizinhoBaixo, inicio);
            findCustoF(vizinhoBaixo);
            listaAberta.push(vizinhoBaixo);
        }
        //console.log(vizinhoDireita, vizinhoEsquerda, vizinhoCima, vizinhoBaixo);
        
        // Adicionando a casa verificada a lista fechada
        listaFechada.push(casa);

        // Removendo a casa verificada da lista aberta
        listaAberta.forEach(element =>{
            if(element.number == casa.number){
                listaAberta.splice(listaAberta.indexOf(element), 1);
            }
        })
        
        
        listaAberta.sort(ordenarPorCusto);      // Ordenando a lista aberta de acordo com o menor custo
        
        if(listaAberta[0] != null){
            casa = listaAberta[0];                  // Pegando a casa com menor custo 
        } else {
            break;
        }
        
    }

 
   
    let fim = []

    listaFechada.reverse();
    fim.push(listaFechada[0].number);
    let lista = listaFechada[0];
    while(lista.father != null){
        fim.push(lista.father);
        lista = findCasaByNumber(lista.father, gride);
    }
    return fim;
    
}

function findCasaByNumber(number, gride){
    for(let i=0; i<gride.length; i++){
        if(gride[i].number == number){
            return gride[i];
        }
    }
}

function findCasaByCoord(x, y, gride){
    for(let i=0; i<gride.length; i++){

        // Procura a casa de acordo com as coordenadas se não for um obstaculo.
        if((gride[i].x == x && gride[i].y == y) && !gride[i].getIsObstacle() ){
            return gride[i];
        }
    }
    return null;
}

// O custo H é referente ao custo em relação ao destino
function findCustoH(casa, destino){
    let custoX, custoY, custoTotal;

    custoX = Math.abs(casa.x - destino.x); // 1-5 = 4
    custoY = Math.abs(casa.y - destino.y); // 5 - 9 = 4
    custoTotal = custoX + custoY;
    casa.setH(custoTotal);
}

// O custo G é referente ao custo em relação ao inicio
function findCustoG(casa, destino){
    let custoX, custoY, custoTotal;

    custoX = Math.abs(casa.x - destino.x); // 1-5 = 4
    custoY = Math.abs(casa.y - destino.y); // 5 - 9 = 4
    custoTotal = custoX + custoY;
    casa.setG(custoTotal);
}

// O custo F é referente ao custo total => F= G + H
function findCustoF(casa){
    casa.setF(casa.getG() + casa.getH());
}

function ordenarPorCusto(a, b){
    return a.getF() - b.getF();
}


function notWorkYet(casa, listaAberta, listaFechada){
    
    let existInListaAberta = listaAberta.indexOf(casa);
    let existInListaFechada = listaFechada.indexOf(casa);

    if(existInListaAberta == -1 && existInListaFechada == -1){
        return true;
    }
    return false;
}