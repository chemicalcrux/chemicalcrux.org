var express = require('express')
  , hsts = require('hsts')
  , fs = require('fs')
  , logger = require('morgan')
  , app = express()
  , http = require('http')
  , compression = require('compression')

function setHeaders(res) {
  setHeaders(res, "", "");
}

function setHeaders(res, path, stat) {
  res.set('X-Frame-Options','SAMEORIGIN');
  res.set('X-XSS-Protection','1; mode=block');
  res.set('X-Content-Type-Options','nosniff');
  res.set('Referrer-Policy','strict-origin');
  res.set('Content-Security-Policy',"default-src 'none'; font-src https://fonts.gstatic.com; connect-src 'self'; img-src 'self'; media-src 'self'; manifest-src 'self'; object-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com")
}

var options = {
  setHeaders: setHeaders,
  dotfiles: 'ignore'
}

app.use(compression());
app.use(logger('dev'));

app.use('/feast', express.static(__dirname + '/feast', options));
app.use('/nightly/feast', express.static(__dirname + '/nightly/feast', options));
app.use('/stroll', express.static(__dirname + '/stroll', options));
app.use('/old/stroll', express.static(__dirname + '/old/stroll', options));
app.use('/nightly/stroll', express.static(__dirname + '/nightly/stroll', options));
app.use('/gorge', express.static(__dirname + '/gorge', options));
app.use('/nightly/gorge', express.static(__dirname + '/nightly/gorge', options));
app.use('/satiate', express.static(__dirname + '/satiate', options));
app.use('/nightly/satiate', express.static(__dirname + '/nightly/satiate', options));
app.use('/preview', express.static(__dirname + '/preview', options));
app.use('/april', express.static(__dirname + '/april', options));

app.use(express.static(__dirname + '/static', {setHeaders: setHeaders}));

app.set('view engine', 'pug');
app.set('views', './source/templates');

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
  setHeaders(res);
  res.render('homepage')
})

app.get('/about', function (req, res, next) {
  setHeaders(res);
  res.render('about')
})

app.get('/interests', function(req, res, next) {
  setHeaders(res);
  res.render('interests')
})

app.get('/work', function (req, res, next) {
  setHeaders(res);
  res.render('work')
})

app.get('/art', function (req, res, next) {
  setHeaders(res);
  res.render('art')
})

app.get('/games', function (req, res, next) {
  setHeaders(res);
  res.render('games')
})

app.get('/commissions', function (req, res, next) {
  setHeaders(res);
  res.render('commissions')
})

app.get('/feast', function (req, res, next) {
  setHeaders(res);
  res.render('feast')
})

app.get('/stroll', function (req, res, next) {
  setHeaders(res);
  res.render('stroll')
})

app.get('/satiate', function (req, res, next) {
  setHeaders(res);
  res.render('satiate')
})

app.get('/commissions/written_terms.pdf', function (req, res) {
  setHeaders(res);
    var filePath = "/files/written_terms.pdf";

    fs.readFile(__dirname + filePath , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
});

app.get('/commissions/audio_terms.pdf', function (req, res) {
  setHeaders(res);
    var filePath = "/files/audio_terms.pdf";

    fs.readFile(__dirname + filePath , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
});

app.get('/commissions/rp_terms.pdf', function (req, res) {
  setHeaders(res);
    var filePath = "/files/rp_terms.pdf";

    fs.readFile(__dirname + filePath , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
});

var httpServer = http.createServer(app);

httpServer.listen(8443);
