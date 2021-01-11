const mongoose= require("mongoose");
const app = require("../app");
const requireLogin = require("../middlewares/requireLogin");
const Recipe = mongoose.model("recipe");


module.exports = app => {

    app.post("/api/recipes",requireLogin,async(req,res) =>{
    console.log(req.body)
        const checkTheLastChar = str =>{
            if(str.charAt(str.length - 1) == ","||"."){str = str.substring(0, str.length - 1);
            }
            return str
          } 
          try{
        const {name, ingredients, listOfStages,picture,difficulty,time} = req.body;
        console.log(name)
        let recipe = await Recipe.findOne({name});
        if(recipe) {return res.send(400,"copied name");
  }

         recipe = new Recipe({
            name,
            ingredients:checkTheLastChar(ingredients).split(","),
            listOfStages:checkTheLastChar(listOfStages).split("."),
            _owner: req.user.id,
            dateSent:Date.now(),
            image:picture,
            difficulty,
            time
            


        });

        await recipe.save();
       
        req.user.numberOfRecipes += 1;
        
        const user = await req.user.save();
        console.log(user)
        res.send(user);
        } catch(err){//res.status(422).send(err);
            console.log(err)
        }
    })
    app.get("/api/preRecipe",async(req,res) =>{
        try {
            const results = await Recipe.find({});
            console.log(results);
            const arrName = results.map(({name}) =>name);
            res.send(arrName)
          } catch (err) {
            throw err;
          }
    })
    app.get("/api/all_recipes",async(req,res) =>{
      try{const result = await Recipe.find({}).populate("_owner")
      console.log(result[0]._owner.name)
    res.send(result)}
      catch(err){
        throw err
      }
      
    })
    app.delete("/api/delete_recipes/:id",async(req,res) =>{
      try{
        const {id} = req.params;
        const result = await Recipe.findByIdAndDelete(id);
        res.send(result)
      }catch(err){return err}
    })
    /*app.delete("/api/delete_recipes/:id",(req,res) =>{
      
      
      console.log("youuuuu",req.params.id)
     Recipe.findByIdAndDelete(req.params.id,(err,docs) =>{
        if(!err) {res.send(docs)
        }
        else console.log('Error while deleting a record : ' + JSON.stringify(err))
      })
    })
    */
    app.get("/api/fetch_one_recipe/:id",async(req,res) =>{
      
      

      try{
     
      console.log("my params:", req.params.id)
      const recipe = await Recipe.findOne({_id: req.params.id});
     
        res.send(recipe)
      }catch(err){
        console.log(err)
      }
    })
  }