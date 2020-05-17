import React, {Component} from 'react';
import {singlePost,update} from './apiPost';
import {isAuthenticated} from '../auth';
import { Redirect, Link } from 'react-router-dom';
import DefaultPost from '../images/defaultPost.png';

class EditPost extends Component{
    constructor(){
        super();

        this.state={
            id: "",
            title: "",
            body: "",
            redirecttToProfile: "",
            error: "",
            fileSize: 0
        }
    }

    getPost=(postId)=>{
        const token=isAuthenticated().token;
        singlePost(postId,token)
        .then(data=>{
            if(data.error)
                this.setState({
                    redirecttToProfile: true
                })
            else{
                this.setState({
                    id: data._id,
                    title: data.title,
                    body: data.body,
                    error: ""
                })
            }
        })
    }

    handleChange=name=>event=>{
        this.setState({error: ""});

        const value=name=="photo" ? event.target.files[0] : event.target.value;
        const fileSize= name=="photo" ? event.target.files[0].size : 0;

        this.postData.set(name , value);
        this.setState({
            [name]: value,
            fileSize
        })
    }

    clickSubmit=event=>{
        event.preventDefault();

        if(this.isValid())
        {
            const postId=this.state.id;
            const token=isAuthenticated().token;

            update(postId,token,this.postData)
            .then(data=>{
                if(data.error)
                    this.setState({
                        error: data.error
                    })
                
                else
                {
                    this.setState({
                        title: "",
                        body: "",
                        photo: "",
                        redirectToProfile: true
                    })
                }
            })

        }
    }

    isValid=()=>{
        const {title,body} = this.state;

        if(title.length==0)
        {
            this.setState({error: "Title is required"});
            return false;
        }
        if(body.length==0)
        {
            this.setState({error: "Body is required"});
            return false;
        }
        return true;
    }


    componentDidMount(){
        this.postData=new FormData();
        const postId=this.props.match.params.postId;
        this.getPost(postId); 
    }

    render(){
        const {title,body}=this.state;
        if(this.state.redirectToProfile)
            return <Redirect to={`/user/${isAuthenticated().user._id}`}/>

        return(
            
           
                <div className="container">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                <h2 className="mt-5 mb-5">Edit Post</h2>

                    {this.state.error && <div className="alert alert-danger">
                        {this.state.error}
                    </div>
                    }
                     <img
                        src={`http://localhost:8080/post/photo/${this.state.id}?${new Date().getTime()}`}
                        alt={title}
                        onError={(event)=>event.target.src=`${DefaultPost}`}
                        className="img-thumbnail mb-3"
                        style={{width: "auto" , objectFit: "cover"}}
                        ></img>
                    <form>
                        <div className="form-group">
                            <label className="text-muted">Photo</label>
                            <input className="form-control" type="file" accept="image/*" onChange={this.handleChange("photo")}></input>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Title</label>
                            <input className="form-control" type="text" onChange={this.handleChange("title")} value={title}></input>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Body</label>
                            <textarea className="form-control" type="text" onChange={this.handleChange("body")} value={body}/>
                        </div>
                        <button onClick={this.clickSubmit} className="btn btn-primary btn-raised">Create Post</button>
                    </form>
                </div>
            </div>
            
        )
    }
    
}

export default EditPost;