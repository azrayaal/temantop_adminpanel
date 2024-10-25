"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultiple = exports.uploadSingle = void 0;
const multer_1 = __importDefault(require("multer"));
// Configure storage for uploaded files
const storage = multer_1.default.diskStorage({
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
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(new Error("Only JPEG and PNG files are allowed!"), false);
    }
};
// Configure Multer with the specified storage and file filter
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // Set file size limit to 5MB (5 * 1024 * 1024 bytes)
    },
    fileFilter: fileFilter,
});
// Higher-order function to create middleware for uploading a single file with a dynamic field name
const uploadSingle = (fieldName) => {
    return (req, res, next) => {
        const singleUpload = upload.single(fieldName);
        singleUpload(req, res, (err) => {
            if (err instanceof multer_1.default.MulterError) {
                // Handle Multer errors (e.g., file size exceeded)
                return res.status(400).json({ message: err.message });
            }
            else if (err) {
                // Handle other errors (e.g., wrong file type)
                return res.status(400).json({ message: err.message });
            }
            next();
        });
    };
};
exports.uploadSingle = uploadSingle;
// Middleware for uploading multiple files with specified limits
const uploadMultiple = (fields) => {
    return (req, res, next) => {
        const uploadFields = Object.keys(fields).map((field) => ({
            name: field,
            maxCount: fields[field],
        }));
        const uploadMultiples = upload.fields(uploadFields);
        uploadMultiples(req, res, (err) => {
            if (err instanceof multer_1.default.MulterError) {
                // Handle Multer errors (e.g., file size exceeded)
                return res.status(400).json({ message: err.message });
            }
            else if (err) {
                // Handle other errors (e.g., wrong file type)
                return res.status(400).json({ message: err.message });
            }
            next();
        });
    };
};
exports.uploadMultiple = uploadMultiple;
