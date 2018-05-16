import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Candidate from './components/candidate';
import UserView from './components/user';
import TransferView from './components/transfer';

class App extends React.Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={Candidate} />
        <Route path='/users' component={UserView} />
        <Route path='/transfers' component={TransferView} />
      </div>
    );
  }
}

export default App;
