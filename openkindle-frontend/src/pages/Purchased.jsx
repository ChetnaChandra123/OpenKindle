// src/pages/PurchasedBooks.jsx
import React, { useEffect, useState } from "react";
import API, { fetchActivities } from "../api/api";

export default function PurchasedBooks() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await API.get("/purchases"); // returns array of purchases with included Book
        setPurchases(res.data);
      } catch (err) {
        console.error(err);
        alert("Unable to load purchases. Make sure you are logged in");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p>Loading your library...</p>;
  if (!purchases.length) return <p>No purchased books yet.</p>;

  return (
    <div className="container mt-4">
      <h2>Your Library</h2>
      <div className="row">
        {purchases.map((p) => (
          <div key={p.id} className="col-md-3 mb-3">
            <div className="card">
              {p.Book?.coverUrl ? (
                <img src={p.Book.coverUrl} alt={p.Book.title} className="card-img-top" style={{ height: 180, objectFit: 'cover' }} />
              ) : <div style={{ height: 180 }} className="bg-light d-flex align-items-center justify-content-center">No Cover</div>}
              <div className="card-body">
                <h5 className="card-title">{p.Book?.title}</h5>
                <p className="card-text text-muted">{p.Book?.author}</p>

                {/* Read action: open an external link (example) or route to a reader */}
                <a href={p.Book?.fileUrl || "#"} className="btn btn-outline-primary">
                  Read
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
