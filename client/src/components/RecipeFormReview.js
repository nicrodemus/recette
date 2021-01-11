import React from "react";
import _ from "lodash";
import {connect} from "react-redux";
import formFields from "./formFields";
import {withRouter} from "react-router-dom";
import * as actions from "../actions/index";
import { SubmissionError } from "redux-form";

const RecipeFormReview = ({onCancel,showForm, form,error,submitRecipe,history,}) =>{
   
console.log("here 's my form", form)

    
    const reviewFields = _.map(formFields,({name,label}) =>{
      return  (
          <div key={name}>
              <label>{label}</label>
      
              <div>
                  {form[name]}
               </div>
               
          </div>
      )
    })
    return(
        <div>
            <h5>Please confirm your entries</h5>
            { reviewFields }
    {form.picture ?<div>{form.picture.name}</div> : <div> no picture saved yet</div>}
            
            <button
            className="yellow darken-3 btn-flat" 
            onClick={onCancel}>
                Back
            </button >
            <button   onClick={()=> submitRecipe(form,history)} className="green btn-flat right">NEW RECIPE <i className="material-icons right">email</i></button>
            
        </div>
    );
}
function mapStateToProps(state){
 console.log(state)
 return {form : state.form.recipeForm.values, 
         error : state.error
        }
}
export default connect(mapStateToProps,actions)(withRouter(RecipeFormReview));