import React ,{Component} from 'react';
import {list} from './apiPost';
import DefaultPost from '../images/defaultPost.png';
import {Link} from 'react-router-dom';
import {isAuthenticated} from '../auth';

class Posts extends Component{
    constructor(){
        super();
        this.state={
            posts: []
        }
    }

    componentDidMount(){
        list(isAuthenticated().token)
        .then(data=>{
            if(data.error)
                console.log(data.error)
            else
                this.setState({posts: data})
        });
    }

    
    
    // renderPosts=posts=>(
        
    //     <div className="row">
    //         {
                        
    //                     posts.map((post,i)=>(
                            
    //                     //    const posterId=post.postedBy? post.postedBy._id : ""
    //                     //    const posterName=post.postedBy? post.postedBy.name : ""

                            
    //                         <div className="card col-md-4 mt-4 mb-4 mr-3 ml-3" style={{width: "18rem"}} key={i}>
                                
    //                             <div className="card-body">
    //                                 <h5 className="card-title">{post.title}</h5>
    //                                 <p className="card-text">{post.body}</p>
    //                                 <Link to={`/post/${post._id}`} className="btn btn-primary btn-raised btn-sm">Read More</Link>
    //                             </div>
    //                         </div>
                
                            
    //                     ))                        
                        
    //         } 
    //     </div>
    // )

    renderPosts=posts=>{
        return (
            <div className="row">
            {
                        
                        posts.map((post,i)=>{
                            const posterId=post.postedBy? post.postedBy._id : ""
                            const posterName=post.postedBy? post.postedBy.name : ""
                            const dotted=post.body.length<20 ? "" : "........"
                            
                            return (
                            <div className="card col-md-4 mt-4 mb-4 mr-3 ml-3" style={{width: "18rem"}} key={i}>
                                
                                <div className="card-body">
                                    <img
                                        src={`http://localhost:8080/post/photo/${post._id}`}
                                        alt={post.title}
                                        onError={i=>i.target.src=`${DefaultPost}`}
                                        className="img-thumbnail mb-3"
                                    ></img>
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text">{post.body.substring(0,100)} {dotted}</p><br/>
                                    <p className="font-italic mark">
                                         Posted By: <Link to={`/user/${posterId}`}>{posterName}</Link>
                                    </p>
                                    <p className="mark">{new Date(post.created).toDateString()}</p>
                                    <Link to={`/post/${post._id}`} className="btn btn-primary btn-raised btn-sm">Read More</Link>
                                </div>
                            </div>
                            );
                        })                   
                        
            }     
        </div>
        )
    }
        
        
        
        
    

    render(){
        const {posts}=this.state;
        return(
            <div className="container mt-5 mb-5">
                <h2>Posts</h2>
                {this.renderPosts(posts)}
            </div>
        )
    }
}

export default Posts;