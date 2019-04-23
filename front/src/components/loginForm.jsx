import React from 'react';

const loginForm = (props) => {
  return (
    <div className='row formLogin'>
      <div className='headerLogin'>
        <div className='topLogin'><img className='imgLogin' src='./utils/logo.png' /></div>
        <h1 id='loginh1'>LOGIN</h1></div>
      <form onSubmit={props.onSubmit} className='mainLogin' >
        <div className="form-group">
          <label className='loginLabel' htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" onChange={props.onChange} className="inputLogin form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label className='loginLabel' htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="inputLogin form-control" onChange={props.onChange} id="exampleInputPassword1" name="password" placeholder="Password" />
        </div>
        <button type="submit" onSubmit={props.onSubmit} className="btn btn-lg botonLogin">Login</button>
      </form>
    </div >
  );
};

export default loginForm;
