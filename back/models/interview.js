const S = require('sequelize');
const db = require('../config/db.js');

const Interview = db.define('interview', {
  SistObs: {
    type: S.STRING
  },
  HRObs: {
    type: S.STRING
  },
  sistDate: {
    type: S.DATE
  },
  HRDate: {
    type: S.DATE
  }
});

module.exports = Interview;
