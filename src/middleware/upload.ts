import multer from "multer";

const storage = multer.diskStorage({
  destination: (_req: any, _file: any, cb: any) => {
    cb(null, "uploads/");
  },
  filename: (_req: any, file: any, cb: any) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export default multer({ storage });

