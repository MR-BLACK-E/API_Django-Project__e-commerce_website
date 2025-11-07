import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password,
      });

      const { access, refresh, user } = res.data;

      if (access && refresh) {
        // ✅ Store tokens
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem("user", JSON.stringify(user));

        // ✅ Set axios default header for all requests
        // axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

        toast.success(`Welcome, ${user?.username || "User"}!`);
        navigate("/user"); // or navigate("/user");
      } else {
        toast.error("Invalid response from server. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      toast.error(
        err.response?.data?.detail || "Invalid username or password!"
      );
    }
  };

  return (
    <div className="container-fluid py-5" style={{ maxWidth: "1000px", minHeight: "600px" }}>
      <div className="container py-5">
        <div className="row">
          {/* Left Section */}
          <div className="bg-light p-3 rounded col-lg-5 d-flex justify-content-center align-items-start">
            <div className="text-left mb-4">
              <h1 className="fw-bold mb-4 mt-3 text-center" style={{ color: "#0f3460" }}>
                Login
              </h1>
              <h5>Access your Orders, Wishlist, and Recommendations</h5>
              <div className="mt-3">
                Don't have an account?
                <a href="/registration" className="text-decoration-none ms-1">
                  Create Account
                </a>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-lg-7 container d-flex justify-content-center align-items-center">
            <div style={{ maxWidth: "600px", width: "100%" }}>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control py-3"
                    placeholder="Your Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control py-3"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-outline-warning py-3 fw-semibold"
                  >
                    Login
                  </button>
                </div>

                <div className="mt-3">
                  <a href="/forgotpassword" className="text-decoration-none">
                    Forgot Password?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

