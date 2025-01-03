import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomerRegister = () => {
  const [formData, setFormData] = useState({
    name: "", // Changed from userName to name
    email: "",
    password: "",
    address: "",
    adharNumber: "",
    drivingLicenseNo: "",
    contact: "",
    cityId: "",
    role: { roleId: 2, roleName: "Customer" },
    customer: {
      city: {},
      address: "",
      adharNumber: "",
      drivingLicenseNo: "",
      contact: "",
    },
  });

  const [cities, setCities] = useState([]); // State for storing cities
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message

  useEffect(() => {
    // Fetch cities from the server when the component mounts
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://localhost:8080/cities"); // Assuming this is the endpoint for cities
        setCities(response.data); // Store cities in state
      } catch (error) {
        console.error("Failed to fetch cities", error);
        setErrorMessage("Failed to fetch cities. Please try again later.");
      }
    };

    fetchCities();
  }, []); // Empty dependency array to run this only once on mount

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cityId") {
      const selectedCity = cities.find(
        (city) => city.cityId === parseInt(value)
      );
      setFormData({
        ...formData,
        cityId: value,
        customer: { ...formData.customer, city: selectedCity || {} },
      });
    } else if (name in formData.customer) {
      setFormData({
        ...formData,
        customer: { ...formData.customer, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for required fields
    if (
      !formData.name || // Updated from userName to name
      !formData.email ||
      !formData.password ||
      !formData.cityId ||
      !formData.customer.address ||
      !formData.customer.adharNumber ||
      !formData.customer.drivingLicenseNo ||
      !formData.customer.contact
    ) {
      setErrorMessage("All fields are required.");
      return;
    }    

    try {
      setLoading(true); // Indicate loading state

      // Send POST request to the REST API
      const response = await axios.post(
        "http://localhost:8080/register",
        formData
      );

      alert("Customer registered successfully!");

      // Clear the form after successful submission
      setFormData({
        userName: "",
        email: "",
        password: "",
        cityId: "",
        role: { roleId: 2, roleName: "Customer" },
        customer: {
          city: {},
          address: "",
          adharNumber: "",
          drivingLicenseNo: "",
          contact: "",
        },
      });

      setLoading(false); // End loading state
    } catch (error) {
      console.error("Registration failed", error);

      // Handle error message based on the API response or fallback
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Registration failed, please try again.");
      }

      setLoading(false); // End loading state
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-md-6 shadow">
        <h2 className="text-center mb-4">Register as Customer</h2>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit} className="p-4 shadow-lg rounded bg-light">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Your Name"
              value={formData.name}
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
              name="email"
              placeholder="Your Email"
              value={formData.email}
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
              name="password"
              placeholder="Your Password"
              value={formData.password}
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
              value={formData.customer.address}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="adharNumber" className="form-label">
              Aadhar Number
            </label>
            <input
              type="text"
              className="form-control"
              id="adharNumber"
              name="adharNumber"
              placeholder="Aadhar Number"
              value={formData.customer.adharNumber}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="drivingLicenseNo" className="form-label">
              Driving License No.
            </label>
            <input
              type="text"
              className="form-control"
              id="drivingLicenseNo"
              name="drivingLicenseNo"
              placeholder="Driving License No."
              value={formData.customer.drivingLicenseNo}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="contact" className="form-label">
              Contact Number
            </label>
            <input
              type="text"
              className="form-control"
              id="contact"
              name="contact"
              placeholder="Your Contact Number"
              value={formData.customer.contact}
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
                <option key={city.cityId} value={city.cityId}>
                  {city.cityName}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
            style={{ transition: "background-color 0.5s" }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerRegister;
