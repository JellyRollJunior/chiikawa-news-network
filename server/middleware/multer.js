import multer from 'multer';

const storage = multer.memoryStorage();

const imageFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        'image/jpg',
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
    ];
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};

const retrieveImageMulter = multer({
    storage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 1024 * 250, // 200kb limit
    },
});

const retrieveAvatar = retrieveImageMulter.single('avatar');
const retrieveMedia = retrieveImageMulter.single('media');

export { retrieveAvatar, retrieveMedia };
