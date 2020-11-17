import React, { Component } from 'react';
import './ProductStyling.css';
class Card extends Component {
    state = {  }
    render() { 
        const{header,img,name}=this.props
        return ( 
<div class="card">
 <p><img src={img} alt="ProductLogo"/></p> 
        <h1>{header}</h1>
        <p><b>{name}</b></p>
 {this.props.children}
 
</div>


         );
    }
}
 
export default Card ;