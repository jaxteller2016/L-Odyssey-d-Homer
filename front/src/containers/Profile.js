import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { BrowserRouter, NavLink } from 'react-router-dom';
import Button from "@material-ui/core/Button";

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
    render() {
        return (
            <div>
            <List>
                <ListItem>
                    <ListItemText primary="email" secondary="my email"/>{this.state.profile.email}
                </ListItem>
                <ListItem>
                    <ListItemText primary="First Name:" secondary="my Name:"/>{this.state.profile.name}
                </ListItem>
                <ListItem>
                    <ListItemText primary="Last Name" secondary="my Last name:"/>{this.state.profile.lastname}
                </ListItem>
                <div>
                    <Button type="submit" value="Submit" variant="contained" color="secondary" href="./signin">Sign Out</Button>
                </div>
            </List>
        </div>
        )
    };
}
export default Profile;


