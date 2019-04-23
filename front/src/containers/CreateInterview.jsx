/* eslint-disable no-unused-vars */
import React from 'react';
import CreateInterviewComp from '../components/CreateInterviewComp';
import ReportComp from '../components/ReportComp';
import { connect } from 'react-redux';
import { fetchCandidate } from '../redux/action-creator/candidate-actions';
import { searchHRQuestions } from '../redux/action-creator/questionActions';
import { submitHRAnswers, fetchHrAnswers } from '../redux/action-creator/answersActions';

class CreateInterview extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      interviewID: this.props.idInter,
      submitted: false

    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount () {
    this.props.searchHRQuestions();
    this.props.fetchCandidate(this.props.idCand);
    this.props.fetchHrAnswers(this.props.idInter);

    // this.state.submitted && this.setState({ submitted: false });
  }

  handleChange (e) {
    this.setState(
      { [e.target.name]: e.target.value });
  }

  onSubmit (e) {
    e.preventDefault();
    let a = this.state;
    this.props.submitHRAnswers(a)
      .then(() => {
        this.setState({ submitted: true });
      });
  }

  render () {
    return (
      !this.state.submitted && !this.props.answersHR.length && this.props.candidate.status === 'New'
        ? <CreateInterviewComp
          onSubmit={this.onSubmit}
          onChange={this.handleChange}
          questions={this.props.questionsHR}
          candidate={this.props.candidate}
          idInter={this.props.idInter}
        />
        : <ReportComp
          questions={this.props.questionsHR}
          idCand={this.props.idCand}
          candidate={this.props.candidate}
          idInter={this.props.idInter}
          history={this.props.history}
        />
    );
  }
}

const mapStateToProps = (state) => ({
  candidate: state.candidate.candidate,
  questionsHR: state.question.questionsHR,
  answersHR: state.answers.answersHR
});

const mapDispatchToProps = (dispatch) => ({
  fetchCandidate: (idCandi) => dispatch(fetchCandidate(idCandi)),
  searchHRQuestions: () => dispatch(searchHRQuestions()),
  submitHRAnswers: (state) => dispatch(submitHRAnswers(state)),
  fetchHrAnswers: (interviewID) => dispatch(fetchHrAnswers(interviewID))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateInterview);
