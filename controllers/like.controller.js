const Validator = require('fastest-validator');
const jwt = require('jsonwebtoken');
const models = require('../models');


async function likePost(req, res) {

    try {
        const postId = req.params.id;
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const usrerData = req.userData = decodedToken;

        const like = {
            postId: postId,
            userId: usrerData.userId
        }

        const post = await models.Post.findByPk(postId);
        if (post === null) {
            res.status(404).json({ message: "Post not found" });
        }
        const newLike = await models.like.create(like);
        if (newLike) {
            res.status(201).json({ message: "Post Like successfully", like: newLike });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}


async function dislikePost(req, res) {

    try {
        const postId = req.params.id;
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const usrerData = req.userData = decodedToken;

        await models.like.destroy({ where: { postId: postId, userId: usrerData.userId } });
        res.status(200).json({ message: "Post Dislike successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });

    }

}

module.exports = {
    likePost: likePost,
    dislikePost: dislikePost,
}