const express = require('express');
const postsController = require('../controllers/post.controller');
const likesController = require('../controllers/like.controller');
const commentController = require('../controllers/comment.controller');
const adminMiddleware = require('../middleware/admin');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post("/", adminMiddleware, postsController.createPost);
router.get("/", postsController.getPosts);
router.get("/:id", postsController.getPost);
router.patch("/:id", adminMiddleware, postsController.updatePost);
router.delete("/:id", adminMiddleware, postsController.deletePost);


router.post("/:id/like", authMiddleware, likesController.likePost);
router.post("/:id/dislike", authMiddleware, likesController.dislikePost);

router.post("/:id/comments", authMiddleware, commentController.createComment);
router.patch("/:id/comments/:comId", authMiddleware, commentController.updateCommet);
router.delete("/:id/comments/:comId", authMiddleware, commentController.deleteComment);


module.exports = router;