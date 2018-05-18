var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var questionSchema = new Schema({
	description: {
    	type: String,
    	required: true
  	},
	answers:[{
		description: {
		  	type: String
		},
		requirement: {
			type: String
		},
		questions: [{
			type: Schema.ObjectId,
			ref: 'Question',
  		}],
	}],
  	topic: { // Las preguntas que no tienen topic estan asocidas a otra pregunta
		type: Schema.ObjectId,
		ref: 'Topic',
  	},
	created: {
		type: Date,
		default: Date.now
	},

},
{
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

questionSchema.statics.load = function(questionId, callback) {
	this.findOne({_id: questionId}).exec(callback);
};

module.exports = mongoose.model('Question', questionSchema);
