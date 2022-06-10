const express = require('express');
const router = express.Router({ mergeParams: true });

const { getNotes, createNote } = require('../controllers/noteController');
const { protectRoute } = require('../middleware/auth');

router.route('/').get(protectRoute, getNotes).post(protectRoute, createNote);

module.exports = router;
