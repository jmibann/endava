import { SET_QUESTIONS, SET_HRQUESTIONS, SET_CANDIDATE_QUESTIONS, SET_QUESTIONSIS } from '../constants';
import axios from 'axios';

const setQuestions = (questions) => ({
  type: SET_QUESTIONS,
  questions

});

const setHRQuestions = (questionsHR) => ({
  type: SET_HRQUESTIONS,
  questionsHR

});

const setCandidateQuestions = (candidateQuestions) => ({
  type: SET_CANDIDATE_QUESTIONS,
  candidateQuestions
});

const setQuestionsSis = (questionSIS) => {

console.log('SET QUESTIONS', questionSIS) 
return {
  type: SET_QUESTIONSIS,
  questionSIS
}
}

export const searchAllQuestions = (area) => dispatch =>
  axios.get('/api/questions/reqAllQuestions/' + area)
    .then(res => dispatch(setQuestions(res.data)));

export const searchHRQuestions = () => dispatch =>
  axios.get('/api/questions/searchHRQuestions/')
    .then(res => dispatch(setHRQuestions(res.data)));

export const deleteQuestion = (questId, area) => dispatch =>
  axios.get('/api/questions/delete/' + questId)
    .then(() => dispatch(searchAllQuestions(area)));

export const editQuestion = (questId, modifiedQuestion, area) => dispatch =>
  axios.post(`/api/questions/edit/${questId}`, {
    content: modifiedQuestion
  })
    .then(() => dispatch(searchAllQuestions(area)));

export const saveQuestionsFromFile = (questionsArray, area) => dispatch => {
  let arrayPromsises = [];
  for (let i = 0; i < questionsArray.length; i++) {
    arrayPromsises.push(axios.post('/api/questions/create', questionsArray[i]));
  }
  Promise.all(arrayPromsises)
    .then(() => { console.log('=========== MANDO A BUSCAR LAS PREGUNTAS A BD= ==========', area); dispatch(searchAllQuestions(area)); });
};

export const saveTagsFromFile = (questionsArray) => dispatch => {
  let arrayPromsises = [];
  let arrayNonDuplicatedTags = [];
  for (let j = 0; j < questionsArray.length; j++) {
    for (let i = 0; i < questionsArray[j].tags.length; i++) {
      if (arrayNonDuplicatedTags.indexOf(questionsArray[j].tags[i]) < 0) arrayNonDuplicatedTags.push(questionsArray[j].tags[i]);
    }
  }
  for (let i = 0; i < arrayNonDuplicatedTags.length; i++) {
    arrayPromsises.push(axios.post('/api/questions/create/tags', {
      tag: arrayNonDuplicatedTags[i]
    }));
    Promise.all(arrayPromsises)
      .then(() => { });
  }
};

export const fetchCandidateQuestions = (tags) => dispatch => {
  let arrayIdTags = [];
  for (let i in tags) {
    arrayIdTags.push(tags[i].id);
  }
  axios.post('/api/questions/candidateQuestions', { arrayIdTags })
    .then(response => {
      dispatch(setCandidateQuestions(response.data))
      ;
    });
}
;

export const fetchSisQuestions = (interviewID) => dispatch =>
  // console.log('lo que me llega al action', interviewID);
  axios.get(`/api/answers/getSisAnswers/${interviewID}`)
  // .then(questions => console.log('Lo que viene del back', questions.data))
    .then(questions => dispatch(setQuestionsSis(questions.data)));
