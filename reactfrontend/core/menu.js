import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';

const isActive=(history,path)=>{
    
        if(history.location.pathname===path)
            return {color: "red"};
        else
            return {color: "white"};
    
};


const Menu=({history})=>{
    return (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" to="/" style={isActive(history,"/")}>Home</Link> 
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/users" style={isActive(history,"/users")}>Users</Link> 
            </li>

            {!isAuthenticated() &&
            <>
            <li className="nav-item">
                <Link className="nav-link" to="/signup" style={isActive(history,"/signup")}>Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signin" style={isActive(history,"/signin")}>Sign In</Link>
            </li>
            </>
            }  
            {isAuthenticated() &&
            <>
            <li className="nav-item">
                <a className="nav-link" onClick={()=>signout(()=>{history.push('/')})} style={{cursor: "pointer"}}>Sign Out</a>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={`/user/${isAuthenticated().user._id}`} style={isActive(history,`/user/${isAuthenticated().user._id}`)}>{isAuthenticated().user.name}</Link>
            </li>
            </>
            }       
                 
  
        </ul>
    </div>
    );
};


export default withRouter(Menu);