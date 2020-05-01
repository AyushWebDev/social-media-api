import React ,{Component} from 'react';
import {findPeople,follow} from './apiUser';
import DefaultProfile from '../images/avatar.png';
import {Link} from 'react-router-dom';
import {isAuthenticated} from '../auth';

class FindPeople extends Component{
    constructor(){
        super();
        this.state={
            users: []
        }
    }

    componentDidMount(){
        const userId=isAuthenticated().user._id;
        const token=isAuthenticated().token;
        findPeople(userId,token)
        .then(data=>{
            if(data.error)
                console.log(data.error)
            else{
                
                this.setState({users: data})
            }
        });
    }

    clickFollow=(user,i)=>{
        const userId=isAuthenticated().user._id;
        const token=isAuthenticated().token;
        follow(userId,token,user._id)
        .then(data=>{
            if(data.error)
            {
                this.setState({error: data.error})
            }
            else{
                let toFollow=this.state.users;
                toFollow.splice(i,1);
                this.setState({user: toFollow})
            }
        })
    }

    
    
    renderUsers=users=>(
        <div className="row">
            {
                        
                        users.map((user,i)=>(
                           
                               
                            <div className="card col-md-4 mt-4 mb-4 mr-3 ml-3" style={{width: "18rem"}}>
                                <img className="card-img-top" src={`http://localhost:8080/user/photo/${user._id}?${new Date().getTime()}`} alt={user.name} style={{width: "100%",height: "15vw",objectFit: "cover"}} 
                                onError={i=>{i.target.src=`${DefaultProfile}`}}
                                >

                                </img>
                                <div className="card-body">
                                    <h5 className="card-title">{user.name}</h5>
                                    <p className="card-text">{user.email}</p>
                                    <Link to={`/user/${user._id}`} className="btn btn-primary btn-raised btn-sm">View Profile</Link>
                                    <button className="btn btn-raised btn-primary float-right" onClick={()=>this.clickFollow(user,i)}>Follow</button>
                                </div>
                            </div>
                
                            
                           ))
                        
                        
            } 
        </div>
    )
        
    

    render(){
        const {users}=this.state;
        return(
            <div className="container mt-5 mb-5">
                <h2>People You May Know</h2>
                {this.renderUsers(users)}
            </div>
        )
    }
}

export default FindPeople;