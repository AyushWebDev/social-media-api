import React,{ Component } from 'react';
import { Redirect } from 'react-router-dom';
import { signin, authenticate } from '../auth';

class Signin extends Component{
    constructor(){
        super();
        this.state={
            email: "",
            password: "",
            error: "",
            open: false,
            redirectToReferer: false,
            loading: false
        };
    }

        handleChange=name=>event=>{
            this.setState({
                [name]: event.target.value,
                error: ""
            });
        };

        clickSubmit=event=>{
            event.preventDefault();

            this.setState({
                loading: true
            })

            const {email,password}=this.state;
            const user={
                email,
                password
            };

            signin(user)
            .then(data=>{
                if(data.error)
                    this.setState({error: data.error,loading: false});
                else{
                    //authenticate
                    authenticate(data,()=>{
                        this.setState({
                            redirectToReferer: true
                        });
                    });

                    // this.setState({
                    //     email: "",
                    //     password: "",
                    //     error: "",
                    //     open: true
                    // });
                }
            });
            
        };

        

        render(){
            const {email,password,redirectToReferer}=this.state;

            if(redirectToReferer)
            {
                return <Redirect to="/"/>
            }
            return(
                <div className="container">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <h2 className="mt-5 mb-5">Signin</h2>

                        {this.state.error && <div className="alert alert-danger">
                            {this.state.error}
                        </div>}
                        {this.state.open && <div className="alert alert-info">
                            Signed In Successfully
                        </div>}

                        {this.state.loading ? <div className="jumbotron">
                            <h2>Loading...</h2>
                        </div>: ""}

                        <form>
                            <div className="form-group">
                                <label className="text-muted">Email</label>
                                <input onChange={this.handleChange("email")} type="email" className="form-control" value={email}/>
                            </div>
                            <div className="form-group">
                                <label className="text-muted">Password</label>
                                <input onChange={this.handleChange("password")} type="password" className="form-control" value={password}/>
                            </div>
                            <button onClick={this.clickSubmit} className="btn btn-primary btn-raised">Submit</button>
                        </form>
                    </div>
                </div>
            );
        }
    }


export default Signin;