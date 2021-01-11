import {REGISTRATION_ERROR} from "../actions/types";

 export default function (state = [], action) {
    switch (action.type) {
  
      case REGISTRATION_ERROR:
        return state.concat([action.payload]);
  
      
  
      default:
        return state;
    }
  }