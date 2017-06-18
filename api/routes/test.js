const express = require('express');

const router = express.Router();

// testing api routes
router.get('/', (req, res) => {
  res.json({data: 'testing api calls!'});
});

module.exports = router;