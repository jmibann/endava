/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { Link, Router, Route } from 'react-router-dom';
import { fetchMyCandidates, getAllCandidates } from '../redux/action-creator/candidate-actions';
import CandidateTable from './candidatesTable';
import axios from 'axios';

class allCandidates extends React.Component {
  constructor () {
    super();
    this.state = {
      entrevistador: '',
      popInput: '',
      candidates: []
    };
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  componentDidMount () {
    if (this.props.user.area === 'RRHH') {
      this.props.getAllCandidates()
        .then(candidates => this.setState({ candidates: candidates }));
    } else {
      this.props.fetchMyCandidates(this.props.user.id)
        .then(candidates => this.setState({ candidates: candidates }));
    }
  }

  onClickDelete (id) {
    axios.delete(`/api/candidate/delete/${id}`)
      .then(() => {
        if (this.props.user.area === 'RRHH') {
          this.props.getAllCandidates()
            .then(candidates => this.setState({ candidates: candidates }));
        } else {
          this.props.fetchMyCandidates(this.props.user.id)
            .then(candidates => this.setState({ candidates: candidates }));
        }
      });
  }

  render () {
    return (
      !this.props.user.isAdmin && this.props.user.area === 'Sistemas'
        ? <div>
          <div className='addcand'>

            <div><img style={{ textAlign: 'left', display: 'block' }} className='imgHome' src='/utils/logo.png' /></div>
            <form className="form" style={{ float: 'left', margin: 'auto' }}>

              {/* <i className="fas fa-search" aria-hidden="true"></i> */}
              <input onChange={this.props.handleChange} className="form-control form-control-sm ml-3 w-75 inputSearch" type="text" placeholder="Filter by Status" aria-label="Search" />

            </form>
            <Link to="/candidates/addCandidate" style={{ textDecorationLine: 'none' }}><button id='alineandoBtn' type="button" className="btn btn-lg ActionsBotonesNaranja">Add Candidate + </button></Link>
          </div>
          <div className='tableDivi' style={{ margin: '3% 1%' }} >
            <h5 className='titHome'>
              <button className='ActionsBotonesBlanco' onClick={() => {
                this.props.fetchMyCandidates(this.props.user.id)
                  .then(candidates => this.setState({ candidates: candidates }));
              }}>MY CANDIDATES</button>
            </h5>
          </div>
          <div>
            <CandidateTable
              candidates={this.state.candidates}
              input={this.props.input}
              onClickDelete = {this.onClickDelete}
            />
          </div>
        </div>
        : <div>
          <div className='addcand'>
            <div><img style={{ textAlign: 'left', display: 'block', margin: '10px' }} className='imgHome' src='/utils/logo.png' /></div>
            <form className="form" >

              {/* <i className="fas fa-search" aria-hidden="true"></i> */}
              <input onChange={this.props.handleChange} className="form-control inputSearch" type="text" placeholder="Filter by Status" aria-label="Search" />

            </form>
            <Link to="/candidates/addCandidate" style={{ textDecorationLine: 'none' }}><button id='alineandoBtn' type="button" className="btn btn-lg ActionsBotonesNaranja">Add Candidate + </button></Link>
          </div>

          {this.props.user.area === 'RRHH'
            ? <div className='tableDiv' >

              <div></div>

              <button className='ActionsBotonesBlanco' onClick={() => {
                this.props.getAllCandidates()
                  .then(candidates => this.setState({ candidates: candidates }));
              }}>
                ALL CANDIDATES

              </button>

              <button className='ActionsBotonesBlanco' onClick={() => {
                this.props.fetchMyCandidates(this.props.user.id)
                  .then(candidates => this.setState({ candidates: candidates }));
              }}>MY CANDIDATES</button>

              <div></div>

            </div>
            : <div className='tableDivi' style={{ margin: '3% 1%' }} >
              <h5 className='titHome'>
                <button className='ActionsBotonesBlanco' onClick={() => {
                  this.props.fetchMyCandidates(this.props.user.id)
                    .then(candidates => this.setState({ candidates: candidates }));
                }}>MY CANDIDATES</button>
              </h5>
            </div>
          }
          <CandidateTable
            candidates={this.state.candidates}
            input={this.props.input}
            onClickDelete = {this.onClickDelete}
          />

        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user
  // candidates: state.candidate.candidates,
  // myCandidates: state.candidate.myCandidates
});
const mapDispatchToProps = (dispatch) => ({
  fetchMyCandidates: (userId) => dispatch(fetchMyCandidates(userId)),
  getAllCandidates: () => dispatch(getAllCandidates())
});

export default connect(mapStateToProps, mapDispatchToProps)(allCandidates);
