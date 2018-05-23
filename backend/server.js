/**
 * @author Lucio David Fondon Terron - 2018
 * @description Configuracion del servidor
 */

var express = require("express"),
	bodyParser  = require("body-parser"),
	methodOverride = require("method-override"),
	mongoose = require('mongoose'),
	logger = require('morgan'),
	config = require('./config/config'),
	systemMiddleware = require('./src/middlewares/SystemMiddleware'),
	userController = require('./src/controllers/UserController')(),
	downloadController = require('./src/controllers/DownloadController')();


var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Simula POST
app.use(methodOverride()); // Simula DELETE y PUT
app.use(express.static(__dirname + '/../frontend/'));
app.use(logger('dev'));

var router = express.Router();

var api = express.Router();
require('./src/routes/ProjectRoute')(api);
require('./src/routes/RolRoute')(api);
require('./src/routes/UserRoute')(api);
require('./src/routes/TopicRoute')(api);
require('./src/routes/QuestionRoute')(api);
require('./src/routes/AnswerRoute')(api);
require('./src/routes/TemplateRoute')(api);
require('./src/routes/DashboardRoute')(api);
require('./src/routes/MediatoryRoute')(api);
require('./src/routes/AplicationRoute')(api);
require('./src/routes/UploadRoute')(api);

//Control de token
app.route('/auth/login').post(userController.login);
app.route('/auth/signup').post(userController.signup);
app.route('/download/file/:nameFile').get(downloadController.downloadFile);

app.use("/api", systemMiddleware.ensureAuthenticated, api);


// Conexion a Mongo y despliegue del servidor
mongoose.connect(config.MONGO_PATH,  function(err, res) {
	if(err) {
		console.log('ERROR! connecting to Database. ' + err);
	}
	app.listen(config.SERVER_PORT, function() {
		console.log("INFO! TFM --> UexApp BACKEND lanzado http://localhost:" + config.SERVER_PORT);
	});
});
