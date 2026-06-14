const { Router } = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');

const router = Router();

router.get('/register', (req, res) => {
  if (req.session.userId) return res.redirect('/posts');
  res.render('register');
});

router.post('/register', (req, res) => {
  const { username, password, confirm_password } = req.body;

  if (!username || !password || !confirm_password) {
    return res.status(400).render('register', { error: '所有欄位皆為必填' });
  }
  if (password !== confirm_password) {
    return res.status(400).render('register', { error: '兩次密碼不一致' });
  }
  if (password.length < 4) {
    return res.status(400).render('register', { error: '密碼至少 4 個字元' });
  }

  const existing = db.get('SELECT id FROM users WHERE username = ?', [username]);
  if (existing) {
    return res.status(400).render('register', { error: '使用者名稱已存在' });
  }

  const hash = bcrypt.hashSync(password, 10);
  db.run('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, hash]);

  res.redirect('/auth/login');
});

router.get('/login', (req, res) => {
  if (req.session.userId) return res.redirect('/posts');
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).render('login', { error: '請輸入帳號與密碼' });
  }

  const user = db.get('SELECT * FROM users WHERE username = ?', [username]);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(400).render('login', { error: '帳號或密碼錯誤' });
  }

  req.session.userId = user.id;
  res.redirect('/posts');
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/posts');
  });
});

module.exports = router;
