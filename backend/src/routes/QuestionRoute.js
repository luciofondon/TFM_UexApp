/*
* @author luciofondon
* @date 2017
*/

module.exports = function(app){

	var questionController = require('../controllers/QuestionController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');

	//CRUD pregunta
	app.route('/question/:questionId')
		.get(systemMiddleware.rolAdmin, questionController.readQuestion)
		.put(systemMiddleware.rolAdmin, questionController.updateQuestion)
        .delete(systemMiddleware.rolAdmin, questionController.deleteQuestion)

	app.param('questionId', questionController.loadQuestion);


    app.route('/questions/topic/:topicId')
        .get(systemMiddleware.rolAdmin, questionController.readAllByTopic)
		.post(systemMiddleware.rolAdmin, questionController.createByTopic);


}
