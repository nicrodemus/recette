import {ADD_RECIPE} from "../actions/types";
export default function (state = [],action){
    switch (action.type) {
        case ADD_RECIPE:
          return action.payload || false;
        default:
          return state;
      }
}