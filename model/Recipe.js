const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipeSchema = new Schema({
	_owner:{type:Schema.Types.ObjectId, ref:"user"},
	name: {
		type: String,
	
    
    },
    difficulty:String,
    time:Number,
    image:String,
    ingredients:Array,
    listOfStages:Array,
    dateSent: Date
});
 mongoose.model('recipe', recipeSchema);
//module.exports = Recipe;


  