//app component
import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './pages/home';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
            <section className="container">
                <Switch>
                    <Route exact path="/" component={Home}/>
                </Switch>
            </section>
        </div>
      </BrowserRouter>
    );
  }
}
