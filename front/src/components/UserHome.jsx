import React from 'react';
import { Link } from 'react-router-dom'

const UserHome = () => {
  return (
    <div>
      <div className='homeDisplay'>
        <h2 className='titHome'>USERS MANAGEMENT</h2>
        <Link to="/users/addUser"><button className="btn btn-lg botonHome">Add User</button></Link>
        <Link to="/users/allUsers"><div><button className="btn btn-lg botonHome">View all </button></div></Link>
        <Link to="/"><div><button className="btn btn-lg botonHome">Go back</button></div></Link>
      </div>
      <div className='logoAbajo'><img className='imgHome' src='./utils/logo.png' /></div>
    </div>
  );
};

export default UserHome;
