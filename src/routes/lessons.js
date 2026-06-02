const express = require('express');
const router = express.Router();
const lessons = require('../data/lessons.json');

router.get('/', (req, res) => {
  res.json(lessons);
});

router.get('/:id', (req, res) => {
  const lesson = lessons.find(l => l.id === req.params.id);
  if (!lesson) {
    return res.status(404).json({ error: 'Lesson not found' });
  }
  res.json(lesson);
});

router.get('/module/:moduleName', (req, res) => {
  const moduleLessons = lessons.filter(l => l.module === req.params.moduleName);
  res.json(moduleLessons);
});

module.exports = router;