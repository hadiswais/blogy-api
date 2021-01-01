const models = require('../models');
const jwt = require('jsonwebtoken');
const imageHelper = require('../helpers/uploader');

async function getImage(req, res) {

    try {
        const imageId = req.params.imageId;
        const image = await models.profileImage.findOne({ where: { id: imageId }, limit: 1 });
        if (image) {

            res.status(200).json({ id: image.id, url: image.url });

        } else {
            res.status(404).json({ message: 'Object not found!', });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }

}

async function createImage(req, res) {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const usrerData = req.userData = decodedToken;

        const image = {
            url: req.file.filename,
            userId: usrerData.userId
        };
        const newImage = await models.profileImage.create(image);
        if (newImage) {
            res.status(201).json({ message: 'Image uploaded successfully', image: newImage });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

async function updateImage(req, res) {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const userData = req.userData = decodedToken;
        const imageId = req.params.imageId;

        const newImageData = {
            url: req.file.filename,
            userId: userData.userId
        };

        const oldImage = await models.profileImage.findByPk(imageId);
        if (oldImage) {
            await imageHelper.deleteImage(oldImage.url);
            const newImage = await models.profileImage.update(newImageData, { where: { id: imageId } });
            if (newImage) {
                res.status(201).json({ message: 'Image uploaded successfully', image: newImage });
            }
        }

    } catch (error) {
        res.status(500).json({ message: error.message });

    }

}

async function deleteImage(req, res) {

    try {
        const imageId = req.params.imageId;
        const image = await models.profileImage.findByPk(imageId);
        if (image) {
            await imageHelper.deleteImage(image.url);
            await image.destroy();
            res.status(200).json({ message: "Image deleted successfully" });
        } else {
            res.status(404).json({ message: 'image not found!', });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createImage: createImage,
    updateImage: updateImage,
    getImage: getImage,
    deleteImage: deleteImage
}