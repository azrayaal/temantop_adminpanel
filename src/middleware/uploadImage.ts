// import multer from "multer";
// import { Request, Response, NextFunction } from "express";

// // Configure storage for uploaded files
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads/"); // Destination folder for file storage
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     // Replace spaces with underscores in the original file name
//     const sanitizedOriginalName = file.originalname.replace(/\s+/g, "_");
//     cb(null, file.fieldname + "-" + uniqueSuffix + "-" + sanitizedOriginalName);
//   },
// });

// // Filter to allow only JPEG and PNG files
// const fileFilter = (
//   req: Request,
//   file: Express.Multer.File,
//   cb: (error: Error | null, acceptFile?: boolean) => void
// ) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(new Error("Only JPEG and PNG files are allowed!"), false);
//   }
// };

// // Configure Multer with the specified storage and file filter
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5, // Set file size limit to 5MB (5 * 1024 * 1024 bytes)
//   },
//   fileFilter: fileFilter,
// });

// // Higher-order function to create middleware for uploading a single file with a dynamic field name
// const uploadSingle = (fieldName: string) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const singleUpload = upload.single(fieldName);
//     singleUpload(req, res, (err: any) => {
//       if (err instanceof multer.MulterError) {
//         // Handle Multer errors (e.g., file size exceeded)
//         return res.status(400).json({ message: err.message });
//       } else if (err) {
//         // Handle other errors (e.g., wrong file type)
//         return res.status(400).json({ message: err.message });
//       }
//       next();
//     });
//   };
// };

// // Middleware for uploading multiple files with specified limits
// const uploadMultiple = (...fields: string[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const uploadFields = fields.map((field) => ({ name: field, maxCount: 1 })); // Batasi tiap field hanya satu file

//     const uploadHandler = upload.fields(uploadFields);

//     uploadHandler(req, res, (err: any) => {
//       if (err instanceof multer.MulterError) {
//         return res.status(400).json({ message: err.message });
//       } else if (err) {
//         return res.status(400).json({ message: err.message });
//       }
//       next();
//     });
//   };
// };


// export { uploadSingle, uploadMultiple };


import multer from "multer";
import { Request, Response, NextFunction } from "express";

// Konfigurasi penyimpanan untuk file yang diunggah
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Folder tujuan penyimpanan file
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const sanitizedOriginalName = file.originalname.replace(/\s+/g, "_"); // Ganti spasi dengan underscores
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + sanitizedOriginalName);
  },
});

// Filter untuk hanya mengizinkan file JPEG dan PNG
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

// Konfigurasi Multer dengan penyimpanan dan filter file yang ditentukan
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Batas ukuran file 5MB
  fileFilter: fileFilter,
});

// Middleware untuk mengunggah satu file dengan nama field dinamis
const uploadSingle = (fieldName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const singleUpload = upload.single(fieldName);
    singleUpload(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        // Tangani error dari Multer (misalnya ukuran file melebihi batas)
        return res.status(400).json({ message: err.message });
      } else if (err) {
        // Tangani error lain (misalnya tipe file salah)
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  };
};

// Middleware untuk mengunggah beberapa file berdasarkan field tertentu
const uploadMultiple = (...fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const uploadFields = fields.map((field) => ({ name: field, maxCount: 1 })); // Batasi tiap field hanya satu file

    const uploadHandler = upload.fields(uploadFields);

    uploadHandler(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
      } else if (err) {
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  };
};

export { uploadSingle, uploadMultiple };
