const { TYPES } = require('tedious');
var dbconect = require('../../config/dbconfig');
var operabd = require("./dbquerry")();
var Request = require('tedious').Request;  
 

module.exports = function(){
   
    this.all = function(){

        return "N#291091#S#6789#E#1234#";
    }

    this.animal = function(total,queryResp){
        var tp = dbconect();
        tp.sql(operabd.query("id","animal","total","tbs_animais","total",total))
        .execute()
        .then(queryResp)
        .fail(function(err) {
            console.log(err);
        });
    }

    this.cor = function(total,queryResp){
        var tp = dbconect();
        tp.sql(operabd.query("id","cor","total","tbs_cores","total",total))
        .execute()
        .then(queryResp)
        .fail(function(err) {
            console.log(err);
        });
    }

    this.coresexcluidas = function(total,queryResp){
        var tp = dbconect();
        tp.sql(operabd.query("id","cor","total","tbs_cores_excluidas","total",total))
        .execute()
        .then(queryResp)
        .fail(function(err) {
            console.log(err);
        });
    }
    
    this.limpacores = function(total){
        var tp = dbconect();
      
        tp.sql(operabd.update("tbs_cores_excluidas","cor"," ","total",total))
        .execute()
        .then(function(res){console.log("cor apagada")})
        .fail(function(err) {
            console.log(err);    
        });
    }

    this.pais = function(total,queryResp){
        var tp = dbconect();
        tp.sql(operabd.query("id","pais","total","tbs_paises","total",total))
        .execute()
        .then(queryResp)
        .fail(function(err) {
            console.log(err);
        });
    }


    this.incereNome = function(valor,codigo){
        var tp = dbconect();
      
        tp.sql(operabd.update("tbs_nome","nome",valor,"cod",codigo))
        .execute()
        .then(function(res){console.log("nome atualizado")})
        .fail(function(err) {
            console.log(err);    
        });
    }

    this.incereSobrenome = function(valor,codigo){
        var tp = dbconect();
      
        tp.sql(operabd.update("tbs_sobrenome","sobrenome",valor,"cod",codigo))
        .execute()
        .then(function(res){console.log("sobrenome atualizado")})
        .fail(function(err) {
            console.log(err);    
        });
    }

    this.incereemail = function(valor,codigo){
        var tp = dbconect();
      
        tp.sql(operabd.update("tbs_email","email",valor,"cod",codigo))
        .execute()
        .then(function(res){console.log("email atualizado")})
        .fail(function(err) {
            console.log(err);    
        });
    }
    
    this.nomesoma = function(valor,retorn){
        var tp = dbconect();
      
        tp.sql(operabd.query("id","cod","soma","tbs_cod_nome","cod",valor))
        .execute()
        .then(retorn)
        .fail(function(err) {
            console.log(err);    
        });
    }

    this.sobrenomesoma = function(valor,retorn){
        var tp = dbconect();
      
        tp.sql(operabd.query("id","cod","soma","tbs_cod_sobrenome","cod",valor))
        .execute()
        .then(retorn)
        .fail(function(err) {
            console.log(err);    
        });
    }

    this.emailsoma = function(valor,retorn){
        var tp = dbconect();
          
        tp.sql(operabd.query("id","cod","soma","tbs_cod_email","cod",valor))
        .execute()
        .then(retorn)
        .fail(function(err) {
            console.log(err);    
        });
    }
    
    return this;
};
