 import _ from "lodash";
import React,{Children, Component} from "react";
import {reduxForm,Field} from "redux-form";
import { Link } from 'react-router-dom';
import Options from "./difficultiesOptions";
import RecipeField from "./RecipeField";
import formFields from "./formFields";
import axios from "axios";
import Select from 'react-select'

    class RecipeForm extends Component{
    
     
        renderFields(){
            return _.map(formFields,({label,name,type}) =>{
              console.log("huiuiuiiu",type)
                return <Field key={name} label={label} name={name} type={type} component={RecipeField} />
            }) 
             
 
        }
        handleChange = (event,input) => {
          event.preventDefault();
          let imageFile = event.target.files[0];
          input.onChange(imageFile);
          
          }
          
        renderImageInput = ({ name,input,label, type, }) => {
          
          return (
            <div>
              <label>{label}</label>
              <input  
                  style={{marginBottom:"30px",marginTop:"25px"}}
                name={name}
                type={type}
                
                onChange={event => this.handleChange(event, input)}
              />
            
            </div>
          );
        };
        renderSelectInput = ({name,select,label,input,type,options}) =>{
          
          return(
            <div 
            //style={{width:"50px",height:"100px"}}
            >
              <label>{label}</label>
              <Select {...input}
              onChange={value => input.onChange(value)} 
              onBlur={() => input.onBlur(input.value)} 
              name={name}
              //style={{marginTop:"253px"}}
              options={options}
              />
              </div>
          )
        }
        
       render(){
        const  {  handleSubmit  } = this.props;
          
        return(
            <div>
            <form 
            onSubmit={handleSubmit(this.props.onRecipeSubmit)}
            //nitialValues={{name: "dudi"}}
            >
           
              {this.renderFields()}
             < Field name="difficulty" component={this.renderSelectInput} type="select" options={Options} />     
             <Field name="picture" component={this.renderImageInput} type="file"  />
             

          
       
              <Link to="/" className="red btn-flat white-text">
                Cancel
              </Link>
              <button type="submit" className="teal btn-flat right white-text">
                Next
                <i className="material-icons right">done</i>
              </button>
            </form>
          </div>
           );
       }
        
}

/*const asyncValidate =( values) =>{
 return axios.get("/api/preRecipe").then((res) => {if (res.data.includes(values.name)) {
    throw { name: 'That name is taken' }
  }
  else return res
}
  )
}
*/
function validate(values){
    const errors={};
    _.each(formFields ,({name,errorMess}) =>{
        if(!values[name]){
            errors[name] = errorMess
        }
    })
     
   return  errors;
        
}

export default reduxForm({validate,
    //asyncValidate,
    asyncBlurFields: ['name'],
    form:"recipeForm",
    intialValues: {
      difficulties: {
        label: 'hard',
        value: 'hard',
      },
    },
    enableReinitialize : true ,
    destroyOnUnmount:false,


})(RecipeForm);