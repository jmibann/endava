/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';

import AllQuestionsGrid from '../components/AllQuestionsGrid';
import AllSISTQuestionsGrid from '../components/AllSISTQuestionsGrid';
import { searchAllQuestions, deleteQuestion, editQuestion } from '../redux/action-creator/questionActions';

class AllQuestionsList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      fileSelector: null
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount () {
    this.props.searchAllQuestions(this.props.user.area);
  }

  componentDidUpdate (prevState) {
    if (prevState.user.area !== this.props.user.area) {
      this.props.user.area ? this.props.searchAllQuestions(this.props.user.area) : null;
    }
  }

  onClick (questId, action, modifiedQuestion) {
    switch (action) {
      case 'delete':
        this.props.deleteQuestion(questId, this.props.user.area);
        break;
      case 'edit':
        this.props.editQuestion(questId, modifiedQuestion, this.props.user.area);
        break;
      case 'addManually':
        this.props.history.push('/questions/add');
        break;
      case 'addFromFile':
        this.props.history.push('/questions/addFromFile');
        break;
      case 'addTag':
        this.props.addTag();
        break;

      default:
    }
  }

  render () {
    return (

      this.props.user.area === 'RRHH'
        ? <AllQuestionsGrid onClick={this.onClick} questions={this.props.allQuestions} />
        : <AllSISTQuestionsGrid onClick={this.onClick} questions={this.props.allQuestions} />

    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  allQuestions: state.question.allQuestions
});
const mapDispatchToProps = (dispatch) => ({
  searchAllQuestions: (area) => dispatch(searchAllQuestions(area)),
  deleteQuestion: (questId, area) => dispatch(deleteQuestion(questId, area)),
  editQuestion: (questId, modifiedQuestion, area) => dispatch(editQuestion(questId, modifiedQuestion, area))

});

export default connect(mapStateToProps, mapDispatchToProps)(AllQuestionsList);
