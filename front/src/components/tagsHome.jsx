import React from 'react';
import { Link } from 'react-router-dom';

const TagsHome = () => {
  return (
    <div>
      <div className='homeDisplay'>
        <h2 className='titHome'>TAGS MANAGEMENT</h2>
        <Link to="/tags/addTag"><button className="btn btn-lg botonHome">Add Tag</button></Link>
        <Link to="/tags/allTags"><div><button className="btn btn-lg botonHome">View all </button></div></Link>
        <Link to="/"><div><button className="btn btn-lg botonHome">Go back</button></div></Link>
      </div>
      <div className='logoAbajo'><img className='imgHome' src='./utils/logo.png' /></div>
    </div>
  );
};

export default TagsHome;
