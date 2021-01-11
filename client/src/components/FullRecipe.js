import React,{useEffect,useState} from "react";
import {connect} from "react-redux";

import{fetchOneRecipe} from "../actions/index";
import { useHistory, } from "react-router-dom";

const FullRecipe = ({match,fetchTheRecipe,allRecipies}) =>{
    console.log(allRecipies.recipes)
    const history = useHistory();
    const mapIngre = allRecipies.recipes[0]?.ingredients.map(el => <div>{el}</div>);
    const mapStages = allRecipies.recipes[0]?.listOfStages.map(el => <div>{el}</div>);
    console.log("aleeee",match)
    useEffect(() => {
        fetchTheRecipe(match.params.id)
    }, [match.params.id])
    console.log( "cuckoooo",allRecipies);
    
    return(<div>
        <h5>How to prepare a <b>{allRecipies.recipes[0]?.name}</b> ,the difficulty is <b>{allRecipies.recipes[0]?.difficulty}</b> </h5>
        <p>{mapIngre}</p>
        <p>the time estimated to prepare the plate is :{allRecipies.recipes[0]?.time} minutes</p>
        <p>{mapStages}</p>
        <button
    type='button'
    onClick={() => {history.push("/") }}
  >
   go back !
  </button>
        
    </div>)
}
function mapStateToProps({allRecipies}){
    return({allRecipies})
}
const mapDispatchToProps ={

    fetchTheRecipe : fetchOneRecipe
}

export default connect(mapStateToProps,mapDispatchToProps)(FullRecipe);