import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import DefaultProfile from '../images/avatar.png';

class ProfileTab extends Component{
    render(){
        const {followers,following}=this.props
        return(
        <div className="container">
        <div className="row">
            <div className="col-md-4">
                <h4 className="mb-5 text-primary">Followers</h4>
                {
                    followers.map((person,i)=>(
                        <div key={i}>
                            
                           
                                <div> 
                                    <Link to={`/user/${person._id}`}>
                                        <img className="float-left mr-2"
                                        src={`http://localhost:8080/user/photo/${person._id}?${new Date().getTime()}`} 
                                        alt={person.name}
                                        height="30px"
                                        
                                        style={{borderRadius:"50%" , border:"2px solid black"}}
                                        width="30px"
                                        onError={i=>{i.target.src=`${DefaultProfile}`}}
                                        >
                                        
                                        </img>
                                       
                                        <div className="lead">{person.name}</div>
                                          
                                    </Link>
                                    <p>yes yes yes ......</p>
                                
                                </div>
                               
                            
                       </div>
                    ))
                }
            </div>

            <div className="col-md-4">
                <h4 className="mb-5 text-primary">Following</h4>
                {
                    following.map((person,i)=>(
                        <div key={i}>
                            
                           
                                <div> 
                                    <Link to={`/user/${person._id}`}>
                                        <img className="float-left mr-2"
                                        src={`http://localhost:8080/user/photo/${person._id}?${new Date().getTime()}`} 
                                        alt={person.name}
                                        height="30px"
                                        style={{borderRadius:"50%" , border:"2px solid black"}}
                                        width="30px"
                                        onError={i=>{i.target.src=`${DefaultProfile}`}}
                                        >
                                        
                                        </img> 
                                       
                                        <div className="lead">{person.name}</div>
                                          
                                    </Link>
                                    <p>No No No ......</p>
                                
                                </div>
                               
                            
                       </div>
                    ))
                }
            </div>

            {/* <div>
                Following
                {JSON.stringify(following)}
            </div> */}
        </div>
        </div>
        )
    }
}
export default ProfileTab;