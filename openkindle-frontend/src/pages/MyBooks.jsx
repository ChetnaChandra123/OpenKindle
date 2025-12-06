import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/books/my-books",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBooks(res.data);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    load();
  }, []);

  if (!books.length) return <p>You have no purchased books.</p>;

  return (
    <div>
      <h2 className="mb-4">📘 My Books</h2>

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
                <p className="small text-muted">{book.author}</p>

                <button className="btn btn-success btn-sm w-100">
                  Read
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
