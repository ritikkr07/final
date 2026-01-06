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

    const res = await uploadDocument(file);
    setMsg(res.message || "Uploaded successfully");
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1>Patient Document Portal</h1>

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

        {msg && <div className="message">{msg}</div>}

        <hr />

        <DocumentList />
      </div>
    </div>
  );
}
