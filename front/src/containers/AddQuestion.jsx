/* eslint-disable no-unused-vars */
import React from 'react';
import QuestionInput from '../components/QuestionInput';
import { Link } from 'react-router-dom';
import Axios from 'axios';

let arr = [];

class addQuestion extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      tagsData: [],
      selectedTags: [],
      alert: ''
    };
    this.handleSubmiTag = this.handleSubmiTag.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
    this.finalSubmit = this.finalSubmit.bind(this);
  }

  handleSubmiTag (e) {
    e.preventDefault();
    let found = this.state.selectedTags.find(function (element) {
      if (element === e.target.dropdown.value) {
        return element;
      }
    });

    if (!found) {
      arr = this.state.selectedTags.concat(e.target.dropdown.value);
      this.setState({ selectedTags: arr });
      this.setState({ alert: '' });
      console.log(this.state.selectedTags);
    } else {
      alert('The tag has aleady been added');
    }
  }

  handleDelete (e) {
    let index = e.target.getAttribute('name');
    arr = this.state.selectedTags;
    arr.splice(index, 1);
    this.setState({ selectedTags: arr });
  }

  handleSubmitQuestion (e) {
    e.preventDefault();
    let question = e.target[0].value;
    e.target[0].value = '';
    this.finalSubmit(question, this.state.selectedTags);
  }

  finalSubmit (question, tags) {
    console.log('tags', tags);
    if (question !== '' && tags.length > 0) {
      let area = this.props.user.area;
      Axios.post('/api/questions/create', {
        area,
        content: question,
        required: null,
        tags
      }).then(() => alert('Question has been created sucessfully'))
        .then(() => this.setState({ selectedTags: [] }));
    } else if (question === '') {
      alert('The Question Field cannot be empty');
    } else {
      alert('All questions must have tags asigned');
    }
  }

  componentDidMount () {
    Axios.get('/api/questions/tags')
      .then(tags => {
        this.setState({ tagsData: tags.data });
      });
  }

  render () {
    return (
      <div>
        <QuestionInput
          submiTag={this.handleSubmiTag}
          submitQuestion={this.handleSubmitQuestion}
          delete={this.handleDelete}
          tags={this.state.tagsData}
          selectedTags={this.state.selectedTags}
          alert={this.state.alert}
          history={this.props.history}
          alerta={this.alerta}
        />
      </div>
    );
  }
}

export default addQuestion;
