
import { useEffect, useState } from "react";

// This page shows a user's previously scanned notes
function History() {
  const [scans, setScans] = useState([]); // All scan results
  const [loading, setLoading] = useState(true); // Shows loading spinner
  const [error, setError] = useState(null); // For error messages

  // This runs when the page first loads
  useEffect(() => {
    const fetchScans = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/scan", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        setScans(data.scans); // Save scan list to state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Whether it fails or succeeds, stop the loading spinner
      }
    };

    fetchScans();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#0f0f0f" }}>📚 Scan History</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      {!loading && scans.length === 0 && <p>No scans found yet.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {scans.map((scan, index) => (
          <li
            key={index}
            style={{
              background: "#f4f4f4",
              marginBottom: "1rem",
              padding: "1rem",
              borderRadius: "6px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <p><strong>📝 Scan {index + 1}:</strong></p>
            <p style={{ whiteSpace: "pre-wrap" }}>{scan.extractedText}</p>
            <p style={{ fontSize: "0.8rem", color: "#555" }}>
              📅 {new Date(scan.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
