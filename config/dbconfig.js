var tp = require('tedious-promises');

var conec = function(retorno){
    var dbConfig = {
        "userName": "user_trial",
        "password": "7412LIVE!@#$%¨&*()",
        "server": "virtual2.febracorp.org.br",
        "options": {
            "database": "CONTOSO",
            // "encrypt": true,
        }
   };
tp.setConnectionConfig(dbConfig);
return tp;

}

module.exports = conec;