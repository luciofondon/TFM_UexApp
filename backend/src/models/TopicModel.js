var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var topicSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	project: {
		type: Schema.ObjectId,
		ref: 'Project',
		required: true
	},
	aplication: {
		type: Schema.ObjectId,
		ref: 'Aplication',
	},
	created: {
		type: Date,
		default: Date.now
	}
});

topicSchema.statics.load = function(topicId, callback) {
	this.findOne({_id: topicId}).exec(callback);
};


module.exports = mongoose.model('Topic', topicSchema);
