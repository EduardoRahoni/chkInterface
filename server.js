var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const partials = require('express-partials')
const ejs = require('ejs');

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


app.listen(process.env.PORT || 8080, function () {
  console.log('[CONSOLE]: Servidor iniciado com sucesso');
});