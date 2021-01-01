const Validator = require('fastest-validator');
const jwt = require('jsonwebtoken');
const models = require('../models');


async function getComment(req, res) {
    try {
        const id = req.params.id;
        const comment = await models.Comment.findByPk(id);
        if (comment) {
            res.status(200).json(comment);
        }
        else
            res.status(404).json({ message: "Comment not found!" });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

async function createComment(req, res) {
    try {
        const postId = req.params.id;
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const usrerData = req.userData = decodedToken;

        const comment = {
            comment: req.body.comment,
            postId: postId,
            userId: usrerData.userId
        };

        const schema = {
            comment: { type: "string", optional: false, max: "500" },
        };

        const v = new Validator();
        const validationResponse = v.validate(comment, schema);

        if (validationResponse !== true) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validationResponse
            });
        }

        const getPost = await models.Post.findByPk(postId);
        if (getPost === null) {
            res.status(404).json({ message: "Post not found" });
        } else {
            const newComment = await models.Comment.create(comment);
            if (newComment) {
                res.status(201).json({ comment: newComment });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}


async function updateCommet(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const usrerData = req.userData = decodedToken;
        const comId = req.params.comId;

        const updatedComment = {
            comment: req.body.comment
        };

        const schema = {
            comment: { type: "string", optional: false, max: "500" },
        };

        const v = new Validator();
        const validationResponse = v.validate(updatedComment, schema);

        if (validationResponse !== true) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validationResponse
            });
        }

        const updateComment = models.Comment.update(updatedComment, { where: { id: comId, userId: usrerData.userId } });
        if (updateComment)
            res.status(200).json({ comment: updateComment });

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

async function deleteComment(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const usrerData = req.userData = decodedToken;
        const comId = req.params.comId;


        await models.Comment.destroy({ where: { id: comId, userId: usrerData.userId } });
        res.status(200).json({ message: "Comment deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getComment: getComment,
    createComment: createComment,
    updateCommet: updateCommet,
    deleteComment: deleteComment,
} 