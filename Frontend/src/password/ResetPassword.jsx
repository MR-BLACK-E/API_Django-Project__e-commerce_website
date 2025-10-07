import React, { useState } from "react";
import axios from "axios";
import Banner from "../components/Banner/Banner";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    new_password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/reset/",
        formData
      );

      setMessage(response.data.message || "Password reset successful!");
    } catch (err) {
      setError(
        err.response?.data?.error || "Invalid details. Please try again."
      );
    }
  };

  return (
    <div>
      {/* <Banner title="Reset Password" /> */}
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="bg-light p-5 rounded shadow text-center"
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <h1 className="fw-bold mb-4" style={{ color: "#0f3460" }}>
            Reset Password
          </h1>

          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control py-3"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="otp"
                className="form-control py-3"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="new_password"
                className="form-control py-3"
                placeholder="New Password"
                value={formData.new_password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-outline-success py-3 fw-semibold"
              >
                Reset Password
              </button>
            </div>
          </form>

          <div className="mt-4">
            <a href="/login" className="text-decoration-none">
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
