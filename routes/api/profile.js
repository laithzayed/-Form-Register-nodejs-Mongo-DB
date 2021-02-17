const express = require('express');
const router = express.Router();



// @route    Get api/profile
// desc      Testing profile route 
// @access   public


router.get('/', (req, res) => res.send('profile Route'));

module.exports = router;