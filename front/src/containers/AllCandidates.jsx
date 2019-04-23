/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import AllCandidatesComp from '../components/allCandidates';
import { getAllCandidates, fetchMyCandidates } from '../redux/action-creator/candidate-actions';
import { getAllUsers } from '../redux/action-creator/user-actions';
import { Link } from 'react-router-dom';
import { STATUS_CODES } from 'http';

class AllCandidates extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      input: ''
      // candidatos: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount () {
    this.props.getAllUsers();
  }

  handleChange (e) {
    this.setState({ input: e.target.value });
  }

  render () {
    console.log('EL ESTADO LOCAL', this.state);
    console.log('LAS PRROPSSSSS', this.props);
    return (
      this.state.candidatos && this.state.candidatos.length < 1 ? <div><h2>No candidates to show</h2> <div style={{ padding: '30px 50px' }}><Link to="/candidates/addCandidate"><button className="btn btn-lg botonHome">Add Candidate</button></Link></div></div>
        : <AllCandidatesComp
          handleCandClick={this.handleCandClick}
          input={this.state.input}
          handleChange={this.handleChange}
          // candidates={this.state.candidatos}
          onClick={this.onClick}
          match={this.props.match}
          history={this.props.history}
          users={this.props.users}
          user={this.props.user}
          moreDetails={this.moreDetails} />
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  users: state.user.users,
  candidates: state.candidate.candidates,
  myCandidates: state.candidate.myCandidates
});
const mapDispatchToProps = (dispatch) => ({
  getAllCandidates: () => dispatch(getAllCandidates()),
  getAllUsers: () => dispatch(getAllUsers()),
  fetchMyCandidates: (id) => dispatch(fetchMyCandidates(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllCandidates);
