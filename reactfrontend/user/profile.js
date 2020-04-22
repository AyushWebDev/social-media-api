import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom';

class Profile extends Component{
    constructor(){
        super();
        this.state={
            user:"",
            redirectToSignin: false
        }
    }

    componentDidMount(){
        const userId=this.props.match.params.userId;
        fetch(`http://localhost:8080/user/${userId}`,{
            method: "GET",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        })
        .then(response=>{
            return response.json();
        })
        .then(data=>{
            if(data.error)
                this.setState({redirectToSignin: true});
            else
                this.setState({user: data});
        });
    }

    render(){
        const redirectToSignin=this.state.redirectToSignin;
        if(redirectToSignin) return <Redirect to="/signin"/>
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="mt-5 mb-5">Profile</h2>
                        <p>
                        Hello {isAuthenticated().user.name}
                        </p>
                        <p>Email: {isAuthenticated().user.email}</p>
                        <p>
                            Joined {new Date(this.state.user.created).toDateString()}
                        </p>
                    </div>
                    <div className="col-md-6">
                        {isAuthenticated().user && isAuthenticated().user._id===this.state.user._id &&
                        <>
                        <div className="d-inline-block mt-5 mr-3"><button className="btn btn-primary btn-raised">Edit Profile</button></div>
                        <div className="d-inline-block mt-5"><button className="btn btn-danger btn-raised">Delete Profile</button></div>
                        </>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;