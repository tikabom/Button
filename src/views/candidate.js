import React, { PropTypes } from 'react';

import {
  getCandidates
} from '../api';

class Candidate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: []
    }
  }

  componentWillMount() {
    getCandidates().then((candidates) => {
      this.setState({
        candidates
      });
    }).catch((err) => {
      console.log('error', err);
    });
  }

  onCandidateClick = (e, candidate) => {
    this.props.history.push({
      pathname: '/users',
      state: {
        candidate: candidate
      }
    });
  }
  
  render() {
    const candidateItems = this.state.candidates.map((candidate) =>
      <li key={candidate}>
        <a className='listItem' onClick={(e) => this.onCandidateClick(e,candidate)}>{candidate}</a>
      </li>
    );
    return (
      <div>
        <h1>Click on a namespace to get started</h1>
        <div>
          <ul>
            {candidateItems}
          </ul>
        </div>
      </div>
    );
  }
}

export default Candidate;
