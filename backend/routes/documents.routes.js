const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  uploadDocument,
  getAllDocuments,
  downloadDocument,
  deleteDocument,
} = require("../controllers/documents.controller");

// Multer config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);        // .pdf
    const baseName = path.basename(file.originalname, ext); // file name only
    const timestamp = Date.now();

    const newFileName = `${baseName}_${timestamp}${ext}`;
    cb(null, newFileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

// Routes
router.post("/upload", upload.single("file"), uploadDocument);
router.get("/", getAllDocuments);
router.get("/:id", downloadDocument);
router.delete("/:id", deleteDocument);

module.exports = router;
