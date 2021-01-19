
module.exports = function(){

this.query = function(campo1,campo2,campo3,tabela,chave,indice){

    var select = " SELECT "+ campo1 +", " + campo2 +", "+ campo3 + " FROM " + tabela +" where "+ chave +" = " + indice; 
    return select;
}

this.update = function(Tabela,campo,valor,chave,indice){

    var update = " UPDATE "+ Tabela + " SET " + campo +" = '"+ valor + "' where "+ chave +" = " + indice;
    return update;  
}

return this;
}



