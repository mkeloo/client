import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get('http://localhost:3000/books');
        setBooks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(books);
  return (
    <div>
      <h1>LocalHost Book Store</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt={book.title} />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            <Link to={`/update/${book.id}`}>
              <button className="update">Update</button>
            </Link>
          </div>
        ))}
      </div>

      <Link to="/add">
        <button>Add New Book</button>
      </Link>
    </div>
  );
};

export default Books;
