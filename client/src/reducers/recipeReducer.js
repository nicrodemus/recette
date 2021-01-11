import {FETCH_ALL_RECIPES,DELETE_RECIPE,FETCH_ONE_RECIPE} from "../actions/types";
const initialState = {
  recipes :[],
};
export default function(state = initialState, action) {
  
    switch (action.type) {
      case FETCH_ALL_RECIPES:
        return { ...state,
                recipes:[...action.payload ]|| false};
        case DELETE_RECIPE:
           
          return {
            ...state,
                  recipes: state.recipes.filter(recipe => recipe._id !== action.payload)  };
                  case FETCH_ONE_RECIPE:
                    return{
                      ...state,
                      recipes:state.recipes.filter(recipe => recipe._id  === action.payload)
                    }

          
      default:
        return state;
    }
  }