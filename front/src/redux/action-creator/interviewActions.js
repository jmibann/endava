import { SET_INTERVIEW } from '../constants';
import axios from 'axios';

const setInterview = (interview) => ({
  type: SET_INTERVIEW,
  interview
});

export const fetchInterview = (candidateID) => dispatch =>
  axios.get('/api/interview/getInterview/' + candidateID)
    .then((interview) => dispatch(setInterview(interview.data.id)));

;
;

export const setInterviewCandidate = (obj) => dispatch =>
  axios.post('/api/interview/candidateInt', obj)
    .then(res => console.log(res));
