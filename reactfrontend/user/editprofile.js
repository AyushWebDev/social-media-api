import React, {Component} from 'react';
import {read , update , updateUser} from './apiUser';
import {isAuthenticated} from '../auth';
import { Redirect, Link } from 'react-router-dom';
import DefaultProfile from '../images/avatar.png'

class EditProfile extends Component{
    constructor(){
        super();
        this.state={
            id:"",
            name: "",
            email: "",
            about: "",
            password: "",
            fileSize: 0,
            redirectToProfile: false,
            error: ""
        }
    }

    getUser=(userId)=>{
        const token=isAuthenticated().token;
        read(userId,token)
        .then(data=>{
            if(data.error)
                this.setState({
                    redirecttToProfile: true
                })
            else{
                this.setState({
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    about: data.about
                })
            }
        })
    }

    componentDidMount(){
        this.userData=new FormData();
        const userId=this.props.match.params.userId;
        this.getUser(userId); 
    }

    handleChange=name=>event=>{
        const value= name=== 'photo' ? event.target.files[0] : event.target.value
        const fileSize=name==='photo'?event.target.files[0].size:0;
        this.userData.set(name,value);
        this.setState({
            [name]: value,
            error: "" ,
            fileSize
        }); 
    };

    isValid=()=>{
        const {name,email,password,fileSize}=this.state;
        if(fileSize>100000){
            this.setState({
                error: "File Size should be less than 100kb"
            })
            return false
        }

        if(name.length==0)
        {
            this.setState({
                error: "Name is required"
            })
            return false;
        }

        if(!/.+\@.+\..+/.test(email))
        {
            this.setState({
                error: "A valid email is required"
            })
            return false;
        }

        if(password.length>=1 && password.length<=5)
        {
            this.setState({
                error: "Password should contain atleast six letters"
            })
            return false;
        }
        return true;
    }

    clickSubmit=event=>{
        event.preventDefault();
        if(this.isValid()){
            const {name,email,password,about}=this.state;
            const user={
                name,    
                email,
                about,
                password: password||undefined
            };
            
            const userId=this.props.match.params.userId;
            const token=isAuthenticated().token;
            update(userId,token,this.userData)
            .then(data=>{ 
                if(data.error){
                    this.setState({error: data.error});
                }
                else{
                    updateUser(data,()=>{
                        this.setState({
                            redirectToProfile: true
                            });
                    })
                    
                }
            });
        }
        
    };

   
    render(){
        const {redirectToProfile,id}=this.state;
        if(redirectToProfile)
            return <Redirect to={`/user/${id}`}/>
        
        const photoUrl=id?`http://localhost:8080/user/photo/${id}?${new Date().getTime()}`:DefaultProfile;

        return(
            <div className="container">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <h2 className="mt-5 mb-5">Edit Profile</h2>
                    {this.state.error && <div className="alert alert-danger">
                        {this.state.error}
                    </div>
                    }
                     {this.state.open && <div className="alert alert-primary">
                        New Account Has Been Created.Please <Link to="/signin">Sign In</Link>
                    </div>
                    }
                    
                    <img src={photoUrl} alt={this.state.name} style={{height: "200px", width: "auto"}} className="img-thumbnail"
                    onError={i=>{i.target.src=`${DefaultProfile}`}}></img>

                    <form>
                        <div className="form-group">
                            <label className="text-muted">Profile Photo</label>
                            <input onChange={this.handleChange("photo")} type="file" accept="image/*" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Name</label>
                            <input onChange={this.handleChange("name")} type="text" className="form-control" value={this.state.name}/>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Email</label>
                            <input onChange={this.handleChange("email")} type="email" className="form-control" value={this.state.email}/>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">About</label>
                            <textarea onChange={this.handleChange("about")} type="text" className="form-control" value={this.state.about}></textarea>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Password</label>
                            <input onChange={this.handleChange("password")} type="password" className="form-control" value={this.state.password}/>
                        </div>
                        <button onClick={this.clickSubmit} className="btn btn-primary btn-raised">Update</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default EditProfile;