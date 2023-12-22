// Multer Setup goes under here
// Multer handles the collection of files from the server
import multer, { diskStorage } from "multer";
const storage = diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, file.fieldname + "-" + Date.now());
  } else {
    cb("invalid image file!", false);
  }
};

const upload = multer({ storage, fileFilter });
export default upload
// Cloudinary config goes under here
