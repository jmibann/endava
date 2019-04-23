/* eslint-disable no-undef */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

class InterviewSisComp extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (

      <div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Succesfully submitted Interview</p>
                {/* <p>{this.props.messege}</p> */}
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => this.props.onClick()} className="btn btn-lg" style={{ backgroundColor: '#DE411B' }} data-dismiss="modal" > View Report </button>
              </div>
            </div>
          </div>
        </div>

        <div id='infoCandHR' className='masGrid' style={{ marginLeft: '30px' }}>
          <div>
            <h4>Full name: <strong>{this.props.candidate.fullName} </strong></h4>
            <h4>Candidate ID: <strong>{this.props.candidate.id}</strong></h4>
            <h4>Email Adress: <strong>{this.props.candidate.email}</strong></h4>
            <h4>Phone: <strong>{this.props.candidate.telNumber}</strong> </h4>
            {this.props.candidate.url && <a href={this.props.candidate.url} target='_blank'>Link a Perfil en Linked-in</a>}
            {/* <h4>Candidate Tags :  {this.props.candidate.tags.map(tag => <strong> {tag.tag + ' - '} </strong>)}</h4> */}
          </div>
          <div>
            <Link to={'/candidates/' + this.props.candidate.id} ><button style={{ width: '80%' }} className='ActionsBotonesBlanco'> Go Back </button></Link>
            <div style={{ marginTop: '30px' }}>
              <h4><strong style={{ borderBottom: '1px solid black' }}> Candidate's Expertise</strong></h4>
              <h4>{this.props.candidate.expertise}</h4>
            </div>
          </div>
        </div>
        <div style={{ width: '90%', margin: '20px auto', marginTop: '50px', borderBottom: '2px solid #DE411B' }}></div>
        <div className='col-lg-3'></div>
        {this.props.questions.map((pregunta) => (
          <div key={pregunta.id} className="form" style={{ display: 'block', width: '90%', margin: '20px auto' }}>

            <h6 style={{ display: 'grid', gridTemplateColumns: '1fr 0.3fr' }}>
              <strong className='questionHR' >{pregunta.value}</strong>
              <select className="form-control"
                id={pregunta.id}
                onChange={this.props.onChange}
                name='score'
                style={{
                  borderRadius: '30px',
                  width: '35%',
                  border: '2px solid #DE411B'
                }}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </select>
            </h6>
            <div>

            </div>
            <div className="form-group">
              {/* <label htmlFor="exampleFormControlTextarea1">observations</label> */}
              <textarea className="form-control" id={pregunta.id}
                name='observations'
                onChange={this.props.onChange}
                style={{
                  marginBottom: '40px',
                  display: 'block',
                  width: '90%',
                  border: '1px solid black',
                  height: '120px'
                }}
              >
              </textarea>
            </div>

          </div>)
        )}
        {/* ACA VA LA OBS DE LA ENTREVISTA GENEARL!!!!!!
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">observations</label>
          <textarea className="form-control" id={pregunta.id}
            name='observationsInterviewSis'
            onChange={this.props.onChange}>
          </textarea>
        </div> */}
        <div className='col-lg-3'></div>
        <div style={{ display: 'block', width: '40%', margin: '10px auto' }}>
          <button
            type='button'
            className="btn ActionsBotonesNaranja"
            onClick={this.props.onSubmit}
            style={{
              width: '100%',
              padding: '20px',
              marginBottom: '50px'
            }}
            data-toggle='modal'
            data-target='#exampleModal'
            > Submit Interview</button>
        </div>

      </div>

    );
  }
}
export default InterviewSisComp;
