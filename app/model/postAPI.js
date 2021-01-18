const http = require("http");

var postAPI = function(nome,sobrenome,email,retorno){

    var body = JSON.stringify({
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
          'Content-Type': 'application/json',
          'Content-Length': body.length
        }
    };

    var request = http.request(options,retorno);
    request.on('error', (e) => {console.log(error);});   
    // aqui podes enviar data no POST
    request.write(body);
    request.end();
};

module.exports = postAPI;