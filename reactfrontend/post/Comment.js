import React , { Component } from 'react';
import {comment,uncomment} from './apiPost';
import {Link} from 'react-router-dom';
import DefaultProfile from '../images/avatar.png';

class Comment extends Component{
    constructor()
    {
        super();
        this.state={
            text: "",
            error: ""
        }
    }

    handleChange=(event)=>{
        this.setState({
            text: event.target.value,
            error: ""
        })
    }

    isValid=(text)=>{
        if(text.length==0 || text.length>150)
        {
            this.setState({
                error: "Comment should be between 0 to 150 characters"
            })
            return false;
        }
        return true;
    }

    clickSubmit=(event)=>{
        event.preventDefault();
        if(this.isValid(this.state.text))
        {
        
        const postId=this.props.postId;
        const userId=this.props.userId;
        const token=this.props.token;
        comment(postId,token,userId,{text: this.state.text})
        .then(data=>{
            if(data.error)
                console.log(data.error)
            else{
                console.log(data)
                this.setState({
                    text: ""
                })
                this.props.updateComment(data.comments)
            }
        })
        }
    }

    deleteComment=(comment)=>{
        
        const postId=this.props.postId;
        const userId=this.props.userId;
        const token=this.props.token;
        
        uncomment(postId,token,userId,comment)
        .then(data=>{
            if(data.error)
                console.log(data.error)
            else{
                console.log(data)
                this.props.updateComment(data.comments)
            }
        })
    }
    deleteConfirm=(comment)=>{
        let answer=window.confirm("Are You Sure You Want To Delete this Comment?");
        if(answer)
            this.deleteComment(comment);
    }

    render(){
        const user=this.props.user;
        const comments=this.props.comments;
        return(
            <>
            <div className="mt-5">
                <h4>Leave a Comment</h4>
                <form className="form-group">
                    <textarea className="form-control" onChange={this.handleChange}></textarea>
                    <button className="btn btn-primary btn-raised mt-2" onClick={this.clickSubmit}>Post</button>
                </form>
                {this.state.error &&
                    <div className="alert alert-danger">{this.state.error}</div>
                }
            </div>
        
             <div className="col-md-8 col-md-offset-2">
                <h4 className="mb-5 text-primary">{comments.length} Comments <hr/></h4>
               
                 {
                 
                 comments.map((comment,i)=>(
                     <div key={i}>
                         
                     
                         <div> 
                             <Link to={`/user/${user._id}`}>
                                 <img className="float-left mr-2"
                                 src={`http://localhost:8080/user/photo/${user._id}?${new Date().getTime()}`} 
                                 alt={user.name}
                                 height="30px"
                                 style={{borderRadius:"50%" , border:"2px solid black"}}
                                 width="30px"
                                 onError={i=>{i.target.src=`${DefaultProfile}`}}
                                 >
                                 
                                 </img> 
                             
                                
                                 
                             </Link>
                             <div className="lead">
                                <p> {comment.text}</p>
                                </div>
                                
                                <p className="font-italic mark">
                                    Posted By:  <Link to={`/user/${comment.postedBy._id}`}>{comment.postedBy.name}</Link> on {new Date(comment.created).toDateString()}
                                    <button className="float-right btn btn-danger" onClick={()=>this.deleteConfirm(comment)}>Remove</button>
                                </p>
                             
                             
         
                         </div>
                         <br/>
                         
                         
                 </div>
                 ))
                 }
             </div>
             
         </>
        )
    }
}

export default Comment;