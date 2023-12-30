import multer from "multer";
import * as path from "path";

export const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename: (req, file, callback) => {
        const time = new Date().getTime();
        const sanitizedFileName = file.originalname.replace(/[^a-zA-Z0-9]+/g, '_');
        const generatedFileName = sanitizedFileName + '-' + time + path.extname(file.originalname);
    
        callback(null, generatedFileName);
    }
})