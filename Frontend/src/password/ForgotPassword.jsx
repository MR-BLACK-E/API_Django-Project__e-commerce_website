import React, { useState } from "react";
import axios from "axios";
import Banner from "../components/Banner/Banner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/forget/", {
        email: email,
      });

      setMessage(response.data.message || "Password reset link sent!");
    } catch (err) {
      setError(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div>
      {/* <Banner title="Forgot Password" /> */}
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="bg-light p-5 rounded shadow text-center"
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <h1 className="fw-bold mb-4" style={{ color: "#0f3460" }}>
            Forgot Password
          </h1>
          <p className="mb-4 text-muted">
            Enter your registered email, and we’ll send you a password reset link.
          </p>

          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control py-3"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-outline-primary py-3 fw-semibold"
              >
                Send Reset Link
              </button>
            </div>
          </form>

          <div className="mt-4">
            <a href="/resetpassword" className="text-decoration-none">
              Reset Password
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
