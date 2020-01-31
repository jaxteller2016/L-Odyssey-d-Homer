import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { BrowserRouter, NavLink } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import { connect } from  'react-redux';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: {
                email: "homer.simpson@wildcodeschool.fr",
                name: "Homer",
                lastname: "Simpson"
            }
        };
        this.updateField = this.updateField.bind(this)
    };
    updateField(event) {
        this.setState({[event.target.name]: event.target.value})
    }
    componentDidMount() {
        if (this.props.token) {
            fetch('/profile',
                {
                    headers: {
                        'Authorization': 'Bearer ' + this.props.token,
                    }
                })
                .then(res => {
                    if (res.ok)
                        return res.json()
                    else
                        throw  new Error(res.statusText)
                })
                .then(res => {
                    this.setState({profile: res.user})
                })
                .catch()
        }
    }

    render() {
        console.log(this.state.profile)
        return (
            <div>
            <List>
                <ListItem>
                    <ListItemText primary="email" secondary={this.state.profile.email}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary="First Name:" secondary={this.state.profile.name}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Last Name" secondary={this.state.profile.lastname}/>
                </ListItem>
                <div>
                    <Button type="submit" value="Submit" variant="contained" color="secondary" href="./signin">Sign Out</Button>
                </div>
            </List>
        </div>
        )
    };
}

function mapStateToProps(state) {
    return {
        token: state.auth.token,
    }
}

export default connect(mapStateToProps)(Profile);


