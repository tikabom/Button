import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Candidate from './components/candidate';
import User from './components/user';

class App extends React.Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={Candidate} />
        <Route path='/user' component={User} />
      </div>
    );
  }
}

export default App;
