// import React from "react";
// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
//       <div className="container">
//         <Link className="navbar-brand fw-bold text-primary" to="/">
//           📚 OpenKindle
//         </Link>
//         <div>
//           <Link className="btn btn-outline-primary me-2" to="/">
//             Home
//           </Link>
//           <Link className="btn btn-outline-secondary" to="/activities">
//             Activity
//           </Link>
//           <Link to="/my-books">My Books</Link>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">
        OpenKindle
      </Link>

      <div className="navbar-nav">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/my-books">My Books</Link>
        <Link className="nav-link" to="/activities">Activities</Link>
      </div>
    </nav>
  );
}
