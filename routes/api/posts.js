const express = require('express');
const router = express.Router();



// @route    Get api/posts
// desc      Testing posts route 
// @access   public


router.get('/', (req, res) => res.send('posts Route'));

module.exports = router;