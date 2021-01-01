const multer = require('multer');
const path = require('path');
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});

const deleteImage = async (file) => {
    try {
        fs.unlinkSync('./uploads/' + file)
    } catch (err) {
        console.error(err)
    }

};


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file upload'), false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: fileFilter
});

module.exports = {
    upload: upload,
    deleteImage: deleteImage
}