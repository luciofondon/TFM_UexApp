/*
* @author luciofondon
* @date 2017
*/

module.exports = function(app){
	
	var questionController = require('../controllers/QuestionController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');

	//CRUD pregunta
	app.route('/question/:questionId')
		.get(systemMiddleware.rolOperador, questionController.read)
		.put(systemMiddleware.rolOperador, questionController.update)
        .delete(systemMiddleware.rolOperador, questionController.delete);
        
    app.route('/questions/topic/:topicId')
        .get(systemMiddleware.rolOperador, questionController.readAllByTopic)
		.post(systemMiddleware.rolOperador, questionController.createByTopic);  
    
    app.param('questionId', questionController.loadQuestion);
        
}
