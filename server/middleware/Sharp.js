import sharp from 'sharp';

const resizeAvatar = async (req, res, next) => {
    if (!req.file || !req.file.buffer) next();
    try {
        const animated =
            req.file.mimetype.split('/')[1] == 'gif' ? true : false;
        const resizedBuffer = await sharp(req.file.buffer, { animated })
            .resize(200, null)
            .webp({ quality: 75 })
            .toBuffer();
        req.file.buffer = resizedBuffer;
        req.file.mimetype = 'image/webp'
        next();
    } catch (error) {}
};

export { resizeAvatar };
