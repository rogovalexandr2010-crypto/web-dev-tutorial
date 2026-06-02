const express = require('express');
const router = express.Router();

router.get('/user/:userId', (req, res) => {
  res.json({
    userId: req.params.userId,
    completedLessons: [],
    completedTasks: [],
    achievements: [],
    currentStreak: 0
  });
});

router.post('/save', (req, res) => {
  const { userId, lessonId, taskId, status } = req.body;
  
  res.json({ 
    success: true, 
    message: 'Progress saved'
  });
});

router.get('/achievements/:userId', (req, res) => {
  res.json({
    userId: req.params.userId,
    achievements: []
  });
});

module.exports = router;