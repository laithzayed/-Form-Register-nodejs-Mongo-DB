const express = require('express');
const router = express.Router();



// @route    Get api/auth
// desc      Testing auth route 
// @access   public


router.get('/', (req, res) => res.send('auth Route'));

module.exports = router;