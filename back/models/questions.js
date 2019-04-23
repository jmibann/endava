const S = require('sequelize');
const db = require('../config/db');

const Questions = db.define('questions', {
  content: {
    type: S.TEXT,
    validate: {
      notEmpty: true
    }
  },
  area: {
    type: S.STRING
  },
  required: {
    type: S.BOOLEAN
  }
});

module.exports = Questions;
