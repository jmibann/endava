import React from 'react';
import { connect } from 'react-redux';

// eslint-disable-next-line no-unused-vars
import AddUserForm from '../components/addUser';
import { createUser, getAllUsers } from '../redux/action-creator/user-actions';

class addUser extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      nombre: '',
      email: '',
      password: '',
      secondPassword: '',
      area: '',
      isAdmin: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    this.props.getAllUsers();
  }

  handleSubmit (e) {
    e.preventDefault();
    if (this.state.email.split('@')[1] !== 'endava.com') {
      alert('email must belong to ' + '@endava.com');
    } else if (this.state.password !== this.state.secondPassword) {
      alert('The Passwords you entered do not match');
    } else if (this.state.secondPassword.length < 6) {
      alert('As minimum your password must contain 6 characters');
    } else if (!this.state.nombre || !this.state.email || !this.state.password || !this.state.secondPassword || !this.state.area) {
      alert('You must complete all fields in order to continue');
    } else {
      for (let i = 0; i < this.props.users.length; i += 1) {
        if (this.props.users[i].email === this.state.email) {
          return alert('The mail entered is already in use');
        }
      }
      this.props.createUSer(this.state);
      return this.props.history.push('/');
    }
  }

  handleChange (e) {
    this.setState(
      { [e.target.name]: e.target.value });
  }

  render () {
    return (
      < AddUserForm onChange={this.handleChange} onSubmit={this.handleSubmit} />
    )
    ;
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  users: state.user.users
});
const mapDispatchToProps = (dispatch) => ({
  createUSer: (user) => dispatch((createUser(user))),
  getAllUsers: () => dispatch((getAllUsers()))
});

export default connect(mapStateToProps, mapDispatchToProps)(addUser);
