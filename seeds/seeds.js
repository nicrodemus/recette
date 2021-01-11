const mongoose = require("mongoose");

var Recipe = mongoose.model("recipe");

var recipeData = [{name: "frittata",duplicate:true},{name:"cassata",duplicate:true},{name:"piupiu",duplicate:false},{name:"duc"}];

Recipe.create(recipeData).then(x =>x.map(el => console.log(el.name,el._id))).catch(err =>console.log(err));

