import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { Redirect , Link} from 'react-router-dom';
import DefaultProfile from '../images/avatar.png';
import DeleteUser from './deleteuser';
import {read} from './apiUser';

class Profile extends Component{
    constructor(){
        super();
        this.state={
            user:"",
            redirectToSignin: false
        }
    }

    getUser=(userId)=>{
        const token=isAuthenticated().token;
        read(userId,token) 
        .then(data=>{
            if(data.error)
                this.setState({redirectToSignin: true});
            else
                this.setState({user: data});
        });
    }

    componentDidMount(){
        const userId=this.props.match.params.userId;
        this.getUser(userId);
    }

    componentWillReceiveProps(props){
        const userId=props.match.params.userId;
        this.getUser(userId);
    }

    render(){
        const {redirectToSignin,user}=this.state;
        if(redirectToSignin) return <Redirect to="/signin"/>
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <div className="row">
                    <div className="col-md-6">
                        
                        <img className="card-img-top" src={DefaultProfile} alt="Card image cap" style={{width: "50%",height: "15vw",objectFit: "cover"}}></img>
                        
                    </div>
                    <div className="col-md-6">
                    <div className="lead">
                        <p>
                        Hello {user.name}
                        </p>
                        <p>Email: {user.email}</p>
                        <p>
                            Joined {new Date(user.created).toDateString()}
                        </p>
                        </div>
                        {isAuthenticated().user && isAuthenticated().user._id===this.state.user._id &&
                        <>
                        <div className="d-inline-block mt-5 mr-3"><Link to={`/user/edit/${user._id}`} className="btn btn-primary btn-raised">Edit Profile</Link></div>
                        <DeleteUser userId={user._id}/>
                        
                        </>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;