import React, { Component } from 'react';
import './ProductStyling.css';
class Popup extends Component {
    state = {

      }
    render() { 

      const {header,handleclose}=this.props;
        
        return ( 

   
  

<div className="popup">

 
  <div className="modal-content">
    <div className="modal-header">
   <h1>{header}</h1> 
    
      <span className="close" onClick={(e)=>this.props.handleclose("close",e)}>x</span>
      
    </div>
    <div className="modal-body">
    {this.props.children}
     
    </div>
    <div className="modal-footer">
 
    </div>
  </div>

</div>
       
         );
    }
}
 
export default Popup;