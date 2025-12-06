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
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/purchase",
        { bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error purchasing book");
    }
  };

  return (
    <div>
      <h3 className="text-center mb-4">📘 Available Books</h3>

      {message && <div className="alert alert-info text-center">{message}</div>}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-6 g-3">
        {books.map((book) => (
          <div key={book.id} className="col">
            <div className="card h-100 shadow-sm">

              {book.coverUrl && (
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="card-img-top"
                  style={{
                    height: "180px",
                    objectFit: "contain",
                    padding: "10px",
                    background: "#fff"
                  }}
                />
              )}

              <div className="card-body text-center">
                <h6 className="card-title">{book.title}</h6>
                <p className="text-muted small">{book.author}</p>

                <button
                  className="btn btn-primary w-100 btn-sm"
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
