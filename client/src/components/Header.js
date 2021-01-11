import React, { Component } from 'react';
import {connect} from "react-redux";
import { NavLink,withRouter } from 'react-router-dom';

class Header extends Component {

  
  displayContent(){
    switch(this.props.auth){
      case null:
        return "still deciding";
      case false:
       return (<ul className="right"><li><a href="/auth/google">Login Google</a></li></ul>);
       default:
         if(this.props.history.location.pathname =="/"){
         return (<ul className="right">
           
    <li><NavLink to="/form/new"><button  className="btn-floating btn-large waves-effect waves-light green"><i className="material-icons">add</i></button></NavLink></li>
         <li><a style={{"borderRadius":"100%"}} >{this.props.auth.numberOfRecipes} recipies</a>
          </li>
          <li> <a href = "/api/logout">{this.props.auth.name}</a>
           </li>
           </ul>);
    }else{return(
      <ul className="right">
           
    <li><NavLink to="/"><button  className="btn-floating btn-large waves-effect waves-light blue"><i className="material-icons">home</i></button></NavLink></li>
         <li><a style={{"borderRadius":"100%"}} >{this.props.auth.numberOfRecipes} recipies</a>
          </li>
          <li> <a href = "/api/logout">{this.props.auth.name}</a>
           </li>
           </ul>);
    }
  }
  }
  render() {
    console.log( "helooooo",this.props)
    
    return (

      <nav>
        <div className="nav-wrapper">
          <NavLink className="left brand-logo" to="/">
          
            RECIPIOS
  
          </NavLink>
          
           {this.displayContent()}
      
        </div>
      </nav>
    );
  }
}
function mapStateToProps({auth}){
  return {auth}
}
export default connect(mapStateToProps)(withRouter(Header));
