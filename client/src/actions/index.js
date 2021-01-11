import { SubmissionError } from 'redux-form'
import axios from 'axios';
import{CLOUDINARY_URI,PRESET,USER,SECRET} from "../keys"
import { FETCH_USER,REGISTRATION_ERROR,FETCH_ALL_RECIPES,DELETE_RECIPE,FETCH_ONE_RECIPE,ADD_RECIPE } from './types';


export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data || null })
  
};
export const submitRecipe = (values,history) => async dispatch =>{
  console.log(values)
  const config = {
    headers: { 'content-type': 'application/json' }
}
   const formData = new FormData();
   //formData.append(Object.keys(values)[0],values.name);
   //formData.append(Object.keys(values)[1],values.ingredients);
   //formData.append(Object.keys(values)[2], values.listOfStages);
   //formData.append(Object.keys(values)[5],values.picture);
   formData.append("api_key",SECRET);
   //formData.append(Object.keys(values)[5],values.picture);
   formData.append("file",values.picture);
   formData.append("upload_preset","images_recipe")
   formData.append("api_key",SECRET)
   console.log([...formData]);
   const formObject = {};
   formData.forEach(function(value, key){
    formObject [key] = value;
});
  console.log(formObject)
 //const data =JSON.stringify(formObject);
 //console.log(data);

  try{
    
  

  const response = await axios.post(`http://api.cloudinary.com/v1_1/${USER}/image/upload/`,formData,{headers: { "X-Requested-With": "XMLHttpRequest" }})
  
  console.log("hey responseeeee",response);
  const recipeData = new FormData();
   recipeData.append(Object.keys(values)[0],values.name);
   recipeData.append(Object.keys(values)[1],values.ingredients);
   recipeData.append(Object.keys(values)[2], values.listOfStages);
   recipeData.append(Object.keys(values)[3], values.time);
   recipeData.append(Object.keys(values)[4], values.difficulty.value);
   recipeData.append(Object.keys(values)[5],response.data.secure_url);
   const RecipeObject = {};
   recipeData.forEach(function(value, key){
    RecipeObject [key] = value;
});
  const dataObject = JSON.stringify(RecipeObject);
  const res = await axios.post("/api/recipes", RecipeObject)
  
  console.log(res)
  dispatch({type: ADD_RECIPE,payload:res.data})
  history.push("/");
  }catch(err){
    console.log(err.response)
    console.log(err.response.data)
    if (err.response.data) {
     
      dispatch({
        type: REGISTRATION_ERROR,payload:err.response
      });
    }
}
};
export const fetchRecipe = () => async dispatch =>{
  const res = await axios.get("/api/all_recipes");
  dispatch({type:FETCH_ALL_RECIPES, payload:res.data ||null})
}
export const deliteRecipe = (id,history) => async dispatch =>{
  try{
    const res = await axios.delete(`/api/delete_recipes/${id}` )
    console.log("ooooooooooooo",res.data._id)
  dispatch({type:DELETE_RECIPE,payload:res.data._id})
  history.push("/")
  }catch(err){
    console.log(err)
  }
}

export const fetchOneRecipe = (id) => async dispatch =>{
  try{
    const res = await axios.get(`/api/fetch_one_recipe/${id}`)
    console.log("fullRecipe infoooooo", res.data._id)
    dispatch({type:FETCH_ONE_RECIPE, payload:res.data._id})
  }catch(err){
    console.log(err)
  }
}
