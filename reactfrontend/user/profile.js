import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { Redirect , Link} from 'react-router-dom';
import DefaultProfile from '../images/avatar.png';
import DeleteUser from './deleteuser';
import {read} from './apiUser';
import FollowButton from './FollowButton';
import ProfileTab from './ProfileTab';

class Profile extends Component{
    constructor(){
        super();
        this.state={
            user:{followers: [],following:[]},
            following: false,
            redirectToSignin: false,
            error: ""
        }
    }

    getUser=(userId)=>{
        const token=isAuthenticated().token;
        read(userId,token) 
        .then(data=>{
            if(data.error)
                this.setState({redirectToSignin: true});
            else{
                let following=this.checkFollow(data);
                this.setState({user: data,following});
            }
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

    //check Follow
    checkFollow=user=>{
        const jwt=isAuthenticated();
        const match=user.followers.find(follower=>{
            return follower._id===jwt.user._id;
        })
        return match;
    }

    callFollowApi=callApi=>{
        const followId=this.state.user._id;
        const userId=isAuthenticated().user._id;
        const token=isAuthenticated().token;
        callApi(userId,token,followId)
        .then(data=>{
            if(data.error)
            {
                this.setState({error: data.error})
            }
            else{
                this.setState({user:data,following: !this.state.following})
            }
        })
    }

    render(){
        const {redirectToSignin,user}=this.state;
        if(redirectToSignin) return <Redirect to="/signin"/>

        const photoUrl=user._id?`http://localhost:8080/user/photo/${user._id}?${new Date().getTime()}`:DefaultProfile;

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <div className="row">
                    <div className="col-md-6">
                        
                        <img className="card-img-top" src={photoUrl} alt="Card image cap" style={{width: "50%",height: "15vw",objectFit: "cover"}} 
                        onError={i=>{i.target.src=`${DefaultProfile}`}}
                        >

                        </img>
                        
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
                        {isAuthenticated().user && isAuthenticated().user._id===this.state.user._id ?
                        <>
                        <div className="d-inline-block mt-5 mr-3"><Link to={`/user/edit/${user._id}`} className="btn btn-primary btn-raised">Edit Profile</Link></div>
                        <DeleteUser userId={user._id}/>
                        
                        </>
                        : (<FollowButton following={this.state.following} onButtonClick={this.callFollowApi}/>)}

                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 mt-5 mb-5">
                        <hr/>
                        <h5 style={{fontFamily: "calibri",fontWeight: "900"}}>About</h5>
                    <p className="lead" style={{fontFamily: "cursive"}}>
                       {user.about}
                    </p>
                        <hr/>
                    </div>

                    <hr/>
                        <ProfileTab followers={user.followers} following={user.following}/>
                </div>
            </div>
        );
    }
}

export default Profile;