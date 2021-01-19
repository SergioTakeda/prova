var regModel = require('../model/regModel')();
const { response } = require('express');
var apipost = require('../model/postAPI');

const querystring = require('querystring');
const http = require("http");

module.exports = function(app){
 
///////////////////// pagina inicial///////////////////////////////
  app.get("/",function(req,res){ 
      res.render('pages/inicio',{retorno:""} );
  });

  app.get("/teste",function(req,res){ 
    var nome = "sergio";
    var sobrenome = "takeda";
    var email = "email@ggg.com";
    var num_codnome = 56754675;
    var num_codsobrenome = 32434234;
    var num_codemail = 678687;
    var nsoma = [{"soma":12431}];
    var sobresoma =[{"soma":7465}]; 
    var emasoma = [{"soma":213123}];
    var total = 968654;
    var animalret =[{"id":144,"animal":"iulkuik","total":1233}];
    var corret =[{"id":144,"cor":"4a4gfr","total":1233}];;
    var corexcluidaret =[{"id":144,"cor":"aergeaerg","total":1233}];;
    var paisret =[{"id":144,"pais":"dgasergawer","total":1233}];;
    res.render('pages/resultado',{nome:nome,sobrenome:sobrenome,email:email,num_codnome:num_codnome,num_codsobrenome:num_codsobrenome,num_codemail:num_codemail,nsoma:nsoma,sobresoma:sobresoma,emasoma:emasoma,total:total,animalret:animalret,corret:corret,corexcluidaret:corexcluidaret,paisret:paisret});
});


app.get("/testpost",function(req,res){ 
  var nome = "sergio";
  var sobrenome = "takeda";
  var email = "yudi.takeda@test.com ";
  
  apipost(nome,sobrenome,email,function(rest){
    rest.setEncoding('utf8');
    console.log(`statusCode: ${rest.statusCode}`);
    var APIresp = '';
    var splitcode ='';
    rest.on('data', (d) => {
      process.stdout.write(d);
      APIresp = d;
    });
    rest.on('end', function() {
/////////////// split do retorno da API /////////////           
      splitcode = APIresp.split('#');
      console.log("    ");
      console.log(splitcode[1]);// codigo nome
      console.log(splitcode[3]);// codigo sobrenome
      console.log(splitcode[5]);// codigo email
    
    });
  }); 
});



  app.post("/",function(req,res){
    if(req.body.nome == '' || req.body.sobrenome == ''|| req.body.email == ''){
      res.render('pages/inicio',{retorno:"preencha corretamente os campos"} );
    }else{
////////////// variaveis de entrada///////////////////////////      
      var nome = req.body.nome; 
      var sobrenome = req.body.sobrenome; 
      var email = req.body.email;
///////////// post para API///////////////////////
      apipost(nome,sobrenome,email,function(rest){
        rest.setEncoding('utf8');
        console.log(`statusCode: ${rest.statusCode}`);
        var APIresp = '';
        var splitcode ='';
        rest.on('data', (d) => {
          process.stdout.write(d);
          APIresp = d;
        });
        rest.on('end', function() {
/////////////// split do retorno da API /////////////           
          splitcode = APIresp.split('#');
          console.log("    ");
          console.log(splitcode[1]);// codigo nome
          console.log(splitcode[3]);// codigo sobrenome
          console.log(splitcode[5]);// codigo email

          var num_codnome = Number(splitcode[1]);
          var num_codsobrenome = Number(splitcode[3]);
          var num_codemail = Number(splitcode[5]);
//////////// incere nome sobrenome email //////////////////////////////////////////         
          regModel.incereNome(nome,splitcode[1]);
          regModel.incereSobrenome(sobrenome,splitcode[3]);
          regModel.incereemail(email,splitcode[5]);
////////////////// calcula valor total //////////////////////////////////////////////       
          regModel.nomesoma(num_codnome,function(nsoma){
            console.log("soma nome ="+nsoma[0].soma)
            regModel.sobrenomesoma(num_codsobrenome,function(sobresoma){
              console.log("soma sobrenome = " + sobresoma[0].soma);
              regModel.emailsoma(num_codemail,function(emasoma){
                console.log("soma email = "+emasoma[0].soma);
////////////////////// calculo valor total ///////////////////////////////////////////
                var parcialnome = num_codnome + Number(nsoma[0].soma);
                var parcialsobrenome = num_codsobrenome + Number(sobresoma[0].soma);
                var parcialemail = num_codemail + Number(emasoma[0].soma);
                var total = parcialemail+ parcialsobrenome + parcialnome;
               
                console.log("Total = "+total);
 /////////////////////select animal,cor,cor excluida e pais ///////////////////////////                  
                regModel.animal(total,function(animalret){
                  console.log("animal = "+animalret[0].animal);
                  regModel.cor(total,function(corret){
                    console.log(" cor = "+corret[0].cor);
                    regModel.coresexcluidas(total,function(corexcluidaret){
                      console.log(" cor excuida = "+corexcluidaret[0].cor);
                      regModel.pais(total,function(paisret){
                        console.log(" pais = "+paisret[0].pais);
                        res.render('pages/resultado',{nome:nome,sobrenome:sobrenome,email:email,num_codnome:num_codnome,num_codsobrenome:num_codsobrenome,num_codemail:num_codemail,nsoma:nsoma,sobresoma:sobresoma,emasoma:emasoma,total:total,animalret:animalret,corret:corret,corexcluidaret:corexcluidaret,paisret:paisret});

                      });
                    });
                  });
                });
                regModel.limpacores(total);
              });
            });
          });
        });
      });
    };
  });    
};
