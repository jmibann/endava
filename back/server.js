
const express = require('express');
const app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
const session = require('express-session');
var path = require('path');
var morgan = require('morgan');
const db = require('./config/db');
//const apiRoutes = require('./routes');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const Candidate = require('./models/candidate');
const sessionStore = new SequelizeStore({ db });
const PORT = 3001;
const User = require('./models/User');
const Index = require('./routes/index');

app.use(cookieParser());
app.use(
  session({
    secret: 'passport',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  })
);

// ESTRATEGIAS DE LOGIN

const LocalStrategy = require('passport-local').Strategy;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize()); /* esta linea es de configuracion y cuidado con el orden, poner antes de las rutas */
app.use(passport.session()); /* esta idem */
app.use(morgan('dev'));

passport.serializeUser(function (user, done) {
  done(null, user.id);
}); /* esta funcion esta serializando el User=> como guardo el User */

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then(user => done(null, user));
}); /* esta funcion esta deserializando el User => como veo el User */

// ESTRATEGIAS DE AUTORIZACION

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function (username, password, done) {
    console.log('passport CL', username, password);
    User.findOne({ where: { email: username } })
      .then(function (user) {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(done);
  }
));

app.use(express.static(path.resolve(__dirname, 'public')));

app.use('/api', Index);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

sessionStore.sync()
  .then(() => {
    db.sync({ force: false }).then((con) => {
      console.log(`${con.options.dialect} database ${con.config.database} connected at ${con.config.host}:${con.config.port}`);
      app.listen(PORT, () => console.log('SERVER LISTENING AT PORT', PORT));
    });
  });
