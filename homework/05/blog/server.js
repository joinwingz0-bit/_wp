const express = require('express');
const path = require('path');
const session = require('express-session');
const db = require('./db');
const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'simple-blog-secret-key-2026',
  resave: false,
  saveUninitialized: false,
}));

app.use((req, res, next) => {
  res.locals.user = null;
  if (req.session.userId) {
    const user = db.get('SELECT id, username FROM users WHERE id = ?', [req.session.userId]);
    res.locals.user = user;
  }
  next();
});

app.use('/auth', authRouter);
app.use('/posts', postsRouter);

app.get('/', (req, res) => {
  res.redirect('/posts');
});

db.init().then(() => {
  app.listen(PORT, () => {
    console.log(`Blog running at http://localhost:${PORT}`);
  });
});
