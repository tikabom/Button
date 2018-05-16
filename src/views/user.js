import React from 'react';

import TableView from '../components/tableview';

import {
  getUsers,
  addUser,
  deleteUser
} from '../api';

import './user.css';

class UserView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      candidate: 'FULLSTACK',
      createUser: false,
      id: null,
      name: '',
      email: ''
    };
  }

  componentWillMount() {
    let candidate = this.props.location.state.candidate || 'FULLSTACK';
    getUsers(candidate).then((users) => {
      this.setState({
        users,
        candidate
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  navigateToCandidates = () => {
    this.props.history.push('/');
  }

  navigateToTransfers = () => {
    this.props.history.push({
      pathname: '/transfers',
      state: {
        userID: this.state.id,
        candidate: this.state.candidate
      }
    });
  }

  onUserSelectionChanged = (id) => {
    this.setState({ id });
  }

  onUserAdd = (e) => {
    e.preventDefault();
    let user = {
      name: this.state.name,
      email: this.state.email,
      candidate: this.state.candidate
    };
    addUser(user).then((userWithID) => {
      if (userWithID.id) {
        getUsers(this.state.candidate).then((users) => {
          this.setState({
            users,
            createUser: false,
            name: '',
            email: '',
            id: null
          });
        }).catch((err) => {
          console.log('error adding user', err);
        });
      } else {
        console.log('error adding user', userWithID);
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  onUserDelete = () => {
    deleteUser(this.state.id, this.state.candidate).then((out) => {
      if (out) {
        getUsers(this.state.candidate).then((users) => {
          this.setState({
            users,
            id: null
          });
        }).catch((err) => {
          console.log('error deleting user with id', this.state.id, err);
        });
      } else {
        console.log('error deleting user with id ', this.state.id);
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <h2>NAMESPACE: {this.state.candidate}</h2>
        <div className='add'>
          <input type='button' value='Add User'
          onClick={() => { this.setState({createUser: true}); }}/>
        </div>
        {this.state.createUser && (
          <form onSubmit={this.onUserAdd}>
            <label>
              Name:
              <input
                type='text'
                value={this.state.name}
                onChange={(e) => { this.setState({name: e.target.value}); }}
                required
              />
            </label>
            <label>
              Email:
              <input
                type='email'
                value={this.state.email}
                onChange={(e) => { this.setState({email: e.target.value}); }}
                required
              />
            </label>
            <input type='submit' value='Submit' />
          </form>
        )}
        <TableView
          tableData={this.state.users}
          onDelete={this.onUserDelete}
          onSelectionChanged={this.onUserSelectionChanged} />
        <div className='delete'>
          <input type='button' value='Delete User' onClick={this.onUserDelete} disabled={!this.state.id} />
        </div>
        <div className='view'>
          <input type='button' value='View Transfers' onClick={this.navigateToTransfers} disabled={!this.state.id} />
        </div>
        <div>
          <a onClick={this.navigateToCandidates}>Back to Candidates</a>
        </div>
      </div>
    );
  }
}

export default UserView;
