
module.exports = function(app){
	
	var answerController = require('../controllers/AnswerController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');

	app.route('/answer/:questionId')
		.get(systemMiddleware.rolAdmin, answerController.read)
		.put(systemMiddleware.rolAdmin, answerController.update)
        .delete(systemMiddleware.rolAdmin, answerController.delete);
        
    app.route('/answers/question/:questionId')
        .get(systemMiddleware.rolAdmin, answerController.readAllByTopic)
		.post(systemMiddleware.rolAdmin, answerController.createByTopic);  
    
   // app.param('questionId', answerController.loadQuestion);
        
}
