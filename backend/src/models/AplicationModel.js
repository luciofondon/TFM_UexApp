var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var appSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	project: {
		type: Schema.ObjectId,
		ref: "Project",
		required: true
	},
	created: {
		type: Date,
		default: Date.now,
		required:true
	},
	isTemplate: { // Indica si el proyecto es es una plantilla
		type: Boolean,
		default: false
	},
	nameTemplate: {
		type: String
	}
},
{
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

appSchema.statics.load = function(appId, callback){
	this.findOne({_id: appId}).exec(callback);
};

module.exports = mongoose.model('Aplication',appSchema);
