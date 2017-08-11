import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './pages/home';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue100, blue500, blue700, cyan100, cyan500, cyan700, white} from 'material-ui/styles/colors';
import 'react-flexbox-grid/lib/index.css';

const muiTheme = getMuiTheme(
  {
    fontFamily: 'Roboto, sans-serif',
    palette: {
      primary1Color: blue500,
      primary2Color: blue700,
      primary3Color: blue100,
      accent1Color: cyan500,
      accent2Color: cyan700,
      accent3Color: cyan100,
      canvasColor : white
    },
  },
  {
    avatar: {
      borderColor: null,
    }
  });

export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider muiTheme={muiTheme}>
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