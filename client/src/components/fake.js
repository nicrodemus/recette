<div className="col s12 l4" key={el._id}  >
          
                   
                       
                       
                           <div className="card ">
                             <div style={{backgroundImage:`url(${staticImage})`,height:"200px",backgroundSize:"cover"}} className="card-image ">
                            
        {el._owner.googleId == auth.googleId ?<button key={el._id} onClick={() =>OnDelete(el._id)} className="btn-floating halfway-fab waves-effect waves-light btn-large lime darken-2"><i className="material-icons">clear</i></button>: null}
                             </div>
                            
                              
                                   <span className="card-title">{el.name}</span>
                                   
                                   
                               
                               <div className="card-content">
                                   <p>{el.listOfStages[0]}</ p>
                               </div>
                           </div>
                     
                   
       
           
            </div>)