const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();
const bandRouter = require('./src/routers/bandRouter');
const flutechoirRouter = require('./src/routers/flutechoirRouter');
const videosRouter = require('./src/routers/videosRouter');
const herstoryRouter = require('./src/routers/herstoryRouter');
const adminRouter = require('./src/routers/adminRouter');
const authRouter = require('./src/routers/authRouter');
const lessonsRouter = require('./src/routers/lessonsRouter');

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: `${process.env.SECRET}` }));

require('./src/config/passport.js')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/band',bandRouter);
app.use('/flutechoir', flutechoirRouter);
app.use('/videos', videosRouter);
app.use('/her-story', herstoryRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/lessons', lessonsRouter);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  debug(`listening on port ${chalk.green(PORT)}`);
});
