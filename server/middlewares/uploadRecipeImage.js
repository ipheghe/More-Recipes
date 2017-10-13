import multer from 'multer';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '../../server/uploads/recipes/');
  },
  filename(req, file, cb) {
    const ext = file.originalname.split('.').pop();
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  }
});
const upload = multer({ storage });
export default upload;