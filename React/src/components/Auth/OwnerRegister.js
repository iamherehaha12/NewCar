import React, { useState, useEffect } from "react";
import axios from "axios";

const OwnerRegister = () => {
  const [formData, setFormData] = useState({
    user: {
      userName: "",
      email: "",
      password: "",
    },
    companyName: "",
    contact: "",
    address: "",
    cityId: "", // City selection
    gstNo: "",
  });

  const [cities, setCities] = useState([]); // State for cities

  useEffect(() => {
    // Fetch cities from your API
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://localhost:8080/cities"); // Update with correct endpoint for fetching cities
        setCities(response.data); // Assuming the response is an array of cities
      } catch (error) {
        console.error("Error fetching cities", error);
      }
    };

    fetchCities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("user.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        user: {
          ...formData.user,
          [field]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/car-rental-agencies/registerAgency",
        formData
      );
      alert("Owner registered successfully!");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-md-6" >
        <h2 className="text-center mb-4">Register as Owner</h2>
        <form onSubmit={handleSubmit} className="p-4 shadow-lg rounded bg-light">
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="userName"
              name="user.userName"
              placeholder="Your Name"
              value={formData.user.userName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="user.email"
              placeholder="Your Email"
              value={formData.user.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="user.password"
              placeholder="Your Password"
              value={formData.user.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="companyName" className="form-label">
              Company Name
            </label>
            <input
              type="text"
              className="form-control"
              id="companyName"
              name="companyName"
              placeholder="Your Company Name"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cityId" className="form-label">
              City
            </label>
            <select
              className="form-control"
              id="cityId"
              name="cityId"
              value={formData.cityId}
              onChange={handleChange}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="contact" className="form-label">
              Contact
            </label>
            <input
              type="text"
              className="form-control"
              id="contact"
              name="contact"
              placeholder="Your Contact Number"
              value={formData.contact}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              placeholder="Your Address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="gstNo" className="form-label">
              GST Number
            </label>
            <input
              type="text"
              className="form-control"
              id="gstNo"
              name="gstNo"
              placeholder="Your GST Number"
              value={formData.gstNo}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" style={{ transition: "background-color 0.5s ease" }}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default OwnerRegister;
