// var express = require('express'),
//     http = require('http'),
//     redis = require('redis'),
//     mongoose = require('mongoose'),
//     morgan = require('morgan'),
//     bodyParser = require('body-parser'),
//     methodOverride = require('method-override');

// var app = express();

// console.log(process.env.REDIS_PORT_6379_TCP_ADDR + ':' + process.env.REDIS_PORT_6379_TCP_PORT);

// // APPROACH 1: Using environment variables created by Docker
// // var client = redis.createClient(
// //  process.env.REDIS_PORT_6379_TCP_PORT,
// //    process.env.REDIS_PORT_6379_TCP_ADDR
// // );

// // APPROACH 2: Using host entries created by Docker in /etc/hosts (RECOMMENDED)
// var client = redis.createClient('6379', 'redis');

// app.get('/', function(req, res, next) {
//   client.incr('counter', function(err, counter) {
//     if(err) return next(err);
//     res.send('This page has been viewed ' + counter + ' times!');
//   });
// });

// http.createServer(app).listen(process.env.PORT || 8080, function() {
//   console.log('Listening on port ' + (process.env.PORT || 8080));
// });
//

var express  = require('express');
var app      = express();
var http = require('http');
// var redis = require('redis');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var db = require('./config/database');

// console.log(process.env.REDIS_PORT_6379_TCP_ADDR + ':' + process.env.REDIS_PORT_6379_TCP_PORT);
// console.log(process.env.DB_PORT_27017_TCP_ADDR);
// console.log(process.env.MONGO_PORT_27017_TCP_ADDR + ':' + process.env.MONGO_PORT_27017_TCP_PORT);
console.log(db.local);
// var client = redis.createClient('6379', 'redis');

mongoose.connect(db.local);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

require('./app/routes.js')(app);
app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

http.createServer(app).listen(process.env.PORT || 3000, "172.31.23.196", function() {
  console.log('Listening on port ' + (process.env.PORT || 3000));
});

// (function() {
//     'use strict';

//     var express = require('express');
//     var path = require('path');
//     var logger = require('morgan');
//     var cookieParser = require('cookie-parser');
//     var bodyParser = require('body-parser');

//     var routes = require('./routes/index');

//     var app = express();

//     // view engine setup
//     app.set('views', path.join(__dirname, 'views'));
//     app.engine('html', require('ejs').renderFile);
//     app.set('view engine', 'html');

//     app.use(logger('dev'));
//     app.use(bodyParser.json());
//     app.use(bodyParser.urlencoded({
//         extended: true
//     }));
//     app.use(cookieParser());

//     app.use(express.static(path.join(__dirname, '../client')));

//     app.all('*', function(req, res, next) {
//         res.header("Access-Control-Allow-Origin", "*");
//         res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//         res.header("Access-Control-Allow-Headers", "X-Requested-With,X-Powered-By,Content-Type");
//         if (req.method === 'OPTIONS') {
//             res.status(200).end();
//         } else {
//             next();
//         }
//     });

//     app.use('/', routes);

//     app.set('port', process.env.PORT || 8080);

//     var server = app.listen(app.get('port'), function() {
//         console.log('Express server listening on port ' + server.address().port);
//     });

//     module.exports = app;
// }());
