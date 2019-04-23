import React from 'react';
// eslint-disable-next-line no-unused-vars
import ActionsCandidates from '../components/actionsCandidates';
import { fetchCandidate } from '../redux/action-creator/candidate-actions';
import { fetchSistAnswers } from '../redux/action-creator/answersActions';
import { fetchSisQuestions } from '../redux/action-creator/questionActions';
import { connect } from 'react-redux';
import { getAllUsers } from '../redux/action-creator/user-actions';
import Axios from 'axios';

class SingleCandidate extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      userHRId: null,
      userSIST1: null,
      userSIST2: null
    };
    this.handleChangeId = this.handleChangeId.bind(this);
    this.submitHR = this.submitHR.bind(this);
    this.submitSIST1 = this.submitSIST1.bind(this);
    this.submitSIST2 = this.submitSIST2.bind(this);
    this.createInterview = this.createInterview.bind(this);
    this.changeCandStatus = this.changeCandStatus.bind(this);
    this.interviewSis = this.interviewSis.bind(this);
    this.goInterview = this.goInterview.bind(this);
  }
  componentDidMount () {
    this.props.getAllUsers();
    this.props.fetchCandidate(this.props.idCand)
      // .then(() => this.props.fetchSisQuestions(this.props.candidate.InterviewIDId))
      // .then(() => this.props.fetchSistAnswers(this.props.candidate.InterviewIDId))
  }

  goInterview (candidate) {
    this.props.history.push(`/preinterview/sist/${candidate}`);
  }

  createInterview (candidate) {
    Axios.post('/api/interview/newInterview', {
      candidateId: candidate
    })
      .then(interview => {
        this.props.history.push(`/candidates/${candidate}/interview/hr/${interview.data.id}`);
      });
  }

  handleChangeId (e) {
    e.preventDefault();
    this.setState({ [e.target.name]: Number(e.target.value) });
  }

  submitHR (idCandi) {
    Axios.post('/api/candidate/setUserHR', {
      idUser: this.state.userHRId || this.props.usersRH[0].id,
      idCandi
    })
      .then(() => this.props.fetchCandidate(this.props.idCand));
  }
  submitSIST1 (idCandi) {
    Axios.post('/api/candidate/setUserSIST1', {
      idUser: this.state.userSIST1 || this.props.usersSIST[0].id,
      idCandi
    })
      .then(() => this.props.fetchCandidate(this.props.idCand));
  }
  submitSIST2 (idCandi) {
    Axios.post('/api/candidate/setUserSIST2', {
      idUser: this.state.userSIST2 || this.props.usersSIST[0].id,
      idCandi
    })
      .then(() => this.props.fetchCandidate(this.props.idCand));
  }

  changeCandStatus (idCandi, status) {
    Axios.put('/api/candidate/changeStatus', { idCandi, status })
      .then(() => this.props.fetchCandidate(this.props.idCand));
  };
  interviewSis (candidate) {
    this.props.history.push(`/candidates/interviewSis/${candidate}`);
  }

  render () {
    return (
      !!this.props.candidate && !!this.props.candidate.id &&
    <ActionsCandidates
      usersRH={this.props.usersRH}
      user={this.props.user}
      candidate={this.props.candidate}
      submitHR={this.submitHR}
      handleChangeId={this.handleChangeId}
      // answersSIST={this.props.answersSIST}
      submitSIST1={this.submitSIST1}
      submitSIST2={this.submitSIST2}
      // questionSIS={this.props.questionSIS}
      usersSIST={this.props.usersSIST}
      createInterview={this.createInterview}
      changeCandStatus={this.changeCandStatus}
      onClickInterview={this.createInterview}
      onClickInterviewSis={this.interviewSis}
      history={this.props.history}
      onClickSist={this.goInterview}
    />
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  candidate: state.candidate.candidate,
  usersRH: state.user.users.filter(user => user.area === 'RRHH'),
  usersSIST: state.user.users.filter(user => user.area === 'Sistemas'),
  // questionSIS: state.question.questionSIS,
  // answersSIST: state.answers.answersSIST
});
const mapDispatchToProps = (dispatch) => ({
  fetchCandidate: (idUser, idCandi) => dispatch(fetchCandidate(idUser, idCandi)),
  getAllUsers: () => dispatch(getAllUsers()),
  fetchSisQuestions: (idInter) => dispatch(fetchSisQuestions(idInter)),
  fetchSistAnswers: (interviewID) => dispatch(fetchSistAnswers(interviewID))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleCandidate);
