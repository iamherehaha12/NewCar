import React, { useState } from 'react';
import axios from 'axios';

const OwnerRegister = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    companyName: '',
    contact: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9000/register', formData);
      alert('Owner registered successfully!');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register as Owner</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            name="userName"
            placeholder="Your Name"
            onChange={handleChange}
          />
        </div>
        {/* Add other fields here */}
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default OwnerRegister;