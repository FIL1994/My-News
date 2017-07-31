import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './pages/home';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'muicss/dist/css/mui.min.css';

export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider>
            <section className="mui-container">
                <Switch>
                    <Route exact path="/" component={Home}/>
                </Switch>
            </section>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}