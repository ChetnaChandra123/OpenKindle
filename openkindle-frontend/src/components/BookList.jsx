import React, { useEffect, useState } from "react";
import { fetchBooks } from "../api/api";
import BookCard from "./BookCard";

export default function BookList() {
  const [booksByGenre, setBooksByGenre] = useState({});

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchBooks();
        const books = res.data || [];
        // group by genre
        const grouped = books.reduce((acc, b) => {
          const g = b.genre || "Uncategorized";
          acc[g] = acc[g] || [];
          // dedupe by id (avoid showing same book multiple times)
          if (!acc[g].some(x => x.id === b.id)) acc[g].push(b);
          return acc;
        }, {});
        setBooksByGenre(grouped);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  return (
    <div>
      {Object.keys(booksByGenre).map((genre) => (
        <section key={genre} className="mb-4">
          <h4 className="mb-3">{genre}</h4>
          <div className="row">
            {booksByGenre[genre].map(book => (
              <div key={book.id} className="col-md-4 mb-3">
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
