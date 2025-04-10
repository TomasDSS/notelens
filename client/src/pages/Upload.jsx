import React, { useState } from "react";
import "./Form.css";

function Upload() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("❌ Please log in first");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch("https://notelens-api.onrender.com/api/scan", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setResult(data.extractedText);
        setMessage("✅ Scan successful!");
      } else {
        setMessage(data.message || "❌ Scan failed");
      }
    } catch (err) {
      console.error("Scan error:", err);
      setMessage("Server error");
    }
  };

  return (
    <div className="form-container">
      <h2>Upload Note</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
        <button type="submit">Scan Note</button>
      </form>
      {message && <p className="message">{message}</p>}
      {result && (
        <div className="result">
          <h4>Extracted Text:</h4>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default Upload;

