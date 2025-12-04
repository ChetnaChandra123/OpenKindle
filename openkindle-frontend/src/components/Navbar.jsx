import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          📚 OpenKindle
        </Link>
        <div>
          <Link className="btn btn-outline-primary me-2" to="/">
            Home
          </Link>
          <Link className="btn btn-outline-secondary" to="/activities">
            Activity
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
