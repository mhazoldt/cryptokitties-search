import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import '../styles/App.css';
import '../styles/bootstrap-utilities.css';

import BaseLayout from './BaseLayout';
import Home from './Home';
import Sale from './Sale';
import Sire from './Sire';
import All from './All';


class App extends Component {

  render() {
    return (
      <Router>
        <BaseLayout>
          <Switch>
            <Route exact path="/sale" component={Sale} />
            <Route exact path="/sire" component={Sire} />
            <Route exact path="/all" component={All} />
            <Route path="/" component={Home} />
          </Switch>
        </BaseLayout>
      </Router>
    );
  }

}


export default App;