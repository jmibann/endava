import { SET_INTERVIEW } from '../constants';

const initialState = {
  interview: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INTERVIEW:
      return Object.assign({}, state, { interview: action.interview });
    default:
      return state;
  }
};
