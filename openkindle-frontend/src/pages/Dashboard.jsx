// // src/pages/Dashboard.jsx
// import React, { useEffect, useState } from "react";
// import { fetchActivities } from "../api/api";
// import ActivityList from "../components/ActivityList";

// const Dashboard = () => {
//   const [activities, setActivities] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function load() {
//       try {
//         const { data } = await fetchActivities();
//         setActivities(data);
//       } catch (err) {
//         console.error("Error fetching activities:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     load();
//   }, []);

//   if (loading) return <p>Loading activities...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
//       <ActivityList activities={activities} />
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  const handlePurchase = async (bookId) => {
    try {
      const res = await axios.post("http://localhost:5000/api/purchase", {
        userId: 1,
        bookId,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error purchasing book");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">📘 Available Books</h3>

      {message && (
        <div className="alert alert-info text-center" role="alert">
          {message}
        </div>
      )}

      <div className="row">
        {books.map((book) => (
          <div key={book.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text text-muted">{book.author}</p>
                <button
                  className="btn btn-primary w-100"
                  onClick={() => handlePurchase(book.id)}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
