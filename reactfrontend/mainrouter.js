import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Menu from './core/menu'
import Home from './core/home';
import Signup from './user/signup';
import Signin from './user/signin';
import Profile from './user/profile';
import Users from './user/Users';
import EditProfile from './user/editprofile';

const MainRouter = () => {
    return (
    <div>
        <Menu/>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/signin" component={Signin}/>
            <Route exact path="/user/:userId" component={Profile}/>
            <Route exact path="/users" component={Users}/>
            <Route exact path="/user/edit/:userId" component={EditProfile}/>
        </Switch>
    </div> 
    );
};

export default MainRouter;