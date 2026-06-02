const express = require('express');
const router = express.Router();
const tasks = require('../data/tasks.json');

router.get('/', (req, res) => {
  res.json(tasks);
});

router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

router.get('/lesson/:lessonId', (req, res) => {
  const lessonTasks = tasks.filter(t => t.lessonId === req.params.lessonId);
  res.json(lessonTasks);
});

router.post('/validate/:id', (req, res) => {
  const { code } = req.body;
  const task = tasks.find(t => t.id === req.params.id);
  
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const isValid = validateCode(code, task.testCases);
  
  res.json({ 
    success: isValid,
    message: isValid ? 'Решение правильно!' : 'Попробуйте ещё раз',
    hints: !isValid ? task.hints : []
  });
});

function validateCode(code, testCases) {
  try {
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = router;