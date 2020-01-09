import React, {Component} from 'react';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state={
            input:''
};
            this.updateEmailField = this.updateEmailField.bind(this)
            // change code above this line
        }
        // change code below this line
    updateEmailField(event) {
        this.setState({[event.target.name]: event.target.value})
    }
   render() {

    return(
        <div>
            Enter your email
            <h1>{this.state.email}</h1>
            <input value={this.state.email} onChange={this.updateEmailField} type="email" name="email"/>
        </div>);
    }
}


export default SignUp