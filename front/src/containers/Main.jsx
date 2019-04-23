/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login';
import AddUser from './AddUser';
import Home from './Home';
import AllUsers from './AllUsers';
import AddQuestion from './AddQuestion';
import AllCandidates from './AllCandidates';
import AddCandidate from './AddCandidate';
import Header from '../components/Header';
import AllQuestionsList from './AllQuestionsList';
import InterviewSisCont from './InterviewSisCont';
import SistReport from '../components/SistReport';
import UserHome from '../components/UserHome';
import CandidatesHome from '../components/candidateHome';
import CreateInterview from './CreateInterview';
import TagsHome from '../components/tagsHome';
import AddTag from '../containers/AddTag';
import PreSistInterview from '../containers/PreSistInterview';
import ReportGeneration from '../containers/ReportGeneration';

import SingleCandidate from '../containers/singleCandidate';
import { fetchUser } from '../redux/action-creator/user-actions';

class Main extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount () {
    this.props.fetchUser()
      .then(() => this.setState({ loading: false }));
  }

  render () {
    return (
      !this.state.loading
        ? <div>
          <Route render= {({ history }) => (<Header fetchUser={this.props.fetchUser} user={this.props.user} history={history} />)} />
          <Switch>
            <Route exact path='/' render={({ history }) => (this.props.user ? <Home history={history} user={this.props.user}/> : <Redirect to='/login' />)} />
            <Route exact path="/login" render={({ history }) => (<Login history={history} />)} />
            <Route exact path='/candidates' render={({ history }) => (<CandidatesHome history={history} user={this.props.user}/>)} />
            <Route exact path='/candidates/addCandidate' render={({ history }) => (<AddCandidate user={this.props.user} history={history} />)} />
            <Route path='/candidates/allCandidates' render={(props) => (<AllCandidates {...props} user={this.props.user} />)} />

            <Route exact
              path='/candidates/:idCand'
              render={({ history, match }) => (
                <SingleCandidate
                  history={history}
                  user={this.props.user}
                  idCand={match.params.idCand}
                />
              )
              }
            />
            <Route exact
              path='/candidates/interviewSis/:idCand'
              render={({ history, match }) => {
                return (
                  <InterviewSisCont
                    idCand={match.params.idCand}
                    history={history}
                    idInter={match.params.idInterv}
                    user={this.props.user}
                  />
                );
              }}
            />
              )}
            />
            <Route exact
              path='/candidates/:idCand/interview/sist/:idInterv'
              render={({ history, match }) => {
                return (
                  <SistReport
                    history={history}
                    idCand={match.params.idCand}
                    questions={this.props.questionsHR}
                    candidate={this.props.candidate}
                    idInter={this.props.idInter}
                  />
                );
              }}
            />
        )}
        />
            <Route exact
              path='/candidates/:idCand/interview/hr/:idInterv'
              render={({ history, match }) => {
                return (
                  <CreateInterview
                    idCand={match.params.idCand}
                    history={history}
                    idInter={match.params.idInterv}
                    user={this.props.user}
                  />
                );
              }}
            />

            <Route exact path='/users' render={({ history }) => (<UserHome history={history} user={this.props.user}/>)} />
            <Route exact path='/users/addUser' render={({ history }) => (<AddUser history={history} />)} />
            <Route exact path='/users/allUsers' render={({ history }) => (<AllUsers user={this.props.user} history={history} />)} />
            <Route exact path='/questions' render={({ history }) => (<AllQuestionsList history={history} />)} />
            <Route exact path='/questions/add' render={({ history }) => (<AddQuestion history={history} user={this.props.user}/>)} />
            <Route exact path='/tags' render={({ history }) => (<AddTag history={history} user={this.props.user}/>)} />
            <Route exact path='/questions/loadFile' render={({ history }) => (<LoadFile history={history}/>)} />
            <Route exact path='/preinterview/sist/:candID' render={({ history, match }) => (<PreSistInterview history={history} user={this.props.user} candID={match.params.candID}/>)} />
            <Route exact path='/generateReport/:candID' render={({ history, match }) => (<ReportGeneration history={history} user={this.props.user} candID={match.params.candID}/>)} />
          </Switch>
        </div>
        : <h2>Loading App</h2>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user
});
const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch((fetchUser()))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
