const express = require('express');
const router = express.Router();
const LikesControllers = require('../controllers/likesControllers.js');

router.put('/', LikesControllers.addLike);
router.get('/', LikesControllers.getAllLikes);
router.delete('/:userId/:petId', LikesControllers.deleteLike)

module.exports = router;