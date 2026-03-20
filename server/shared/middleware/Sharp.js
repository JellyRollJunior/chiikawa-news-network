import sharp from 'sharp';

const resizeImage = async (file, width) => {
    const animated = file.mimetype.split('/')[1] == 'gif' ? true : false;
    const resizedBuffer = await sharp(file.buffer, { animated })
        .resize(width, null)
        .toBuffer();
    return resizedBuffer;
};

const convertToWebp = async (file, quality) => {
    const animated = file.mimetype.split('/')[1] == 'gif' ? true : false;
    const convertedBuffer = await sharp(file.buffer, { animated })
        .webp({ quality })
        .toBuffer();
    return convertedBuffer;
};

const formatAvatar = async (req, res, next) => {
    if (!req.file || !req.file.buffer) next();
    try {
        req.file.buffer = await resizeImage(req.file, 200);
        req.file.buffer = await convertToWebp(req.file, 75);
        req.file.mimetype = 'image/webp';
        next();
    } catch (error) {
        next(error);
    }
};

const formatPost = async (req, res, next) => {
    if (!req.file || !req.file.buffer) next();
    try {
        req.file.buffer = await resizeImage(req.file, 500);
        req.file.buffer = await convertToWebp(req.file, 75);
        req.file.mimetype = 'image/webp';
        next();
    } catch (error) {
        next(error);
    }
};

export { formatAvatar, formatPost };
