/*
* @author luciofondon
* @date 2017
*/

module.exports = function(app){
	
	var questionController = require('../controllers/QuestionController')();

	//CRUD pregunta
	app.route('/api/question/:questionId')
		.get(questionController.read)
		.put(questionController.update)
        .delete(questionController.delete);
        
    app.route('/api/questions/topic/:topicId')
        .get(questionController.readAllByTopic)
		.post(questionController.createByTopic);  
    
    app.param('questionId', questionController.loadQuestion);
        
}