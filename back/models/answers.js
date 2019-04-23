const S = require('sequelize');
const db = require('../config/db');

const Answers = db.define('answers', {
  observations: {
    type: S.TEXT
  },
  score: {
    type: S.INTEGER
  },
  answered: {
    type: S.BOOLEAN,
    defaultValue : false
  }
});

module.exports = Answers;
