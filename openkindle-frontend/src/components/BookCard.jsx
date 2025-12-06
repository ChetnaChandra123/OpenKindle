// src/components/BookCard.jsx
import React from "react";
import API from "../api/api"; // your axios instance

export default function BookCard({ book }) {
  const handleBuy = async () => {
    try {
      // POST /api/purchases - uses interceptor to add token
      await API.post("/purchases", { bookId: book.id });
      alert("Purchase successful!");
      // optionally refresh UI / activities
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || err.response?.data?.error || "Error purchasing book";
      alert(msg);
    }
  };

  return (
    <div className="card h-100">
      {book.coverUrl ? (
        <img src={book.coverUrl} alt={book.title} className="card-img-top" style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "10px" }} />
      ) : (
        <div style={{ height: 180 }} className="bg-light d-flex align-items-center justify-content-center">No Cover</div>
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text text-muted mb-2">{book.author}</p>
        <p className="mb-3"><strong>₹{book.price}</strong></p>
        <div className="mt-auto">
          <button className="btn btn-primary w-100" onClick={handleBuy}>Buy</button>
        </div>
      </div>
    </div>
  );
}
