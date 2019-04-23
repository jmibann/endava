const S = require('sequelize');
const db = require('../config/db');

const Candidate = db.define('candidate', {
  name: {
    type: S.STRING
  },

  surname: {
    type: S.STRING

  },

  fullName: {
    type: S.VIRTUAL,
    get: function () {
      return this.name + ' ' + this.surname;
    }

  },

  email: {
    type: S.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  },

  telNumber: {
    type: S.STRING

  },

  expertise: {
    type: S.TEXT

  },

  url: {
    type: S.STRING,
    validate: {
      isUrl: true
    }

  },

  status: {
    type: S.STRING

  }
});

module.exports = Candidate;
