const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	email: String,
	name: String,
	numberOfRecipes:{type:Number, default:0}
});
 mongoose.model('user', userSchema);
