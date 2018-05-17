/*
* @author luciofondon
* @date 2017
*/

module.exports = function(app){

	var questionController = require('../controllers/QuestionController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');

	//CRUD pregunta
	app.route('/question/:questionId')
		.get(systemMiddleware.rolOperador, questionController.readQuestion)
		.put(systemMiddleware.rolOperador, questionController.updateQuestion)
        .delete(systemMiddleware.rolOperador, questionController.deleteQuestion)

    app.route('/questions/topic/:topicId')
        .get(systemMiddleware.rolOperador, questionController.readAllByTopic)
		.post(systemMiddleware.rolOperador, questionController.createByTopic);

	app.route('/question/topic/:topicId/question/:questionId/answer/:answerId')
		.post(systemMiddleware.rolOperador, questionController.createQuestionAsociate)
		.put(systemMiddleware.rolOperador, questionController.updateQuestionAsociate)
        .delete(systemMiddleware.rolOperador, questionController.deleteQuestionAsociate)

	app.route('/question/answer/:questionId:/answerId/:questionAsociateId')
		.post(systemMiddleware.rolOperador, questionController.readQuestionAsociate)

	app.param('questionId', questionController.loadQuestion);

}
