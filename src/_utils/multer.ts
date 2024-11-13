import multer from "multer";

const storage = multer.memoryStorage();
const formFileMapper = multer({ storage });

export {formFileMapper}