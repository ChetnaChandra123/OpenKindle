// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
// import ActivityList from "./pages/ActivityList";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// function App() {
//   const [books, setBooks] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/books")
//       .then((res) => setBooks(res.data))
//       .catch((err) => console.error("Error fetching books:", err));
//   }, []);

//   const handlePurchase = async (bookId) => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/purchase", {
//         userId: 1, // replace with logged-in user ID later
//         bookId,
//       });
//       setMessage(res.data.message);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error purchasing book");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">📚 OpenKindle Dashboard</h2>

//       {message && (
//         <div className="alert alert-info text-center" role="alert">
//           {message}
//         </div>
//       )}

//       <div className="row">
//         {books.map((book) => (
//           <div key={book.id} className="col-md-4 mb-4">
//             <div className="card h-100 shadow-sm">
//               <div className="card-body">
//                 <h5 className="card-title">{book.title}</h5>
//                 <p className="card-text">{book.author}</p>
//                 <button
//                   className="btn btn-primary w-100"
//                   onClick={() => handlePurchase(book.id)}
//                 >
//                   Buy
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

// }

// export default App;

// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
