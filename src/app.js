import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Candidate from './views/candidate';
import UserView from './views/user';
import TransferView from './views/transfer';

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
