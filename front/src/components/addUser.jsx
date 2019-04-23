/* eslint-disable no-unused-vars */
import React from 'react';

const AddUser = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit} className='formUser'>
        <div className='row'>
          <div className="col-lg-3"></div>
          <div className="col-lg-6  addUser">
            <h2 className='titHomeForms'>CREATE NEW USER</h2>
            <div className="formSpace form-group" >
              <label htmlFor="nombre">Full Name</label>
              <input onChange={props.onChange} type="text" className="inputLogin form-control" id="nombre" aria-describedby="emailHelp" name="nombre" />
            </div>

            <div className="formSpace form-group">
              <label htmlFor="email">Email</label>
              <input onChange={props.onChange} type="email" className="inputLogin form-control" id="email" name="email" aria-describedby="emailHelp" />
              <small id="emailHelp" className="form-text text-muted tiny">Remember you can only add @endava.com emails </small>
            </div>

            <div className="formSpace form-group">
              <label htmlFor="password">Password</label>
              <input onChange={props.onChange} type="password" className="inputLogin form-control" name="password" id="password" />
            </div>

            <div className="formSpace form-group">
              <label htmlFor="password">Confirm your password</label>
              <input onChange={props.onChange} type="password" className="inputLogin form-control" name="secondPassword" id="confPassword" />
            </div>

            <div className='form-group formSpace'>
              <h4 id='belongsTo'>Belongs to :</h4>
              <div className="form-check form-check-inline formSpace">
                <input onChange={props.onChange} className="form-check-input radioScale" type="radio" name="area" id="inlineRadio1" value="Sistemas" />
                <label className="form-check-label labelSpacing" htmlFor="inlineRadio1">    Syst  </label>
              </div>

              <div className="form-check form-check-inline formSpace">
                <input onChange={props.onChange} className="form-check-input radioScale" type="radio" name="area" id="inlineRadio2" value="RRHH" />
                <label className="form-check-label labelSpacing" htmlFor="inlineRadio2">    HR  </label>
              </div>
            </div>

            <div className=" form-check form-check-inline formSpace checkBox" >
              <input type="checkbox" id='checkboxIsAdm' value={true} onChange={props.onChange} className=" radioScale" id="isAdmin" name="isAdmin" /><span id='textCheckBox'>  isAdmin</span>
            </div>

            <div><button onSubmit={props.onSubmit} type="submit" className="btn boton btn-lg botonLogin">Done</button></div>
          </div>
          <div className="col-lg-3"></div>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
