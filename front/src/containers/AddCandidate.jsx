/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import AddCandidateComp from '../components/addcandidate';
import { createCandidate, getAllCandidates } from '../redux/action-creator/candidate-actions';
import Axios from 'axios';

class AddCandidate extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      status: 'New',
      message: '',
      allTags: [],
      selectedTags: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleTagSubmit = this.handleTagSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount () {
    this.props.getAllCandidates();
    Axios.get('/api/tags/retrieve')
      .then((allTags) => {
        this.setState({ allTags: allTags.data });
      });
  }

  handleSubmit (e) {
    e.preventDefault();
    if (!this.state.name || !this.state.surname || !this.state.email || !this.state.telNumber) {
      this.setState({ message: 'You must complete required fields in order to continue.' });
    } else if (this.state.email.indexOf('@') === -1 || this.state.email.indexOf('.com') === -1) {
      this.setState({ message: 'Invalid Email format' });
    } else {
      for (let i = 0; i < this.props.candidates.length; i += 1) {
        if (this.props.candidates[i].email === this.state.email) {
          return this.setState({ message: 'The email entered is already in use' });
        }
      }
      this.props.createCandidate(this.state)
        .then(() => this.setState({ message: 'Successfully saved Candidate' }));
    }
  }

  handleChange (e) {
    this.setState(
      { [e.target.name]: e.target.value });
  }

  handleTagSubmit (e) {
    e.preventDefault();
    console.log('ALLTAGS', this.state.allTags);
    let index = e.target.value;
    console.log('INDEX', index);
    let arr = this.state.selectedTags;
    let found = arr.find((element) => {
      if (element.id === this.state.allTags[index].id) {
        return element;
      }
    });

    if (!found) {
      arr.push(this.state.allTags[index]);
      this.setState({ selectedTags: arr });
      console.log('STATE', this.state.selectedTags);
    } else {
      alert('The tag was aleady added');
    }
  }

  onClick () {
    this.state.message === 'Successfully saved Candidate' && this.props.history.push('/candidates/allCandidates');
  }

  handleDelete (e) {
    let toDelete = e.target.getAttribute('value');
    console.log('TODELETE', toDelete);
    let arr = this.state.selectedTags;
    arr.splice(toDelete, 1);
    this.setState({ selectedTags: arr });
  };

  render () {
    console.log('Url', this.state.url);
    return (
      <AddCandidateComp
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        message={this.state.message}
        onClick={this.onClick}
        handleDelete={this.handleDelete}
        allTags={this.state.allTags}
        handleTagSubmit={this.handleTagSubmit}
        selectedTags={this.state.selectedTags}
      />
    );
  }
}
const mapStateToProps = (state) => ({
  candidate: state.candidate.candidate,
  candidates: state.candidate.candidates
});

const mapDispatchToProps = (dispatch) => ({
  createCandidate: (candidate) => dispatch(createCandidate(candidate)),
  getAllCandidates: () => dispatch(getAllCandidates())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCandidate);
