import React, { useState } from "react";
import { uploadDocument } from "./api";
import DocumentList from "./DocumentList";

export default function App() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

const handleUpload = async () => {
  if (!file) {
    setMsg("Please select a PDF file");
    return;
  }

  if (file.type !== "application/pdf") {
    setMsg("Only PDF files allowed");
    return;
  }

  try {
    const res = await uploadDocument(file);
    setMsg(res.message || "Uploaded successfully");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    setMsg("Upload failed. Please try again.");
  }
};


  return (
    <div className="app-container">
      <div className="card">
        {/* Title */}
        <h1>Patient Document Portal</h1>

        {/* Subtitle / Branding */}
        <p className="subtitle">
          Developed by <strong>Ritik Kumar</strong> · <span>IN18 Labs</span>
        </p>

        {/* Upload Section */}
        <div className="upload-box">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button className="upload" onClick={handleUpload}>
            Upload
          </button>
        </div>

        {/* Message */}
        {msg && <div className="message">{msg}</div>}

        <hr />

        {/* Document List */}
        <DocumentList />

        {/* Footer */}
        <div className="footer">
          © {new Date().getFullYear()} <strong>IN18 Labs</strong> · Built by{" "}
          <span>Ritik Kumar</span>
        </div>
      </div>
    </div>
  );
}
