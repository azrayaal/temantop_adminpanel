import multer from "multer";
import { Request, Response, NextFunction } from "express";

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Destination folder for file storage
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Replace spaces with underscores in the original file name
    const sanitizedOriginalName = file.originalname.replace(/\s+/g, "_");
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + sanitizedOriginalName);
  },
});

// Filter to allow only JPEG and PNG files
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile?: boolean) => void
) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG and PNG files are allowed!"), false);
  }
};

// Configure Multer with the specified storage and file filter
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Set file size limit to 5MB (5 * 1024 * 1024 bytes)
  },
  fileFilter: fileFilter,
});

// Higher-order function to create middleware for uploading a single file with a dynamic field name
const uploadSingle = (fieldName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const singleUpload = upload.single(fieldName);
    singleUpload(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        // Handle Multer errors (e.g., file size exceeded)
        return res.status(400).json({ message: err.message });
      } else if (err) {
        // Handle other errors (e.g., wrong file type)
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  };
};

// Middleware for uploading multiple files with specified limits
const uploadMultiple = (fields: { [key: string]: number }) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const uploadFields = Object.keys(fields).map((field) => ({
      name: field,
      maxCount: fields[field],
    }));

    const uploadMultiples = upload.fields(uploadFields);

    uploadMultiples(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        // Handle Multer errors (e.g., file size exceeded)
        return res.status(400).json({ message: err.message });
      } else if (err) {
        // Handle other errors (e.g., wrong file type)
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  };
};

export { uploadSingle, uploadMultiple };
