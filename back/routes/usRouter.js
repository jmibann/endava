const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const Pregunta = require('../models/questions');
// const Answer = require('../models/answers');

router.post('/login', passport.authenticate('local'), (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
  }
});

router.post('/create', (req, res) => {
  User.create(req.body.user)
    .then(data => res.status(201).send(data));
});

router.get('/user', (req, res) => {
  res.send(req.user);
});

router.get('/getAll', (req, res) => {
  User.findAll()
    .then(users => res.json(users));
});

router.delete('/delete/:id', (req, res) => {
  User.destroy({ where: { id: req.params.id } })
    .then(() => res.sendStatus(200));
});

router.get('/logOut', (req, res) => {
  req.logout();
  res.send({});
});

router.get('/pruebaPreg', (req, res) => {

  console.log("LLEGO NUEVA PREGUNTA!")
  Pregunta.create({
    content: 'ciento setenta mil?',
    area: 'RRHH'
  });
  //   .then(preg => console.log(preg));
  // Tag.create({
  //   tag: 'aca'
  // });

  // Pregunta.findOne({where: {id:'1'}})
  // .then( pregunta => {
  //   pregunta.setTags(['1','2','3','4'])
  //   console.log('PREGUNTONTAAAAAA!',pregunta) ;
  // })

  // Tags.findOne({ where: { id: 4 } })
  //   .then(tag => {
  //     tag.setQuestions(['1', '2', '3', '4']);
  //     console.log('-------------');
  //   });

  res.send(200);
});

module.exports = router;
