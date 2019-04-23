/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const Answers = require('../models/answers');
const Questions = require('../models/questions');
const Interview = require('../models/interview');

router.post('/answersHR', (req, res) => {
  let arrayProm = [];

  Answers.findOne({ where: { interviewId: req.body.interviewID } })
    .then(data => {
      if (!data) {
        for (let i in req.body) {
          if (i !== 'interviewID' && i !== 'submitted') {
            arrayProm.push(
              Answers.create({
                interviewId: Number(req.body.interviewID),
                questionId: Number(i),
                observations: req.body[i],
                answered: true
              }))
            ;
          };
        }
        Promise.all(arrayProm)
          .then(respuesta => res.send(respuesta))
          .catch(err => console.log(err));
      } else { return res.send(data); }
    });
});

router.get('/getHRAnswers/:id', (req, res) => {
  Interview.findAll(
    { where: { id: req.params.id },
      include: [{ model: Questions, where: { area: 'RRHH' } }]
    }
  )
    .then(data => {
      var question;
      var answer;
      var arrayPares = [];

      for (let i = 0; i < data.length; i += 1) {
        for (let j = 0; j < data[i].questions.length; j += 1) {
          if (!data[i].questions[j].answers.score) {
            answer = data[i].questions[j].answers.observations;
            question = data[i].questions[j].content;
            arrayPares.push({
              pregunta: question,
              respuesta: answer
            });
          }
        }
      }
      res.send(arrayPares);
    });
});

router.get('/getSisAnswers/:id', (req, res) => {
  Answers.findAll({
    where: {
      interviewId: req.params.id,
      observations: null
    }
  })
    .then(preguntas => {
      let arrayprom = [];
      let arrayPromesas = [];

      preguntas.map(pregunta => {
        arrayPromesas.push(Questions.findByPk(pregunta.questionId));
      });
      Promise.all(arrayPromesas)
        .then(response => {
          response.map(respon => {
            arrayprom.push({
              id: respon.id,
              value: respon.content
            });
          });
          res.send(arrayprom);
        });
    });
});

function transformToArray (obj) {
  let array = [];
  let value;
  for (i in obj) {
    let key = i.split('-');
    key[1] === 'score' ? value = [Number(key[0]), key[1], Number(obj[i])]
      : value = [Number(key[0]), key[1], (obj[i])];
    array.push(value);
  }
  return array;
}

router.post('/postAnswersSIS', (req, res) => {
  let arrayPromis = [];
  let interId = req.body.InterviewSis;

  delete req.body.InterviewSis;

  let answerSis = transformToArray(req.body);
  answerSis.map(answer => {
    arrayPromis.push(Answers.findOne({
      where: { interviewId: interId,
        questionId: answer[0]
      }
    }).then(data => {
      answer[1] === 'score' ? arrayPromis.push(data.update({ score: answer[2] }))
        : arrayPromis.push(data.update({ observations: answer[2] }));
    })
    );
  });
  Promise.all(arrayPromis)
    .then(() => res.sendStatus(200))
    .catch(e => res.sendStatus({ error: e.errors[0].message }));
});

router.get('/getSistAnswers/:id', (req, res) => {
  Interview.findAll(
    { where: { id: req.params.id },
      include: [{ model: Questions }] }
  )
    .then(data => {
      var question;
      var answer;
      var arrayPares = [];

      for (let i = 0; i < data.length; i += 1) {
        for (let j = 0; j < data[i].questions.length; j += 1) {
          if (data[i].questions[j].answers.score) {
            answer = data[i].questions[j].answers.score;
            question = data[i].questions[j].content;
            arrayPares.push({
              pregunta: question,
              score: answer,
              observation: data[i].questions[j].answers.observations
            });
          }
        }
      }
      res.send(arrayPares);
    });
});

router.get('/generalObs/:candID', (req, res) => {
  Interview.findOne({ where: { candidateIDId: req.params.candID } })
    .then(entrevistaCand => {
      if (entrevistaCand) {
        return res.send({
          SistObs: entrevistaCand.SistObs,
          HRObs: entrevistaCand.HRObs
        });
      } else {
        return res.send(200);
      }
    }

    );
});

module.exports = router
;
