// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
// import { Preguntas } from '../containers/seed';

const CreateInterviewComp = (props) => {
  return (
    <div>

      <div id='infoCandHR' className='masGrid' style={{ marginLeft: '30px' }}>
        <div>
          <h4>Full name: <strong>{props.candidate.fullName} </strong></h4>
          <h4>Candidate ID: <strong>{props.candidate.id}</strong></h4>
          <h4>Email Adress: <strong>{props.candidate.email}</strong></h4>
          <h4>Phone: <strong>{props.candidate.telNumber}</strong> </h4>
          {props.candidate.url && <a href={props.candidate.url} target='_blank'>Link to Linked-in Profile</a>}
          <h4>Candidate Tags :  {props.candidate.tags.map(tag => <strong> {tag.tag + ' - '} </strong>)}</h4>
        </div>
        <div>
          <Link to={'/candidates/' + props.candidate.id} ><button style={{ width: '80%' }} className='ActionsBotonesBlanco'> Go Back </button></Link>
          <div style={{ marginTop: '30px' }}>
            <h4><strong style={{ borderBottom: '1px solid black' }}> Candidate's Expertise</strong></h4>
            <h4>{props.candidate.expertise}</h4>
          </div>
        </div>
      </div>
      <div style={{ width: '90%', margin: '20px auto', marginTop: '50px', borderBottom: '2px solid #DE411B' }}></div>
      <form id='formCand'>
        {props.questions.map((pregunta) => {
          return (
            <div key={pregunta.id} className="form-row">
              <div className="form-group" style={{ marginLeft: '20px' }}>
                <label htmlFor="inputEmail4" style={{ margin: '10px' }}>
                  <strong className='questionHR' style={{ borderBottom: '1px solid black' }}>{pregunta.content}</strong>
                </label>
                <textarea onChange={props.onChange} name={pregunta.id} id='HRtextarea' type="email" className="form-control" placeholder="Respuesta" />
              </div>
            </div>
          );
        })}
        <button style={{ display: 'block', width: '30%', margin: '20px auto' }} type='button' className='ActionsBotonesNaranja btn-lg' onClick={props.onSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default CreateInterviewComp;
