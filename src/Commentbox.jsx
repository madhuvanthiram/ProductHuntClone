import React, { Component } from 'react';

import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
class Commentbox extends Component {
    state = {
      isreplyclicked:false,
      }
      handleLike=this.handleLike.bind(this);
      handleReply=this.handleReply.bind(this);
      handleReply(index)
      {
    console.log("hi reply")
       
      }


      handleLike(index)
      {
     
     console.log(index)
     console.log("inside like")
     var commentlikes=this.props.commentval;
     commentlikes[index].likes += 1
     this.setState({ 
    commentval: commentlikes
     }
      ); 
    
      }
    render() { 
        const {commentval}=this.props;
        console.log(commentval.name)
        console.log(commentval.length)
       // {people.filter(person => person.age < 60).map(filteredPerson => (
        const listItemsComments = this.props.commentval.map((info,index) =>

        <div className="commentstyle">
          <p>{index}</p>
       <p><a href="" target="_blank">{info.name}{info.name.length}</a></p>
       <p> {info.comments}</p>
       <Button variant="link" onClick={()=>this.handleLike(index)}>Like({info.likes})</Button>
       <Button variant="link" onClick={()=>this.handleReply(index)}>Reply  </Button>
        </div>

   

      );
        
        return ( 

            <div>
                 {listItemsComments}
                 
   
            </div>
         );
    
  }
}
 
export  default Commentbox ;