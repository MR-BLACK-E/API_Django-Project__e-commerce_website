import React from 'react'
import Banner from "../components/Banner/Banner";
import axios from "axios";

const Login = () => {
    return (
        <div>
            <Banner title="Login Page" />
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="bg-light p-5 rounded shadow text-center" style={{ maxWidth: "600px", width: "100%" }}>
                <h1 className="fw-bold mb-5" style={{ color: "#0f3460"}}>Login</h1>

                <form>
                <div className="mb-3">
                    <input
                    type="text"
                    className="form-control py-3"
                    placeholder="Your Username"
                    required
                    />
                </div>

                <div className="mb-3">
                    <input
                    type="password"
                    className="form-control py-3"
                    placeholder="Your Password"
                    required
                    />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-outline-warning py-3 fw-semibold">
                    Login
                    </button>
                </div>
                </form>
            </div>
            </div>

        </div>
    )
}

export default Login
