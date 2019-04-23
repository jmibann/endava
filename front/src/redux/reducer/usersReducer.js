import { SET_USER, SET_USERS } from '../constants';

const initialState = {
  user: {},
  users: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, { user: action.user });
    case SET_USERS:
      return Object.assign({}, state, { users: action.users });
    default:
      return state;
  }
};
