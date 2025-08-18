import multer from 'multer';

const storage = multer.memoryStorage();

const photoFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        'image/jpg',
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
    ];
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};

const retrieveAvatarMulter = multer({
    storage,
    fileFilter: photoFilter,
    limits: {
        fileSize: 1024 * 250, // 200kb limit
    },
});

const retrieveAvatar = retrieveAvatarMulter.single('avatar');

export { retrieveAvatar };
