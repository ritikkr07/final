import React, { useEffect, useState } from "react";
import {
  fetchDocuments,
  deleteDocument,
  downloadDocument,
} from "./api";

export default function DocumentList() {
  const [docs, setDocs] = useState([]);

  const loadDocs = async () => {
    const data = await fetchDocuments();
    setDocs(data);
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="list">
      <h2>Uploaded Documents</h2>

      {docs.length === 0 && (
        <div className="empty">No documents uploaded yet</div>
      )}

      <ul>
        {docs.map((doc) => (
          <li key={doc.id} className="doc-card">
            <div className="doc-info">
              <div className="doc-name">{doc.filename}</div>

              <div className="doc-meta">
                <span>Uploaded on: {formatDate(doc.created_at)}</span>
                <span className="badge">Patient</span>
              </div>
            </div>

            <div className="actions">
              <button
                className="download"
                onClick={() => downloadDocument(doc.id)}
              >
                Download
              </button>
              <button
                className="delete"
                onClick={async () => {
                  await deleteDocument(doc.id);
                  loadDocs();
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
