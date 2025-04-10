import React, { useEffect, useState } from "react";

function History() {
  const [scans, setScans] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchScans = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("❌ Please log in first");
        return;
      }

      try {
        const res = await fetch("https://notelens-api.onrender.com/api/scans", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setScans(data);
        } else {
          setMessage(data.message || "❌ Could not fetch history");
        }
      } catch (err) {
        console.error("History error:", err);
        setMessage("Server error");
      }
    };

    fetchScans();
  }, []);

  return (
    <div className="form-container">
      <h2>📚 Scan History</h2>
      {message && <p className="message">{message}</p>}
      {scans.length === 0 ? (
        <p>No scans found yet.</p>
      ) : (
        <ul>
          {scans.map((scan) => (
            <li key={scan._id}>
              <strong>{scan.createdAt.slice(0, 10)}:</strong> {scan.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;
