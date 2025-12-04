import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ActivityList from "./components/ActivityList";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h2>📚 OpenKindle Dashboard</h2>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/activities" element={<ActivityList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
