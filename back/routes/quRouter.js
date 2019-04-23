const express = require('express');
const Questions = require('../models/questions');
const Tags = require('../models/tags');

const router = express.Router();

router.get('/delete/:id', (req, res) => {
  Questions.findById(req.params.id)
    .then(quest => {
      quest.destroy()
        .then(() => res.send(200));
    });
});

router.get('/reqAllQuestions/:area', (req, res) => {
  Questions.findAll({
    include: [{ model: Tags }],
    where: { area: req.params.area }
  }
  )
    .then(quest => {
      res.send(quest);
    });
});

router.get('/tags', (req, res) => {
  Tags.findAll()
    .then(function (tags) {
      res.send(tags);
    });
});

router.post('/edit/:id', (req, res) => {
  Questions.findByPk(req.params.id)
    .then(question => {
      question.update({ content: req.body.content })
        .then(pepe => {
          res.send(pepe);
        });
    });
});

router.post('/create', (req, res, next) => {
  Tags.findAll()
    .then(tagsArray => {
      let tagIDsArray = [];
      for (let i = 0; i < req.body.tags.length; i++) {
        for (let j = 0; j < tagsArray.length; j++) {
          if (tagsArray[j].tag === req.body.tags[i]) tagIDsArray.push(tagsArray[j].id);
        }
      }
      Questions.findOrCreate({ where: {
        content: req.body.content,
        area: req.body.area,
        required: req.body.required
      } }
      )
        .then(([question, created]) => {
          // I need to send an array with the tags IDs not names
          if (created) {
            console.log('TAGSidArray', tagIDsArray);
            question.setTags(tagIDsArray);
          }
          res.send(200);
        })
        .catch(next);
    });
});

router.get('/searchHRQuestions', (req, res) => {
  Questions.findAll({ where: { area: 'RRHH' } })
    .then(area => res.send(area));
});

router.post('/create/tags', (req, res) => {
  Tags.findOrCreate({ where: req.body })
    .then(([tag, created]) => {
      res.send(200);
    });
});

router.post('/candidateQuestions', (req, res) => {
  let questionArray = req.body.arrayIdTags;
  let promisesArray = [];
  let questionToSend = [];
  for (let i in questionArray) {
    promisesArray.push(
      Tags.findByPk(questionArray[i], { include: [{
        model: Questions } ] })
    );
  }
  Promise.all(promisesArray)
    .then(questionsArray => {
      for (let i in questionsArray) {
        for (let j in questionsArray[i].questions) {
          if (questionsArray[i].questions[j].area === 'Sistemas') {
            questionToSend.push({
              id: questionsArray[i].questions[j].id,
              content: questionsArray[i].questions[j].content
            });
          }
        }
      }
      res.send(questionToSend);
    });
});
module.exports = router;
