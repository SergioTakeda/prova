const http = require("http");
const querystring = require('querystring');

var postAPI = function(nome,sobrenome,email,retorno){

    var data = querystring.stringify({
        'nome' : nome,
        'sobrenome':sobrenome,
        'email': email
    });

    var options = {
        hostname: '138.68.29.250',
        port: 8082,
        path: '/',
        method: 'POST', 
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(data)
        }
    };

    var request = http.request(options,retorno);
    request.on('error', (error) => {console.log(error);});   
    // aqui podes enviar data no POST
    request.write(data);
    request.end();
};

module.exports = postAPI;