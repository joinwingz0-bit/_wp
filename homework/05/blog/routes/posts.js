const { Router } = require('express');
const db = require('../db');

const router = Router();

function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/auth/login');
  }
  next();
}

router.get('/', (req, res) => {
  const posts = db.all(`
    SELECT posts.*, users.username AS author
    FROM posts JOIN users ON posts.author_id = users.id
    ORDER BY posts.created_at DESC
  `);
  res.render('index', { posts });
});

router.get('/new', requireAuth, (req, res) => {
  res.render('new');
});

router.get('/:id', (req, res) => {
  const post = db.get(`
    SELECT posts.*, users.username AS author
    FROM posts JOIN users ON posts.author_id = users.id
    WHERE posts.id = ?
  `, [req.params.id]);
  if (!post) return res.status(404).send('Not Found');
  res.render('show', { post });
});

router.post('/', requireAuth, (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send('Title and content are required');
  }
  const result = db.run(
    'INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)',
    [title, content, req.session.userId]
  );
  res.redirect(`/posts/${result.lastInsertRowid}`);
});

router.get('/:id/edit', requireAuth, (req, res) => {
  const post = db.get('SELECT * FROM posts WHERE id = ?', [req.params.id]);
  if (!post) return res.status(404).send('Not Found');
  if (post.author_id !== req.session.userId) {
    return res.status(403).send('Forbidden');
  }
  res.render('edit', { post });
});

router.post('/:id', requireAuth, (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send('Title and content are required');
  }
  const post = db.get('SELECT * FROM posts WHERE id = ?', [req.params.id]);
  if (!post) return res.status(404).send('Not Found');
  if (post.author_id !== req.session.userId) {
    return res.status(403).send('Forbidden');
  }
  db.run(
    "UPDATE posts SET title = ?, content = ?, updated_at = datetime('now', 'localtime') WHERE id = ?",
    [title, content, req.params.id]
  );
  res.redirect(`/posts/${req.params.id}`);
});

router.post('/:id/delete', requireAuth, (req, res) => {
  const post = db.get('SELECT * FROM posts WHERE id = ?', [req.params.id]);
  if (!post) return res.status(404).send('Not Found');
  if (post.author_id !== req.session.userId) {
    return res.status(403).send('Forbidden');
  }
  db.run('DELETE FROM posts WHERE id = ?', [req.params.id]);
  res.redirect('/posts');
});

module.exports = router;
