import React ,{ Component } from 'react';
import { create } from './apiPost';
import {isAuthenticated} from '../auth';
import { Redirect, Link } from 'react-router-dom';
import DefaultProfile from '../images/avatar.png'

class NewPost extends Component{
    constructor(){
        super();
        this.state={
            title: "",
            body: "",
            photo: "",
            error: "",
            user:{},
            fileSize: 0,
            redirectToProfile: false
        }
    }
    componentDidMount(){
        this.postData=new FormData();
        this.setState({user: isAuthenticated().user});
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
            const userId=isAuthenticated().user._id;
            const token=isAuthenticated().token;

            create(userId,token,this.postData)
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

    render(){
        const {title,body,photo,user,redirectToProfile}=this.state;

        if(redirectToProfile)
            return <Redirect to={`/user/${user._id}`}/>
        return (
            <div className="container">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <h2 className="mt-5 mb-5">Create Post</h2>

                    {this.state.error && <div className="alert alert-danger">
                        {this.state.error}
                    </div>
                    }
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

export default NewPost;