import { SET_CANDIDATE, SET_CANDIDATES,
  SET_CANDIDATE_INTERVW_ID } from '../constants';
import axios from 'axios';

const setCandidate = (candidate) => ({
  type: SET_CANDIDATE,
  candidate

});

const setCandidates = (candidates) => ({
  type: SET_CANDIDATES,
  candidates
});

const setMyCandidates = (candidates) => ({
  type: 'SET_MYCANDIDATES',
  candidates
});

const setInterviewID = (candidateInterviewID) => ({
  type: SET_CANDIDATE_INTERVW_ID,
  candidateInterviewID
});

export const createCandidate = (candidate) => dispatch =>
  axios.post('/api/candidate/create', { candidate })
    .then(res => res.data)
    .then(respuesta => {
      if (respuesta.error) return respuesta.error;
      else dispatch(setCandidate(respuesta));
    });

export const getAllCandidates = () => dispatch =>
  axios.get('/api/candidate/getAll')
    .then(res => res.data)
    .then(candidates => {
      dispatch(setCandidates(candidates));
      return candidates;
    });

export const fetchCandidate = (id) => dispatch =>
  axios.get(`/api/candidate/getOne/${id}`)
    .then(candidate => dispatch(setCandidate(candidate.data)));

export const fetchMyCandidates = (userId) => dispatch =>
  axios.get('/api/candidate/getMyCandidates/' + userId)
    .then(candidates => {
      dispatch(setMyCandidates(candidates.data));
      return candidates.data;
    });

export const fetchCandidateInterview = (candID) => dispatch =>
  axios.get('/api/candidate/getCandidateInterview/' + candID)
    .then(response => dispatch(setInterviewID(response.data)));
