import React, {Component} from 'react';

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
            flash: ""
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
        <form onSubmit={this.handleSubmit.bind(this)}>
            <h1>{this.state.email}</h1>
            <h1>{this.state.name}</h1>
            <h1>{this.state.lastName}</h1>
        <div>
            Enter your email
            <input value={this.state.email} onChange={this.updateField} type="email" name="email"/>
        </div>
        <div>
            Enter your Password
            <input value={this.state.password} onChange={this.updateField} type="password" name="password"/>
        </div>
        <div>
            Confirm your Password
            <input value={this.state.confPassword} onChange={this.updateField} type="password" name="confPassword"/>
        </div>
        <div>
            Enter your First Name
            <input value={this.state.name} onChange={this.updateField} type="name" name="name"/>
        </div>
        <div>
            Enter your Last Name
            <input value={this.state.lastName} onChange={this.updateField} type="name" name="lastName"/>
        </div>
            <input type="submit" value="Submit"/>
        </form>
            );
    }
}

export default SignUp