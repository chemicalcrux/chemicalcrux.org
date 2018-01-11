var express = require('express')
  , forceSSL = require('express-force-ssl')
  , hsts = require('hsts')
  , fs = require('fs')
  , logger = require('morgan')
  , app = express()
  , http = require('http')
  , https = require('https')
  , privateKey = fs.readFileSync('cert/privkey.pem', 'utf8').toString()
  , certificate = fs.readFileSync('cert/fullchain.pem', 'utf8').toString()

var credentials = {key: privateKey, cert: certificate};

app.use(forceSSL);
app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))
app.set('view engine', 'pug')
app.set('views', './source/templates')

app.set('forceSSLOptions', {
  enable301Redirects: true,
  trustXFPHeader: false,
  httpsPort: 443,
  sslRequiredMessage: 'SSL Required.'
});

app.use(hsts({
  maxAge: 31536000,        // Must be at least 1 year to be approved
  includeSubDomains: true, // Must be enabled to be approved
  preload: true
}))

app.get('/', function (req, res, next) {
  res.render('homepage')
})

app.get('/about', function (req, res, next) {
  res.render('about')
})

app.get('/interests', function(req, res, next) {
  res.render('interests')
})

app.get('/work', function (req, res, next) {
  res.render('work')
})

app.get('/art', function (req, res, next) {
  res.render('art')
})

app.get('/commissions', function (req, res, next) {
  res.render('commissions')
})


app.get('/commissions/written_terms.pdf', function (req, res) {
    var filePath = "/files/written_terms.pdf";

    fs.readFile(__dirname + filePath , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
});

app.get('/commissions/audio_terms.pdf', function (req, res) {
    var filePath = "/files/audio_terms.pdf";

    fs.readFile(__dirname + filePath , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
});

app.get('/commissions/rp_terms.pdf', function (req, res) {
    var filePath = "/files/rp_terms.pdf";

    fs.readFile(__dirname + filePath , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials,app);

httpServer.listen(8080);
httpsServer.listen(8443);


//app.listen(process.env.PORT || 8080, function () {
//  console.log('Listening on http://localhost:' + (process.env.PORT || 8080))
//})
