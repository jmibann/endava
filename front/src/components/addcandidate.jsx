/* eslint-disable no-unused-vars */
import React from 'react';
import AddTagInline from './addTagInline';

const candidate = (props) => {
  return (
    <div>
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
                <p>{props.message && props.message}</p>
              </div>
              <div className="modal-footer">
                {/* { */}
                 <button type="button" onClick={() => props.onClick()} className="btn btn-lg" style={{ backgroundColor: '#DE411B' }} data-dismiss="modal" > { props.message === 'Successfully saved Candidate' ? 'Go to Candidates' : 'Go back' } </button>
                  {/* // : <button type="button" onClick={() => props.onClick()} className="btn btn-lg" style={{ backgroundColor: '#DE411B' }} data-dismiss="modal" > Go back </button>} */}
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="form-group form-control-lg row formUser" style={{ marginTop: '50px', padding: '20px' }}>
        <div className='col-lg-3'></div>
        <div className='col-lg-6 addUser'>
          <form onSubmit={props.onSubmit} className='formUser' >
            <h1 className='titHomeForms'>ADD NEW CANDIDATE</h1>
            <small>(<b>*</b>) Required fields</small>
            <p/>
            <div className="form-group " >
              <label htmlFor="lastName">* First Name</label>
              <input onChange={props.onChange} type="text" className="form-control inputLogin" id="LastName" placeholder="Name" name='name' />
            </div>
            <div className="form-group">
              <label htmlFor="firsstName">* Last Name</label>
              <input onChange={props.onChange} type="text" className="form-control inputLogin" id="First Name" placeholder="Last Name" name='surname' />
            </div>
            <div className="form-group">
              <label htmlFor="email">* Email</label>
              <input onChange={props.onChange} type="text" className="form-control inputLogin" id="Email" placeholder="Email" name='email' />
            </div>
            <div className="form-group">
              <label htmlFor="number">* Mobile Number</label>
              <input onChange={props.onChange} type="tel" className="form-control inputLogin" id="phone" placeholder="Mobile Number" name='telNumber' />
            </div>
            <div className="form-group">
              <label htmlFor="workExperince">Work Experience</label>
              <textarea onChange={props.onChange} className="form-control inputLogin" id="WorkExperience" rows="3" name="expertise"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="url">URL Linkedin <small>(Default: None)</small></label>
              <input onChange={props.onChange} type="url" className="form-control inputLogin" id="URLLinkedin" placeholder="URL Linkedin" defaultValue='https://www.linkedin.com/in/' name="url" />
            </div>
            <div className="form-group">
              <label htmlFor="url">Profile Tags</label>
              <AddTagInline
                onSubmit={props.handleSubmit}
                onClick={props.onClick}
                handleDelete={props.handleDelete}
                allTags={props.allTags}
                handleTagSubmit={props.handleTagSubmit}
                selectedTags={props.selectedTags} />
            </div>
            <div>
              <button onSubmit={props.onSubmit} type="submit" className="btn boton btn-lg botonLogin btn-primary" data-toggle="modal" data-target="#exampleModal">Add Applicant</button>
              <button onClick={() => props.onClick()} className="btn boton btn-lg botonLogin btn-primary" >View All Candidates</button>
            </div>
          </form>

        </div>
        <div className='col-lg-3'></div>
      </div>
    </div>
  );
};

export default candidate;
