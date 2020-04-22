import React, { Component } from 'react';
import { signup } from '../auth';
import {Link} from 'react-router-dom';

class Signup extends Component {
    constructor(){
        super()
        this.state={
            name: "",
            email: "",
            password: "",
            error: "",
            open: false
        }
    }

    handleChange=name=>event=>{
        this.setState({
            [name]: event.target.value,
            error: "" 
        }); 
    };

    clickSubmit=event=>{
        event.preventDefault();
        const {name,email,password}=this.state;
        const user={
            name,    
            email,
            password
        };
        
        signup(user)
        .then(data=>{ 
            if(data.error){
                this.setState({error: data.error});
            }
            else{
                this.setState({
                    error: "",
                    name: "",
                    email: "",
                    password: "",
                    open: true
                });
            }
        });
        
    };

    

    render(){
        return(
            <div className="container">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <h2 className="mt-5 mb-5">Signup</h2>
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
                        <button onClick={this.clickSubmit} className="btn btn-primary btn-raised">Submit</button>
                    </form>
                </div>
                
            </div>
        );
    }
}

export default Signup;