import React, {Component} from 'react';
import {TextField} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { BrowserRouter, NavLink, Link, Route, Redirect, Switch } from 'react-router-dom';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state={
            input:'',
            email: "",
            password: "",
            flash: null
        };
        this.updateField = this.updateField.bind(this)
    }
    updateField(event) {
        this.setState({[event.target.name]: event.target.value})
    }
    handleSubmit(event) {
        event.preventDefault()
        console.log(this.state)
        fetch("/auth/signin",
            {
                method:  'POST',
                headers:  new Headers({
                    'Content-Type':  'application/json'
                }),
                body:  JSON.stringify(this.state),
            })
            .then(res  =>  res.json())
            .then(
                res  =>  this.setState({"flash":  res.flash}),
                err  =>  this.setState({"flash":  err.flash})

            )
    }

    render() {
        return(
            <div>
                <form className="FormControl" onSubmit={this.handleSubmit.bind(this)}>Log in to your account!
                    <div>

                        <TextField value={this.state.email} onChange={this.updateField} type="email" name="email" id="standard-basic" label="Email"/>
                    </div>
                    <div>
                        <TextField value={this.state.password} onChange={this.updateField} type="password" name="password" id="standard-basic" label="Password"/>
                    </div>
                    <div>
                        <Button type="submit" value="Submit" variant="contained" color="secondary" href="./profile">Login</Button>
                    </div>
                </form>

                <Snackbar open={this.state.flash} autoHideDuration={4000} >
                    <Alert  severity= {(this.state.flash==="User has been signed up!") ? "success" : "error"} >
                        {this.state.flash}
                    </Alert>
                </Snackbar>
                <NavLink to="/signup">SignUp</NavLink>
            </div>
        );
    }
}
export default SignIn;