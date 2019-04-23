/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const Home = (props) => {
  return (
    !!props.user && !!props.user.isAdmin
      ? <div>
        <div className='logoAbajo'><img className='imgHome' style={{ margin: '3%' }} src='/utils/logo.png' /></div>
        <div className='homeDisplay'>
          <Link to="/candidates/allCandidates" style={{ textDecorationLine: 'none' }}><div className='homeDIV'><button className="btn-lg botonHome">Candidates Management</button></div></Link>
          <Link to="/questions" style={{ textDecorationLine: 'none' }}><div className='homeDIV'><button className="btn-lg botonHome">Questions Management</button></div></Link>
          <Link to="/users/allUsers" style={{ textDecorationLine: 'none' }}><div className='homeDIV'><button className="btn-lg botonHome">Users Management</button></div></Link>
          {props.user.area !== 'RRHH' && <Link to="/tags" style={{ textDecorationLine: 'none' }}><div className='homeDIV'><button className="btn-lg botonHome">Tags Management</button></div></Link>}
        </div>
      </div>
      : !!props.user && !props.user.isAdmin && <Redirect to='./candidates/allCandidates'/>
  );
};

export default Home;
