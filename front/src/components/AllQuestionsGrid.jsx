/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import ReactFileReader from 'react-file-reader';

import { saveTagsFromFile, saveQuestionsFromFile } from '../redux/action-creator/questionActions';

class AllQuestionsGrid extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedQuestionID: null,
      selectedQuestionContent: ''
    };
    this.handleFiles = this.handleFiles.bind(this);
  }

  setSelectedQuestion (questionId, questionContent) {
    console.log(questionContent);
    this.state.selectedQuestionID = questionId;
    this.setState({ selectedQuestionContent: questionContent });
  }

  setModifiedQuestion (e) {
    this.setState({ selectedQuestionContent: e.target.value });
  }

  handleFiles (files) {
    let quoteRemover = function (str) {
      let arr = str.slice(1, str.length - 1);
      return arr;
    };
    var reader = new FileReader();
    reader.onload = (e) => {
      let csv = reader.result;
      let lines = csv.split('\n');
      let result = [];
      let obj = {};
      let currentline;
      let array;
      for (var i = 0; i < lines.length; i++) {
        currentline = lines[i].split(';');
        array = JSON.parse(currentline[2]);
        obj = {
          content: quoteRemover(currentline[0]),
          // eslint-disable-next-line no-unneeded-ternary
          required: currentline[1] === 'true' ? true : false,
          tags: array,
          area: 'RRHH'
        };
        result.push(obj);
      }

      this.props.saveTagsFromFile(result);
      this.props.saveQuestionsFromFile(result, 'RRHH');
    };

    reader.readAsText(files[0]);
  }

  render () {
    const { onClick, questions } = this.props;

    return (
      <div className="dropdown show" >
        <button type="button" className="btn btn-link" role="button" id="addQuestionIcon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ float: 'right' }} >
          <img src="/utils/add.svg" width="50" id='addQuestBtn' />
        </button>
        <div className='modalQuest'>
          <div className="dropdown-menu probandModal" aria-labelledby="addQuestionIcon">
            <button className="dropdown-item probando2" onClick={() => onClick(null, 'addManually')}>Add new question manually</button>
            <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}><button className="dropdown-item probando2">Upload questions from file</button></ReactFileReader>
          </div>
        </div>
        <div className="modal fade" id="confirmDeleteModal" tabIndex="-1" role="dialog" aria-labelledby="confirmDeleteLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title textModal" id="confirmDeleteLabel">Are your sure you to delete this question?</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" className='textModal'>&times;</span>
                </button>
              </div>
              <p className='textModal'>This action will delete selected question permanently</p>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-lg" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-danger btn-lg" onClick={() => onClick(this.state.selectedQuestionID, 'delete')} data-dismiss="modal" >Delete</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="editQuestionModal" tabIndex="-1" role="dialog" aria-labelledby="editQuestionlLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title textModal" id="editQuestionLabel">Edit this question</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="input-group">
                <textarea className="form-control textModal" aria-label="With textarea" value={this.state.selectedQuestionContent} onChange={(e) => this.setModifiedQuestion(e)}></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-lg" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary btn-lg" onClick={() => onClick(this.state.selectedQuestionID, 'edit', this.state.selectedQuestionContent)} data-dismiss="modal" >Change</button>
              </div>
            </div>
          </div>
        </div>
        <h2 className='titHome'>QUESTIONS MANAGEMENT</h2>
        <div className='newTableDiv' style={{ margin: '3% 1%' }} >
          <table className="table">
            <thead style={{ borderBottom: '5px solid #DE411B', borderTop: '5px solid #DE411B' }}>
              <tr>
                <th scope="col" className='tableHeading' style={{ textAlign: 'left' }}>Questions Content</th>
              </tr>
            </thead>

            {questions.sort((a, b) => a.id - b.id).map((question) => {
              return (
                <tbody key={question.content}>
                  <tr>
                    <td style={{ textAlign: 'left' }} className='tableHeading' scope="row">{question.content}
                      <button onClick={() => this.setSelectedQuestion(question.id, question.content)} type="button" className="btn btn-link" style={{ float: 'right' }} data-toggle="modal" data-target="#confirmDeleteModal">
                        <div className= 'containerTrash'>
                          <img id='trashUser' src="/utils/garbage.svg" width="40" />
                        </div>
                      </button>
                      <button onClick={() => this.setSelectedQuestion(question.id, question.content)} type="button" className="btn btn-link" style={{ float: 'right' }} data-toggle="modal" data-target="#editQuestionModal">
                        <img src="/utils/pencil.svg" width="40" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })
            }
          </table>
        </div>
      </div>
    );
  };
}
const mapDispatchToProps = (dispatch) => ({
  saveTagsFromFile: (questionsArray) => dispatch(saveTagsFromFile(questionsArray)),
  saveQuestionsFromFile: (questionsArray, area) => dispatch(saveQuestionsFromFile(questionsArray, area))
});

export default connect(null, mapDispatchToProps)(AllQuestionsGrid);
