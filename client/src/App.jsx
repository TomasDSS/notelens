// Import React and routing tools
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all the pages
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload';
import History from './pages/History'; // ✅ NEW: History page import

function App() {
  return (
    <Router>
      <Routes>
        {/* Home/Login page */}
        <Route path="/" element={<Login />} />

        {/* Register page */}
        <Route path="/register" element={<Register />} />

        {/* Upload page */}
        <Route path="/upload" element={<Upload />} />

        {/* ✅ History page */}
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
