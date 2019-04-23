import { SET_CANDIDATE, SET_CANDIDATES, SET_MYCANDIDATES,
  SET_CANDIDATE_INTERVW_ID } from '../constants';
const initialState = {
  candidate: {},
  candidates: [],
  myCandidates: [],
  interviewID: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CANDIDATES:
      return Object.assign({}, state, { candidates: action.candidates });
    case SET_CANDIDATE:
      return Object.assign({}, state, { candidate: action.candidate });
    case SET_MYCANDIDATES:
      return Object.assign({}, state, { myCandidates: action.candidates });
    case SET_CANDIDATE_INTERVW_ID:
      return Object.assign({}, state, { interviewID: action.candidateInterviewID })
    default:
      return state;
  }
};
