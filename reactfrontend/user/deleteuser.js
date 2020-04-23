import React , {Component} from 'react';
import {isAuthenticated} from '../auth';
import {removeUser} from './apiUser';
import {signout} from '../auth';
import {Redirect} from 'react-router-dom';

class DeleteUser extends Component{
    state={
        redirect: false
    }

    deleteAccount=()=>{
        const token = isAuthenticated().token;
        const userId=this.props.userId;
        removeUser(userId,token)
        .then(data=>{
            if(data.error)
                console.log(data.error);
            else{
                signout(()=>console.log("User is Deleted"))
                this.setState({redirect: true})
            }
        })
    }
    
    deleteConfirmed=()=>{
        let answer= window.confirm("Are You Sure You Want To Delete Your Account");
        if(answer){
            this.deleteAccount();
        } 
    }

    render(){
        if(this.state.redirect){
            return <Redirect to="/"/>
        }
        return(
            <div className="d-inline-block mt-5">
            <button onClick={this.deleteConfirmed} className="btn btn-danger btn-raised">
                Delete Profile
            </button>
            </div>
        )
    }
}

export default DeleteUser;