
module.exports = function(){
    const express = require("express");
    const app = express();
    var bodyParser = require('body-parser');

    app.set('view engine','ejs');
    app.set('views','./app/views');
    app.use(bodyParser.urlencoded({ extended : false }));


    var rotas = require('../app/routes/web')
    rotas(app);


    
    app.listen(8080,function(req,res){
	    console.log("Servidor rodando");
    });
}

