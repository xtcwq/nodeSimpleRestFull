var express = require('express'),
	sings = require('./routes/singsRouter'),
	http = require('http'),
	path = require('path'),
	session = require("express-session"),
 	cookieParser = require('cookie-parser'),
 	bodyParser = require('body-parser');

var users = require('./routes/users');
var index = require('./routes/index')

var app = express();

app.engine("html", require("express-art-template"));

// all environments
app.set('port', process.env.PORT || 3030);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

//session
app.use(cookieParser());
app.use(session({
    secret : "scrFor7",
    cookie: {maxAge: 30000 },  
    resave: false,
    saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, 'public')));

//header traite
// app.all('*', function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "content-type");
// 	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
// 	res.header("X-Powered-By", ' 3.2.1')
// 	res.header("Content-Type", "application/json;charset=utf-8");
// 	if(req.method == "OPTIONS") {
// 		res.send("200");
// 	} else {
// 		next();
// 	}
// });

//body traite
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// development only
if('development' == app.get('env')) {
	app.use(express.errorHandler());
}


app.use(app.router);

//login
app.get('/login',function (req, res){
	res.render("login.html");
});
app.post('/login',users.login);

//sings
app.get('/', index.index);
app.get('/sings', sings.list);
app.get('/sings/maxid', sings.getMax);
app.post('/sings/sing', sings.add);
app.delete('/sings/id/:id', sings.del);
app.put('/sings/sing', sings.update);



http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

