import { SET_USER, SET_USERS } from '../constants';
import axios from 'axios';

const setUser = (user) => ({
  type: SET_USER,
  user
});

const setUsers = (users) => ({
  type: SET_USERS,
  users
});

export const checkUserLogin = (data) => dispatch =>
  axios.post('/api/users/login', data)
    .then(res => {
      return res.data;
    })
    .then(usuario => dispatch(setUser(usuario)));

export const createUser = (user) => () =>
  axios.post('/api/users/create', { user })
  ;

export const fetchUser = () => dispatch =>
  axios.get('/api/users/user')
    .then(res => res.data)
    .then(user => dispatch(setUser(user)));

export const logOut = () => dispatch =>
  axios.get('/api/users/logOut')
    .then(res => res.data)
    .then(user => dispatch(setUser(user)));

export const getAllUsers = () => dispatch =>
  axios.get('/api/users/getAll')
    .then(res => res.data)
    .then(users => dispatch(setUsers(users)));
