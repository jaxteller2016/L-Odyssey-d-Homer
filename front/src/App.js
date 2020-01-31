import React, {Component} from 'react';
import './App.css';
import SignUp from './containers/SignUp';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SignIn from './containers/SignIn';
import Profile from './containers/Profile';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import requireAuth from './hoc/requireAuth'
import requireNotAuth from './hoc/requireNotAuth'
import PopUp from "./containers/PopUp";

class App extends React.Component {
    render() {
        return(<MuiThemeProvider  >
            <Grid  container
                   alignItems='center'
                   style={{ height:  '100%' }}>
                <Grid  item xs={12}>
                    <Paper
                        elevation={4}
                        style={{ margin:  32 }}
                    >
                        <Grid  container
                               alignItems='center'
                               justify='center'>
                            <Grid  item  xs={12}  sm={6}

                                   style={{ 'text-align':  'center' }}>

                                <img  src="http://images.innoveduc.fr/react_odyssey_homer/wildhomer.png"  />

                            </Grid>
                            <Grid  item  sm={6} xs={12}
                                   alignContent='center'
                            >
                                <BrowserRouter>
                                    <Switch>
                                        <Redirect  exact  from='/'  to='/profile'  />
                                        <Route  exact  path="/profile"  component={requireAuth(Profile)}  />
                                        <Route  exact  path="/signin"  component={requireNotAuth(SignIn)}  />
                                        <Route  exact  path="/signup"  component={requireNotAuth(SignUp)}  />
                                    </Switch>
                                </BrowserRouter>
                                <PopUp/>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </MuiThemeProvider>);
    }
}

export default App;
