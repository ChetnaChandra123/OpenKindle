import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Dashboard from "./pages/Dashboard";
import MyBooks from "./pages/MyBooks";
import ActivityList from "./components/ActivityList";
import ProtectedRoute from "./components/protectedRoute";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      {/* Navbar is visible on every page */}
      <Navbar />

      <div className="container mt-4">
        <h2>📚 OpenKindle Dashboard</h2>

        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route
            path="/my-books"
            element={
              <ProtectedRoute>
                <MyBooks />
              </ProtectedRoute>
            }
          />

          <Route path="/activities" element={<ActivityList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
