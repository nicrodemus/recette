
import React,{useEffect,useState} from "react";
import {Route,Link} from "react-router-dom";
import Recipe from "./Recipe";
import {connect} from "react-redux";
import{deliteRecipe,fetchRecipe} from "../actions/index";


 const Landing = ({allRecipies,auth,fetchAllRecipe,match,history,deleteOneRecipe}) =>{
    
     //console.log("dududududududuudud",allRecipies,match);
     
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredRecipies, setfilteredRecipies] = useState([]);
    const handleChange = event => {
        console.log("search bar",event.target.value)

        setSearchTerm(event.target.value);
    };
    const selectedRecipeHandler = (id) =>{
        console.log("suca")
        history.push( "/" + `/selected/${id}` )}
    const OnDelete =(id) =>{deleteOneRecipe(id)};

    console.log(allRecipies, "dlcdlwmflwdfm");
    useEffect(() => {
        fetchAllRecipe()
    }, []);
    
    useEffect(() =>{
        
        const res = allRecipies.recipes?.filter(el =>el.ingredients.some(ing =>ing.includes(searchTerm.toLowerCase().trim()))).map(el =>{
            return (
            <div  className="col s12 l4">
            <Recipe 
           
            _id={el._id} 
            owner={el._owner.googleId}
            auth={auth.googleId}
            clicked={()=>OnDelete(el._id)}
            selected = {() =>selectedRecipeHandler(el._id)}
            listOfStages={el.listOfStages}
            listOfIngredients = {el.ingredients}
            name={el.name}
            image ={el.image}
            difficulty ={el.difficulty} />
            </div>
         
          
                       
                 )
        })
        
        setfilteredRecipies([res])
        console.log( "coucouuouououo",res)
    
    },[searchTerm,allRecipies])
    
 
 return (
  
    <div>
        <input type="text"
         placeholder="search"
         value={searchTerm}
         onChange={handleChange}/>
    <div className="row" >
        {filteredRecipies}
        
    </div>
   

   
    </div>
   
    
      
 )

    
 }
//<Route path={match.url + '/:id'} component={FullRecipe} />
 
function mapStateToProps({allRecipies,auth}){
    console.log( "hiuuhuuhu",allRecipies,auth);
    return ({allRecipies,auth})
}

const mapDispatchToProps ={
    fetchAllRecipe : fetchRecipe,
    deleteOneRecipe: deliteRecipe
}

    

export default connect(mapStateToProps,mapDispatchToProps)(Landing)