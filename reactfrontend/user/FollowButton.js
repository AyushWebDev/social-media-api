import React, {Component} from 'react';
import {follow,unFollow} from './apiUser';

class FollowButton extends Component{
    followClick=()=>{
        this.props.onButtonClick(follow);
    }
    unfollowClick=()=>{
        this.props.onButtonClick(unFollow);
    }
    render(){
        return (
            <div className="d-inline-block mt-5">
                {!this.props.following ? 
                    <button className="btn btn-primary btn-raised" onClick={this.followClick}>Follow</button>
                    :
                    <button className="btn btn-default btn-raised" onClick={this.unfollowClick}>UnFollow</button>
                }
                
                
            </div>
        )
    }
}

export default FollowButton;