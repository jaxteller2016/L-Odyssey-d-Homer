import React, {Component} from 'react';
import {TextField} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { BrowserRouter, NavLink, Link, Route, Redirect, Switch } from 'react-router-dom';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state={
            input:'',
            email: "",
            password: "",
            confPassword: "",
            name: "",
            lastName: "",
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
        fetch("/auth/signup",
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
        <form className="FormControl" onSubmit={this.handleSubmit.bind(this)}>Sign up!
            {/*<h1>{this.state.email}</h1>*/}
            {/*<h1>{this.state.name}</h1>*/}
            {/*<h1>{this.state.lastName}</h1>*/}
        <div>

            <TextField value={this.state.email} onChange={this.updateField} type="email" name="email" id="standard-basic" label="Email"/>
        </div>
        <div>
            <TextField value={this.state.password} onChange={this.updateField} type="password" name="password" id="standard-basic" label="Password"/>
        </div>
        <div>
            <TextField value={this.state.confPassword} onChange={this.updateField} type="password" name="confPassword" id="standard-basic" label="Confirm your Password"/>
        </div>
        <div>
            <TextField value={this.state.name} onChange={this.updateField} type="name" name="name" id="standard-basic" label="First Name"/>
        </div>
        <div>
            <TextField value={this.state.lastName} onChange={this.updateField} type="name" name="lastName" id="standard-basic" label="Last Name"/>
        </div>
        <div>
            <Button type="submit" value="Submit" variant="contained" color="secondary" href="./">Submit</Button>
        </div>
        </form>
    <Snackbar open={this.state.flash} autoHideDuration={4000} >
        <Alert  severity= {(this.state.flash==="User has been signed up!") ? "success" : "error"} >
            {this.state.flash}
        </Alert>
    </Snackbar>
    <NavLink to="/signin">Already have an account? Sign In!</NavLink>
</div>
            );
    }
}
export default SignUp;