/*
* @author luciofondon
* @date 2018
*/

var express = require("express"),
	bodyParser  = require("body-parser"),
	methodOverride = require("method-override");
	mongoose = require('mongoose'),
	logger = require('morgan'),
	config = require('./config/config'),
	authenticatedMiddleware = require('./src/middlewares/AuthenticatedMiddleware');


var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Simula POST
app.use(methodOverride()); // Simula DELETE y PUT
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));

var router = express.Router();

//Control de token
//app.use("/api", authenticatedMiddleware.ensureAuthenticated);

require('./src/routes/ProjectRoute')(app);
require('./src/routes/RolRoute')(app);
require('./src/routes/UserRoute')(app);
require('./src/routes/TopicRoute')(app);
require('./src/routes/QuestionRoute')(app);
require('./src/routes/TemplateRoute')(app);


// Iniciamos el servidor y la base de datos
mongoose.connect(config.MONGO_PATH, function(err) {
    app.listen(config.SERVER_PORT, function(){
    	console.log('Servidor arrancado en http://localhost:' + config.SERVER_PORT);
    });
});
