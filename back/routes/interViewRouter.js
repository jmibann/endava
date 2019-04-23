const express = require('express');
const Interview = require('../models/interview');
const Candidate = require('../models/candidate');

const router = express.Router();

router.post('/newInterview', (req, res) => {
  Interview.findOrCreate({
    where: {
      candidateIDId: req.body.candidateId }
  })
    .then(([interview, created]) => {
      if (created) {
        interview.setCandidateID(req.body.candidateId);
        Candidate.findByPk(req.body.candidateId)
          .then((candidate) => {
            console.log('&&&&&CANIDADTO&&&&&&', candidate);
            console.log('&&&&&ENTREVITA&&&&&&', interview);
            candidate.setInterviewID(interview.id);
          });
      }
      res.send(interview);
    });
});

router.get('/getInterview/:id', (req, res) => {
  Interview.findOne({ where: { candidateIDId: req.params.id } })
    .then(data => {
      res.send(data);
    });
});

router.post('/candidateInt', (req, res) => {
  let { candidateID, questionsID } = req.body;
  Interview.findOne({ where: { candidateIDId: candidateID } })
    .then(interview => {
      // console.log('====================>', interview);
      // Answers.create({
      //   interviewId: interview.id,
      //   questionId: 9
      // })
      //   .then(data => {
      interview.addQuestion(questionsID, { through: 'Answer' });
      console.log(interview);
      // }
      // );
    });
  res.send(200);
});

router.get('/:id', (req, res) => {
  Interview.findByPk(req.params.id)
    .then(interview => {
      res.send(interview);
    });
})
;

module.exports = router
;
