import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from "./errorReducer";
import recipeReducer from "./recipeReducer";

import {reducer as reduxForm} from "redux-form";
export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  error:errorReducer,
  allRecipies: recipeReducer,
 
});
