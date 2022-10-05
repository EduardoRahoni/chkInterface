var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const partials = require('express-partials')
const ejs = require('ejs');
const fetch = require('node-fetch')
const axios = require('axios')
//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(partials());
	app.engine('html', require('ejs').renderFile); //renders .ejs as html
	
	app.set('views', __dirname + '/views');
	app.use(express.static(__dirname + '/public'));

app.get('/preauth', function(req, res) {
    console.log("GET From SERVER");
    res.render('preauth.html');
});

app.get('/zeroauth', function(req, res) {
    console.log("GET From SERVER");
    res.render('zeroauth.html');
});

app.get('/api/preauth', async function(req, res) {
  let dadosBody = req.query;
  let inputDados = dadosBody.cc
  console.log(inputDados)
  let token = "lvkVnAduGJWvoP7Adb1o";
   await fetch(`https://menordocorrechk.herokuapp.com/api/v1/debitar?token=` + token + "&cc=" + inputDados, {
    "method": "GET",
    "body": null
   })
   .then((res) => {
    return res.json();
  })
  .then((json) => {
    return  res.json(json);
  })
})

  app.get('/api/zeroauth', async function(req, res) {
    let dadosBody = req.query;
    let inputDados = dadosBody.cc
    console.log(inputDados)
    let token = "lvkVnAduGJWvoP7Adb1o";
     await fetch(`https://menordocorrechk.herokuapp.com/api/v1/auth?token=` + token + "&cc=" + inputDados, {
      "method": "GET",
      "body": null
     })
     .then((res) => {
      return res.json();
    })
    .then((json) => {
      return  res.json(json);
    })

})

app.listen(process.env.PORT || 8080, function () {
  console.log('[CONSOLE]: Servidor iniciado com sucesso');
});