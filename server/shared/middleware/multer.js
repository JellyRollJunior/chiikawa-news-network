import multer from 'multer';

const storage = multer.memoryStorage();
const allowedMimeTypes = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
];

const imageFilter = (req, file, cb) => {
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};

const retrieveImageMulter = multer({
    storage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 1024 * 250, // 250kb limit
    },
});

const retrieveAvatar = retrieveImageMulter.single('avatar');
const retrieveMedia = retrieveImageMulter.single('media');

export { allowedMimeTypes, retrieveAvatar, retrieveMedia };
