// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

class AllUsers extends React.Component {
  constructor (props) {
    super(props);
    this.state = { selected: null };
  }
  render () {
    return (
      !this.props.user.isAdmin ? <h2>Lo siento, pero no tienes acceso para ver esta página</h2>
        : <div className='newTableDiv'>
          <div className='addcand'>
            <img className='imgHome' src='/utils/logo.png' />
            <h2 className='newtitHome' style={{ textAlign: 'center', alignSelf: 'end' }}>ALL USERS</h2>
            <div style={{ alignSelf: 'end' }}><Link to="/users/addUser" ><button style={{ width: '70%', margin: '0 auto' }} type="button" className="btn btn-lg ActionsBotonesBlanco">Add User +</button></Link></div>
          </div>
          <table className="table">
            <thead style={{ borderBottom: '5px solid #DE411B', borderTop: '5px solid #DE411B', marginTop: '20px' }}>
              <tr>
                <th scope="col" className='tableHeading'>NAME</th>
                <th scope="col" className='tableHeading' >EMAIL</th>
                <th scope="col" className='tableHeading' >AREA</th>
                <th scope="col" className='tableHeading' >ADMIN</th>
                <th scope="col" className='tableHeading' >DELETE</th>
              </tr>
            </thead>
            {this.props.users && (this.props.user.area === 'RRHH')
              ? this.props.users.sort((a, b) => a.id - b.id).map((user, index = 0) => {
                return (
                  <tbody key={index++}>
                    <tr>
                      <th className='tableHeading' scope="row">{user.nombre}</th>
                      <td className='tableHeading'>{user.email}</td>
                      <td className='tableHeading'>{user.area === 'RRHH' ? 'HR' : 'Syst'}</td>
                      <td className='tableHeading'>{user.isAdmin ? <img style={{
                        width: '25%',
                        height: 'auto'
                      }} src='/utils/checked2.svg' /> : <img style={{
                        width: '25%',
                        height: 'auto'
                      }} src='/utils/unchecked.svg' />}</td>
                      <td>
                        <a><img onClick={() => this.setState({ selected: user.id })} data-toggle="modal" data-target="#exampleModal" id='trashUser' src="/utils/garbage.svg"></img></a>
                        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title textModal" id="exampleModalLabel">Reconfirm</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body textModal">
                                Are you sure you want to delete this user?
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary textModal" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary textModal" data-dismiss="modal" onClick={() => {
                                  this.props.onClick(user.id);
                                }}>Yes</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                );
              })
              : this.props.usersSIST.map(user => {
                return (
                  <tbody key={user.id}>
                    <tr>
                      <th className='tableHeading' scope="row">{user.nombre}</th>
                      <td className='tableHeading'>{user.email}</td>
                      <td className='tableHeading'>{user.area === 'RRHH' ? 'HR' : 'Syst'}</td>
                      <td className='tableHeading'>{user.isAdmin ? <img style={{
                        width: '25%',
                        height: 'auto'
                      }} src='/utils/checked2.svg' /> : <img style={{
                        width: '25%',
                        height: 'auto'
                      }} src='/utils/unchecked.svg' />}</td>
                      <td>
                        <a><img onClick={() => this.setState({ selected: user.id })} data-toggle="modal" data-target="#exampleModal" id='trashUser' src="/utils/garbage.svg"></img></a>
                        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title textModal" id="exampleModalLabel">Reconfirm</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body textModal">
                                Are you sure you want to delete this user?
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary textModal" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary textModal" data-dismiss="modal" onClick={() => {
                                  this.props.onClick(user.id);
                                }}>Yes</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                );
              })
            }
          </table>
        </div>
    );
  }
};

export default AllUsers;
