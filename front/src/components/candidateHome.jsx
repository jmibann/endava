import React from 'react';
import { Link } from 'react-router-dom';

const UserHome = () => {
  return (
    <div>
      <div className='homeDisplay'>
        <h2 className='titHome'>CANDIDATES MANAGEMENT</h2>
        <Link to="/candidates/addCandidate"><button className="btn btn-lg botonHome">Add Candidate</button></Link>
        <Link to="/candidates/allCandidates"><div><button className="btn btn-lg botonHome">View all </button></div></Link>
        <Link to="/"><div><button className="btn btn-lg botonHome">Go back</button></div></Link>
      </div>
      <div className='logoAbajo'><img className='imgHome' src='./utils/logo.png' /></div>
    </div>
  );
};

export default UserHome;
