const Validator = require('fastest-validator');
const jwt = require('jsonwebtoken');
const models = require('../models');

async function getPosts(req, res) {
    try {
        const allPost = await models.Post.findAll({
            include: [{
                model: models.User, as: "user", attributes: ['id', 'name'],
            },
            {
                model: models.like, as: "like", attributes: ['id', 'userId'],
            }]
        });
        if (allPost) {
            res.status(200).json(allPost);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

async function getPost(req, res) {
    try {
        const id = req.params.id;

        const post = await models.Post.findByPk(id, {
            include: [{
                model: models.Comment, as: "comment", attributes: ['id', 'comment'],
            },
            {
                model: models.like, as: "like", attributes: ['id', 'userId'],
            }]
        });
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post not found!" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

async function createPost(req, res) {

    try {

        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const usrerData = req.userData = decodedToken;

        const post = {
            title: req.body.title,
            body: req.body.body,
            userId: usrerData.userId
        }

        const schema = {
            title: { type: "string", optional: false, max: "80" },
            body: { type: "string", optional: false, max: "500" },
        }

        const v = new Validator();
        const validationResponse = v.validate(post, schema);

        if (validationResponse !== true) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validationResponse
            });
        }

        const newPost = await models.Post.create(post);
        if (newPost) {
            res.status(201).json({ message: "Post created successfully", post: newPost });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

async function updatePost(req, res) {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const userData = req.userData = decodedToken;
        const id = req.params.id;

        const updatedPost = {
            title: req.body.title,
            body: req.body.body,
            userId: userData.userId
        }

        const schema = {
            title: { type: "string", optional: false, max: "100" },
            body: { type: "string", optional: false, max: "500" },
        }

        const v = new Validator();
        const validationResponse = v.validate(updatedPost, schema);

        if (validationResponse !== true) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validationResponse
            });
        }

        const updatePost = await models.Post.update(updatedPost, { where: { id: id } });
        if (updatePost) {
            res.status(200).json({ message: "Post updated successfully", post: updatePost });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });

    }

}

async function deletePost(req, res) {

    try {
        const id = req.params.id;

        await models.Post.destroy({ where: { id: id } });
        res.status(200).json({ message: "Post deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });

    }

}

module.exports = {
    getPosts: getPosts,
    getPost: getPost,
    createPost: createPost,
    updatePost: updatePost,
    deletePost: deletePost
}