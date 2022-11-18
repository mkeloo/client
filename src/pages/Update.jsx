import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Update = () => {
  const [book, setBook] = useState({
    title: '',
    desc: '',
    price: null,
    cover: '',
  });
  const navigate = useNavigate();
  const location = useLocation();

  const bookId = location.pathname.split('/')[2];

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:3000/books/' + bookId, book);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form">
      <h1>Update Book</h1>
      <input
        type="text"
        placeholder="Title"
        onChange={handleChange}
        name="title"
      />
      <textarea
        type="text"
        placeholder="Description"
        onChange={handleChange}
        name="description"
        rows="4"
        cols="50"
      />
      <input
        type="number"
        placeholder="Price"
        onChange={handleChange}
        name="price"
      />
      <input
        type="text"
        placeholder="Cover"
        onChange={handleChange}
        name="cover"
      />
      <button className="update" onClick={handleClick}>
        Update Book
      </button>
    </div>
  );
};

export default Update;
