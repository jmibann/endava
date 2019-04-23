import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import AllUsersGrid from '../components/allUsers';

import { getAllUsers } from '../redux/action-creator/user-actions';

class AllUsers extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  onClick(id) {
    axios.delete(`/api/users/delete/${id}`)
      .then(() => this.props.getAllUsers());
  }

  render() {
    return (
      this.props.users && this.props.users.length < 1 ? <h2>Cargando...</h2>
        : <AllUsersGrid
          onClick={this.onClick}
          users={this.props.users}
          user={this.props.user}
          usersSIST={this.props.usersSIST}
        />
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  users: state.user.users,
  usersSIST: state.user.users.filter(user => user.area === 'Sistemas')
});
const mapDispatchToProps = (dispatch) => ({
  getAllUsers: () => dispatch(getAllUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
