import { useState } from 'react';
import '../styles/Upload.css';

function Upload() {
  // Hold the selected image and scanned text
  const [image, setImage] = useState(null);
  const [scannedText, setScannedText] = useState('');
  const [loading, setLoading] = useState(false);

  // Runs when user picks a file
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Runs when user clicks the Scan button
  const handleScan = async () => {
    if (!image) {
      alert('Please select an image first');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('User not authenticated');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      setLoading(true);

      const res = await fetch('http://localhost:5000/api/scan', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert(data.message || 'Scan failed');
        return;
      }

      setScannedText(data.extractedText);
    } catch (err) {
      console.error('Scan error:', err);
      alert('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h1 className="upload-title">Upload Your Note</h1>

        <input type="file" onChange={handleFileChange} className="upload-input" />

        <button onClick={handleScan} className="upload-button">
          {loading ? 'Scanning...' : 'Scan'}
        </button>

        {scannedText && (
          <div className="result-box">
            <h3>Scanned Text:</h3>
            <p>{scannedText}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;

