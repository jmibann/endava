import React from 'react';
import { Link } from 'react-router-dom';
import { logOut } from '../redux/action-creator/user-actions';
import { connect } from 'react-redux';

const Header = (props) => {
  return (
    <div className=' header'>
      {props.user && props.user.id
        ? <div className='headerDisplay'>
          <div className='leftHeader'>

            <img id='imgHeader' src="/utils/user1.svg">
            </img><h5 id='headerName'>{props.user.nombre + '(' + (props.user.area === 'RRHH' ? 'HR' : 'SYST') + ')'}</h5>
          </div>
          <div className='iconHeader'>
            <Link to='/'><img src="/utils/home.png" className='homeBtn'/></Link>
            <button id='botonHeaderLogOut' className='iconsHeader ActionsBotonesBlanco' onClick={(e) => {
              e.preventDefault();
              props.logOut();
              return props.history.push('/login');
            }} >LOG OUT</button></div>
        </div>
        : <h2></h2>}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user
});
const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch((logOut()))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
