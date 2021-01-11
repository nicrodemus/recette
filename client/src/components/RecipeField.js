import React from "react";

export default ({input,label,name, type,meta:{touched,error,asyncValidating} }) =>{
  console.log("heres input",input,name )
    return (<div>
        <div className={asyncValidating ? 'async-validating' : ''}>
        <label>{label}</label>
        {label ==="stages separeted by a period"?<textarea {...input} 
         type={type} 
         
         
          style={{marginTop:"20px",height:"100px",marginBottom:"35px"}}
           />:
           <input {...input} 
           type={type} 
           
           
            style={{marginBottom:"35px"}}
             />}
       <div>{touched && error}</div> 
       </div>
    </div>)
}