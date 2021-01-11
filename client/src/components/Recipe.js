import React from "react";
import {Route,Link} from "react-router-dom";
import staticImage from "../assets/basePhoto.jpg";

  const recipe = (props) =>{
      console.log(props)
  return(      <div className="card ">
 <div style={props.image ?{backgroundImage:`url(${props.image})`,height:"200px",backgroundSize:"cover"} : {backgroundImage:`url(${staticImage})`,height:"200px",backgroundSize:"cover"}}
 
  className="card-image ">
 
{props.owner == props.auth ?<button onClick={props.clicked} className="btn-floating halfway-fab waves-effect waves-light btn-large lime darken-2"><i className="material-icons">clear</i></button>: null}
  </div>

   
<span className="card-title">{props.name}</span>
        
        
    
        <Link to={ props._id} ><div className="card-content">
       {props.listOfIngredients[0]} {props.listOfIngredients[1]}
       
       
    </div></Link>
</div>)
  }

  export default recipe;