import React, {Component} from 'react';
import {read , update} from './apiUser';
import {isAuthenticated} from '../auth';
import { Redirect, Link } from 'react-router-dom';

class EditProfile extends Component{
    constructor(){
        super();
        this.state={
            id:"",
            name: "",
            email: "",
            password: "",
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
                    email: data.email
                })
            }
        })
    }

    componentDidMount(){
        const userId=this.props.match.params.userId;
        this.getUser(userId); 
    }

    handleChange=name=>event=>{
        this.setState({
            [name]: event.target.value,
            error: "" 
        }); 
    };

    isValid=()=>{
        const {name,email,password}=this.state;
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
            const {name,email,password}=this.state;
            const user={
                name,    
                email,
                password: password||undefined
            };
            
            const userId=this.props.match.params.userId;
            const token=isAuthenticated().token;
            update(userId,token,user)
            .then(data=>{ 
                if(data.error){
                    this.setState({error: data.error});
                }
                else{
                    this.setState({
                    redirectToProfile: true
                    });
                }
            });
        }
        
    };

    render(){
        const {redirectToProfile,id}=this.state;
        if(redirectToProfile)
            return <Redirect to={`/user/${id}`}/>
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
                    <form>
                        <div className="form-group">
                            <label className="text-muted">Name</label>
                            <input onChange={this.handleChange("name")} type="text" className="form-control" value={this.state.name}/>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Email</label>
                            <input onChange={this.handleChange("email")} type="email" className="form-control" value={this.state.email}/>
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