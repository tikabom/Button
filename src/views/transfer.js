import React from 'react';

import TableView from '../components/tableview';

import {
  getTransfers,
  createTransfer,
} from '../api';

import './transfer.css';

class TransferView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      transfers: [],
      candidate: 'FULLSTACK',
      userID: null,
      amount: '',
      createTransfer: false
    };
  }

  componentWillMount() {
    let candidate = this.props.location.state.candidate || 'FULLSTACK';
    let userID = this.props.location.state.userID;
    getTransfers(userID, candidate).then((transfers) => {
      this.setState({
        transfers,
        candidate,
        userID
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  navigateToCandidates = () => {
    this.props.history.push('/');
  }

  navigateToUsers = () => {
    this.props.history.push({
      pathname: '/users',
      state: {
        candidate: this.state.candidate
      }
    });
  }

  onTransferCreate = (e) => {
    e.preventDefault();
    let transfer = {
      amount: this.state.amount,
      user_id: this.state.userID,
      candidate: this.state.candidate
    };
    createTransfer(transfer).then(() => {
      getTransfers(this.state.userID, this.state.candidate).then((transfers) => {
        this.setState({
          transfers,
          amount: '',
          createTransfer: false
        });
      }).catch((err) => {
        console.log('error creating transfer', err);
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <h2>NAMESPACE: {this.state.candidate}</h2>
        <div class='add'>
          <input type='button' value='Create Transfer'
          onClick={() => { this.setState({createTransfer: true}); }}/>
        </div>
        {this.state.createTransfer && (
          <form onSubmit={this.onTransferCreate}>
            <label>
              Amount:
              <input
                type='text'
                value={this.state.amount}
                onChange={(e) => { this.setState({amount: e.target.value}); }}
                required
              />
            </label>
            <input type='submit' value='Submit' />
          </form>
        )}
        <TableView tableData={this.state.transfers} />
        <div>
          <a onClick={this.navigateToUsers}>Back to Users</a>
        </div>
        <div>
          <a onClick={this.navigateToCandidates}>Back to Candidates</a>
        </div>
      </div>
    );
  }
}

export default TransferView;
