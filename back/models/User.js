const db = require('../config/db');
const S = require('sequelize');
const crypto = require('crypto');

const User = db.define('usuario', {
  nombre: {
    type: S.STRING,
    allowNull: false
  },
  email: {
    type: S.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  area: {
    type: S.ENUM,
    values: ['RRHH', 'Sistemas'],
    allowNull: false
  },
  password: {
    type: S.STRING,
    allowNull: false
  },
  salt: {
    type: S.STRING
  },
  isAdmin: {
    type: S.BOOLEAN
  }
});

User.addHook('beforeCreate', (usuario) => {
  usuario.salt = crypto.randomBytes(20).toString('hex');
  usuario.password = usuario.hashPassword(usuario.password);
});

User.prototype.hashPassword = function (password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

User.prototype.validPassword = function (password) {
  return this.password === this.hashPassword(password);
};

module.exports = User;
