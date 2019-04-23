import { SET_ANSWERSHR, SET_ANSWERS_SIST, SET_OBS } from '../constants';

const initialState = {
  answersHR: [],
  answersSIST: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ANSWERSHR:
      return Object.assign({}, state, { answersHR: action.answersHR });
    case SET_ANSWERS_SIST:
      return Object.assign({}, state, { answersSIST: action.answersSIST });
    case SET_OBS:
      return Object.assign({}, state, action.observations);
    default:
      return state;
  }
};
