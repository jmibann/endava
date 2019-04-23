
import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import candidatesReducer from './candidatesReducer';
import questionsReducer from './questionsReducer';
import interviewsReducer from './interviewsReducer';
import answersReducer from './answersReducer.js';

export default combineReducers({
  user: usersReducer,
  candidate: candidatesReducer,
  question: questionsReducer,
  interview: interviewsReducer,
  answers: answersReducer
});

// import { SET_USER, SET_CANDIDATE, SET_USERS, SET_CANDIDATES, SET_QUESTIONS, DELETE_QUESTION, EDIT_QUESTION } from '../constants';
// const initialState = {
//   user: {},
//   candidate: {},
//   users: [],
//   candidates: [],
//   allQuestions: [],
//   questId: null
// };

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case SET_USER:
//       return Object.assign({}, state, { user: action.user });
//     case SET_USERS:
//       return Object.assign({}, state, { users: action.users });
//     case SET_CANDIDATES:
//       return Object.assign({}, state, { candidates: action.candidates });
//     case SET_CANDIDATE:
//       return Object.assign({}, state, { candidate: action.candidate });
//     case DELETE_QUESTION:
//       return Object.assign({}, state, { questId: action.questId });
//     case EDIT_QUESTION:
//       return Object.assign({}, state, { questId: action.questId });
//     case SET_QUESTIONS:
//       return Object.assign({}, state, { allQuestions: action.questions });
//     default:
//       return state;
//   }
// };
