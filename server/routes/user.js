const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

router.get('/me', authMiddleware, (req, res) => {
  res.json(req.user);
});


router.get('/', (req, res) => {
  res.json({message:"sucessful"});
});

module.exports = router;
