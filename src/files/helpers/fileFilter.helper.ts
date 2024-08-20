export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {

    if (!file) return callback(new Error('File is empty'), false);

    const fileExtention = file.mimetype.split('/')[1];
    const validExtentions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

    if (!validExtentions.includes(fileExtention)) {
        return callback(new Error('File extention is not valid'), false);
    }

    callback(null, true);
}