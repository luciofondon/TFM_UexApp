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

	app.route('/question/:questionId/answer/:answerId')
		.post(systemMiddleware.rolOperador, questionController.createQuestionAsociate)
		.put(systemMiddleware.rolOperador, questionController.updateQuestionAsociate)
        .delete(systemMiddleware.rolOperador, questionController.deleteQuestionAsociate)

	app.route('/question/answer/:questionId:/answerId/:questionAsociateId')
		.post(systemMiddleware.rolOperador, questionController.readQuestionAsociate)


	// Crear respuestas asociada a una pregunta asociada
	/*app.route('/question/:questionId/answer/:answerId/questionasociate:/questionAsociateId')
		.post(systemMiddleware.rolOperador, questionController.createAnswerAsociate);

	// Crear respuestas asociada a una pregunta asociada
	app.route('/question/:questionId/answer/:answerId/questionasociate:/questionAsociateId')
		.post(systemMiddleware.rolOperador, questionController.createAnswerAsociate)
		.put(systemMiddleware.rolOperador, questionController.updateAnswerAsociate)
		.delete(systemMiddleware.rolOperador, questionController.deleteAnswerAsociate)*/

	app.param('questionId', questionController.loadQuestion);

}
