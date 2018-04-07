var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var templateSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now,
		required:true
	},
	questions:[{
		answers:[{
			description: {
				type: String
			},
			requirement: {
				type: String
			}
		}],
		topic: {
				type: Schema.ObjectId,
				ref: 'Topic',
				required: true
		}
	}]
});

templateSchema.statics.load = function(templateId, callback) {
  	this.findOne({_id: templateId}).exec(callback);
};


module.exports = mongoose.model('Template', templateSchema);
