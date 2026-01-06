const db = require("../database/db");
const fs = require("fs");
const path = require("path");

/**
 * UPLOAD PDF
 */
exports.uploadDocument = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Only PDF files are allowed" });
  }

  const { originalname, path: filepath, size } = req.file;

  const query =
    "INSERT INTO documents (filename, filepath, filesize) VALUES (?, ?, ?)";

  db.execute(query, [originalname, filepath, size], (err, result) => {
    if (err) {
      console.error("Upload DB error:", err);
      return res.status(500).json({ message: "Upload failed" });
    }

    res.status(201).json({
      message: "File uploaded successfully",
      documentId: result.insertId,
    });
  });
};

/**
 * LIST ALL DOCUMENTS
 */
exports.getAllDocuments = (req, res) => {
  db.execute(
    "SELECT * FROM documents ORDER BY created_at DESC",
    (err, rows) => {
      if (err) {
        console.error("Fetch error:", err);
        return res.status(500).json({ message: "Failed to fetch documents" });
      }
      res.json(rows);
    }
  );
};

/**
 * DOWNLOAD DOCUMENT (SAFE)
 */
exports.downloadDocument = (req, res) => {
  const { id } = req.params;

  db.execute(
    "SELECT * FROM documents WHERE id = ?",
    [id],
    (err, rows) => {
      if (err || rows.length === 0) {
        return res.status(404).json({ message: "Document not found" });
      }

      const doc = rows[0];
      const filePath = path.join(__dirname, "..", doc.filepath);

      if (!fs.existsSync(filePath)) {
        return res
          .status(404)
          .json({ message: "File missing on server" });
      }

      res.download(filePath, doc.filename);
    }
  );
};

/**
 * DELETE DOCUMENT (SAFE – NO CRASH)
 */
exports.deleteDocument = (req, res) => {
  const { id } = req.params;

  db.execute(
    "SELECT * FROM documents WHERE id = ?",
    [id],
    (err, rows) => {
      if (err || rows.length === 0) {
        return res.status(404).json({ message: "Document not found" });
      }

      const doc = rows[0];
      const filePath = path.join(__dirname, "..", doc.filepath);

      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (error) {
        console.error("File delete error:", error);
      
      }

      db.execute("DELETE FROM documents WHERE id = ?", [id], () => {
        res.json({ message: "Document deleted successfully" });
      });
    }
  );
};
