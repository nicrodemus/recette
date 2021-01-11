import React, { Component } from 'react';
import { BrowserRouter, Route,Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../actions';
import Landing from "./Landing"
import Header from './Header';
import FullRecipe from "./FullRecipe";
import RecipeNew from "./RecipeNew";   
import axios from "axios"



class App extends Component {
 
  componentDidMount() {
    
   // this.props.fetchRecipe()
    this.props.fetchUser();
  }
  
 

  
  
  
 
  render() {
    console.log("my props",this.props)
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
            
            <Route exact path="/form/new" component={RecipeNew} />
            <Route exact path="/selected/:id"  component={FullRecipe} />
            <Route  path="/" component={Landing} />
            
          

            
            
            
            
            </Switch>
           
           
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
