import React , {Component} from 'react';
import {singlePost,removePost,like,unlike} from './apiPost';
import {isAuthenticated} from '../auth';
import DefaultPost from '../images/defaultPost.png';
import DefaultVid from '../images/defvid.mp4';
import {Link, Redirect} from 'react-router-dom';
import Comment from './Comment';

class SinglePost extends Component{
    constructor(){
        super();
        this.state={
            post: "",
            deleted: false,
            like: false,
            likes: 0,
            comments: []
        }
    }

    componentDidMount(){
        const postId=this.props.match.params.postId;
        const token=isAuthenticated().token;
        singlePost(postId,token)
        .then(data=>{
            if(data.error)
                console.log(data.error);
            else
            {
                
                this.setState({
                    post: data,
                    likes: data.likes.length,
                    like: this.checkLike(data.likes),
                    comments: data.comments
                })
            }
                
        })
    }

    updateComment=comment=>{
        this.setState({comments: comment})
    }

    checkLike=(likes)=>{
        const userId=isAuthenticated().user._id;
        let match=likes.indexOf(userId) !== -1
        return match;
    }

    deletePost=()=>{
        const token=isAuthenticated().token;
        const postId=this.props.match.params.postId;
        removePost(postId,token)
        .then(data=>{
            if(data.error)
                console.log(data.error)
            else
            {
                this.setState({
                    deleted: true
                })
            }
        })
    }

    deleteConfirm=()=>{
        let answer=window.confirm("Are You Sure You Want To Delete this Post?");
        if(answer)
            this.deletePost();
    }

    likeToggle=()=>{
        let callApi=this.state.like ? unlike : like

        const userId=isAuthenticated().user._id;
        const postId=this.state.post._id;
        const token=isAuthenticated().token;
        callApi(postId,token,userId)
        .then(data=>{
            if(data.error)
                console.log(data.error)
            else{
                this.setState({
                    like: !this.state.like,
                    likes: data.likes.length
                })
            }
        })
    }

    renderPost=(post)=>{
                            const posterId=post.postedBy? post.postedBy._id : ""
                            const posterName=post.postedBy? post.postedBy.name : ""
                            const {likes,comments}=this.state;
                            
                            const user=isAuthenticated().user;
                            
                            
                            return (
                                <div className="container">
                                
                            <div className="card mt-3 mr-5 ml-5">
                                
                                <div className="card-body">
                                    <img
                                        src={`http://localhost:8080/post/photo/${post._id}`}
                                        alt={post.title}
                                        onError={(event)=>event.target.src=`${DefaultPost}`}
                                        className="img-thumbnail mb-3"
                                        style={{width: "100%" , objectFit: "cover"}}
                                    ></img>
                                     <video controls
                                        style={{width: "100%" , objectFit: "cover"}}
                                        className="img-thumbnail mb-3 mt-3"
                                        src={`http://localhost:8080/post/video/${post._id}`}
                                        // onError={i=>i.target.src=`${DefaultVid}`}
                                    >
                                    
                                    
                                    Your browser does not support the tag
                                    </video> 

                                    {likes ? (<h5 onClick={this.likeToggle}><i className="fa fa-thumbs-up text-primary bg-dark" style={{padding: "10px",borderRadius:"50%"}}></i> {likes} Like</h5>)
                                    : (<h5 onClick={this.likeToggle}><i className="fa fa-thumbs-up" style={{padding: "10px",borderRadius:"50%"}}></i> {likes} Like</h5>)
                                    }
                                    
                                   
                                    
                                    <p className="card-text mark"><h5>{post.body}</h5></p><br/>
                                    <p className="font-italic mark">
                                         Posted By: <Link to={`/user/${posterId}`}>{posterName}</Link>
                                    </p>
                                    <p className="mark">{new Date(post.created).toDateString()}</p>
                                    <div className="d-inline-block">
                                        <Link to={`/`} className="btn btn-primary btn-raised btn-sm mr-5">Back TO Posts</Link>
                                        {isAuthenticated().user._id === posterId && <>
                                        <Link to={`/post/edit/${post._id}`} className="btn btn-warning btn-raised btn-sm mr-5">Update Post</Link>
                                        <button className="btn btn-danger btn-raised btn-sm" onClick={this.deleteConfirm}>Delete Post</button>
                                        </>
                                        }
                                    </div>
                                    
                                    <Comment postId={post._id} user={isAuthenticated().user} userId={isAuthenticated().user._id} token={isAuthenticated().token} updateComment={this.updateComment} comments={comments}/>
                                   
                                </div>
                            </div>
                            </div>
                            )
    }

    render(){
        const {post} = this.state;
        if(this.state.deleted)
            return <Redirect to="/" />
        return(
            <>
        <div className="container">
            <h2 className="mt-5 mb-5">{post.title}</h2>
            {this.renderPost(post)}
        </div>
       
        </>
        )
    }
}

export default SinglePost;