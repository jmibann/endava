const S = require('sequelize');
const db = require('../config/db');

const Tags = db.define('tags', {
  tag: {
    type: S.STRING
  }
});

module.exports = Tags
;
