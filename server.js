var express = require('express')
  , fs = require('fs')
  , logger = require('morgan')
  , app = express()

app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))
app.set('view engine', 'pug')
app.set('views', './source/templates')

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

app.get('/commissions/written_terms.pdf', function (req, res) {
    var filePath = "/files/written_terms.pdf";

    fs.readFile(__dirname + filePath , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 8080))
})
