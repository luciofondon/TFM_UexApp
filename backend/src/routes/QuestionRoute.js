/*
* @author luciofondon
* @date 2017
*/

module.exports = function(app){
	
	var questionController = require('../controllers/QuestionController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');

	//CRUD pregunta
	app.route('/question/:questionId')
		.get(systemMiddleware.roOperador, questionController.read)
		.put(systemMiddleware.roOperador, questionController.update)
        .delete(systemMiddleware.roOperador, questionController.delete);
        
    app.route('/questions/topic/:topicId')
        .get(systemMiddleware.roOperador, questionController.readAllByTopic)
		.post(systemMiddleware.roOperador, questionController.createByTopic);  
    
    app.param('questionId', questionController.loadQuestion);
        
}
