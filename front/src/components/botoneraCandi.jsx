import React from 'react';
import { connect } from 'react-redux';
import { fetchSisQuestions } from '../redux/action-creator/questionActions';

import { fetchSistAnswers } from '../redux/action-creator/answersActions';

class botonera extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      // status: 'New',
      assign: 'assignOff'
    };
    this.changeStatus = this.changeStatus.bind(this);
  }

  changeStatus (status) {
    this.setState({ status });
  }

  componentDidMount () {
    this.props.fetchSistAnswers(this.props.candidate.InterviewIDId)
      .then(this.props.fetchSisQuestions(this.props.candidate.InterviewIDId));
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState !== this.state) {
  //     this.props.changeCandStatus(this.props.candidate.id, this.state.status);
  //   }
  // }

  render () {
    return (
      <div>
        {(this.props.user && this.props.user.area === 'RRHH')
          ? (<div>
            <div id='botonesHR'>

              {(this.props.candidate.status !== 'Tech Approved' && this.props.candidate.status !== 'Rejected Tech') &&
                <button className='ActionsBotones ActionsBotonesBlanco'
                  style={{ border: '2px solid #DE411B' }}
                  onClick={() => {
                    if (this.state.assign === 'assignOff') this.setState({ assign: 'onAssign' });
                    if (this.state.assign === 'onAssign') this.setState({ assign: 'assignOff' });
                  }}
                >
                Assign Interviewers
                </button>}

              {(this.props.candidate && this.props.candidate.status === 'New') && (this.props.candidate.interviewerHR && this.props.candidate.interviewerHR.nombre.includes(this.props.user.nombre))
                ? <button className='ActionsBotones ActionsBotonesBlanco' style={{ border: '2px solid #DE411B' }}
                  onClick={() => {
                    !this.props.candidate.interviewerHR
                      ? alert('Hr User must be assigned to the candidate')
                      : this.props.onClickInterview(this.props.candidate.id);
                  }
                  }>Create Interview</button>
                : (this.props.candidate.interviewerHR && this.props.candidate.status !== 'New') && <button
                  className='ActionsBotones ActionsBotonesBlanco'
                  style={{ border: '2px solid #DE411B' }}
                  onClick={() => this.props.history.push(`/candidates/${this.props.candidate.id}/interview/hr/${this.props.candidate.InterviewIDId}`)}
                >
                  View HR Report
                </button>}

              {(this.props.candidate.status === 'Rejected Tech' || this.props.candidate.status === 'Tech Approved') &&
              <button
                className='ActionsBotonesNaranja'
                // style={{ backgroundColor: '' }}
                onClick={() => this.props.history.push(`/generateReport/${this.props.candidate.id}`)}
              >
                  View Full Report
              </button>}
              {/* <button
                className='ActionsBotones'
                style={{ backgroundColor: '#0EDD4D' }}
                onClick={() => this.changeStatus('Approved HR')} >
                Approve HR
              </button>

              <button
                className='ActionsBotones'
                style={{ backgroundColor: '#DD0E0E' }}
                onClick={() => this.changeStatus('Rejected HR')}>
                Reject HR
              </button> */}

            </div>

            <div className={'display ' + this.state.assign}>
              {this.props.candidate.status === 'New' && <div className='assignUser'>
                <h3>Assign HR :</h3>
                <select name='userHRId' onChange={this.props.handleChangeId} className='selectTag' >
                  {this.props.usersRH.map(user => (
                    <option value={user.id} key={user.id}>{user.nombre}</option>
                  ))
                  }
                </select >
                <input type='submit' className='subBtn' value='ASSIGN RRHH' onClick={() => this.props.submitHR(this.props.candidate.id)} />
              </div>}
              <div className='assignUser'>
                <h3>Assign Syst Interviewer 1:</h3>
                <select name='userSIST1' onChange={this.props.handleChangeId} className='selectTag' >
                  {this.props.usersSIST.map(user => (
                    <option value={user.id} key={user.id}>{user.nombre}</option>
                  ))
                  }
                </select >
                <input type='submit' className='subBtn' value='ASSIGN SYSTEM' onClick={() => this.props.submitSIST1(this.props.candidate.id)} />
              </div>

              <div className='assignUser'>
                <h3>Assign Syst Interviewer 2: </h3>
                <select name='userSIST2' onChange={this.props.handleChangeId} className='selectTag' >
                  {this.props.usersSIST.map(user => (
                    <option value={user.id} key={user.id}>{user.nombre}</option>
                  ))
                  }
                </select >
                <input type='submit' value='ASSIGN SYSTEM' className='subBtn' onClick={() => this.props.submitSIST2(this.props.candidate.id)} />
              </div>
            </div>
          </div>)

          : (<div>
            <div id='botonesHR'>
              {this.props.candidate && this.props.candidate.status !== 'Tech Approved' && <button
                className='ActionsBotones ActionsBotonesBlanco'
                style={{ border: '2px solid #DE411B' }}
                onClick={() => {
                  if (this.state.assign === 'assignOff') this.setState({ assign: 'onAssign' });
                  if (this.state.assign === 'onAssign') this.setState({ assign: 'assignOff' });
                }}
              >
                Assign Syst Interviewer
              </button>}

              {(this.props.questionSIS && this.props.questionSIS.length === 0) && (this.props.answersSIST && this.props.answersSIST.length === 0) ? <button className='ActionsBotones ActionsBotonesBlanco'
                style={{ border: '2px solid #DE411B' }}
                onClick={() => this.props.onClickSist(this.props.candidate.id)}
              >Prepare Syst Interview</button> : null
              }
              {(this.props.questionSIS && this.props.questionSIS.length > 0) && <button
                className='ActionsBotones ActionsBotonesBlanco'
                style={{ border: '2px solid #DE411B' }}
                onClick={() => this.props.onClickInterviewSis(this.props.candidate.id)}
              > Go to Syst Interview </button>}

              {(this.props.answersSIST && this.props.answersSIST.length > 0) && <button
                className='ActionsBotones ActionsBotonesBlanco'
                style={{ border: '2px solid #DE411B' }}
                onClick={() => this.props.history.push(`/candidates/${this.props.candidate.id}/interview/sist/${this.props.candidate.InterviewIDId}`)}>View Syst Interview</button>}
            </div>
            <div className={this.state.assign}>
              <div className='assignUser ' >
                <h3>Assign Syst Interviewer 1:</h3>
                <select name='userSIST1' onChange={this.props.handleChangeId} className='selectTag' >
                  {this.props.usersSIST.map(user => (
                    <option value={user.id} key={user.id}>{user.nombre}</option>
                  ))
                  }
                </select >
                <input type='submit' className='subBtn' value='ASSIGN Sisemas'
                  onClick={() => {
                    this.props.submitSIST1(this.props.candidate.id);
                  }} />
              </div>

              <div className='assignUser'>
                <h3>Assign Syst Interviewer 2: </h3>
                <select name='userSIST2' onChange={this.props.handleChangeId} className='selectTag' >
                  {this.props.usersSIST.map(user => (
                    <option value={user.id} key={user.id}>{user.nombre}</option>
                  ))
                  }
                </select >
                <input type='submit' value='ASSIGN Sisemas' className='subBtn'
                  onClick={() => this.props.submitSIST2(this.props.candidate.id)} />
              </div>
            </div>
          </div>)
        }
      </div>
    )
    ;
  };
};

const mapStateToProps = (state) => ({
  questionSIS: state.question.questionSIS,
  answersSIST: state.answers.answersSIST
});

const mapDispatchToProps = (dispatch) => ({
  fetchSisQuestions: (idInter) => dispatch(fetchSisQuestions(idInter)),
  fetchSistAnswers: (interviewID) => dispatch(fetchSistAnswers(interviewID))
});

export default connect(mapStateToProps, mapDispatchToProps)(botonera);
