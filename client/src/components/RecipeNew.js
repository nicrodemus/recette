import React, {Component} from "react";
import RecipeForm from "./RecipeForm";
import RecipeFormReview from "./RecipeFormReview";
import {reduxForm} from "redux-form";


class RecipeNew extends Component{
    
        // Required step: always call the parent class' constructor
    
    
        // Set the state directly. Use props if necessary.
        state = {
            showForm : false
        }
    
 renderContent(){
     if(this.state.showForm){
         
         return(
             <RecipeFormReview {...this.state} onCancel={() =>this.setState({showForm:false})} />
         )
     }
     else{return (
         <RecipeForm onRecipeSubmit={() =>this.setState({showForm:true})} />
     )}
 }
   
    render() {
       
    return <div>{this.renderContent()}</div>;
    }
  }
  
    //return {form : state.form.recipeForm.values }
   
export default (reduxForm({form:"recipeForm",})(RecipeNew));
