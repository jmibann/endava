/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';

import { fetchCandidate } from '../redux/action-creator/candidate-actions';
import { fetchSisQuestions } from '../redux/action-creator/questionActions';
import { answerSystems } from '../redux/action-creator/answersActions';
import InterviewSisComp from '../components/interviewSisComp';
import Axios from 'axios'

class InterviewSisCont extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      // messege: ''

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount () {
    this.props.fetchCandidate(this.props.idCand)
      .then(data => {
        this.props.fetchSisQuestions(data.candidate.InterviewIDId);
        this.setState({
          InterviewSis: data.candidate.InterviewIDId
        });
      });
  }
  handleSubmit (e) {
    e.preventDefault();
    console.log(this.state);
    this.props.answerSystems(this.state)

      .then(error => {
        if (error) {
          console.log('el error es:', error);
          this.setState({ messege: error });
        } else {
          console.log('successfully saved candidate');
          this.setState({ messege: 'successfully saved candidate' });
        }
      });
  }

  handleChange (e) {
    //    PARA TRABAJAR CON OBS DE ENTREVITA GENERAL

    //    e.target.name === 'observationsInterviewSis'
    //   ? this.setState({ [e.target.name]: e.target.value })
    //   : this.setState({ [e.target.id + '-' + e.target.name]: e.target.value });
    // console.log(this.state);

    this.setState({ [e.target.id + '-' + e.target.name]: e.target.value });
    console.log(this.state);
  }
  onClick () {
    Axios.put('/api/candidate/changeStatus', { 
      idCandi: this.props.candidate.id,
      status: 'Pending Tech' })
      .then(() => this.props.history.push(`/candidates/${this.props.idCand}/interview/sist/${this.props.candidate.InterviewIDId}`));
  }

  render () {
    // console.log('las props que llegan a entrevista de sistemas', this.props);
    return (
      <InterviewSisComp

        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        questions={this.props.questionSIS}
        candidate={this.props.candidate}
        onClick={this.onClick}
        messege={this.state.messege}
        history={this.props.history}
        onChangeScore={this.onChangeScore}

      />
    );
  }
}
const mapStateToProps = (state) => ({
  candidate: state.candidate.candidate,
  questionSIS: state.question.questionSIS

});

const mapDispatchToProps = (dispatch) => ({
  fetchCandidate: (idCandi) => dispatch(fetchCandidate(idCandi)),
  fetchSisQuestions: (idInter) => dispatch(fetchSisQuestions(idInter)),
  answerSystems: (answer) => dispatch(answerSystems(answer))
});

export default connect(mapStateToProps, mapDispatchToProps)(InterviewSisCont);
