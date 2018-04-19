/*
* @author luciofondon
* @date 2017
*/

module.exports = function(app){
	
	var questionController = require('../controllers/QuestionController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');

	//CRUD pregunta
	app.route('/question/:questionId')
		.get(systemMiddleware.rolAdmin, questionController.read)
		.put(systemMiddleware.rolAdmin, questionController.update)
        .delete(systemMiddleware.rolAdmin, questionController.delete);
        
    app.route('/questions/topic/:topicId')
        .get(systemMiddleware.rolAdmin, questionController.readAllByTopic)
		.post(systemMiddleware.rolAdmin, questionController.createByTopic);  
    
    app.param('questionId', questionController.loadQuestion);
        
}
