import React, { useState } from "react";
// import Banner from "../components/Banner/Banner";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register/", {
        username: username,
        email: email,
        password: password,
      });

      setSuccess("Registration successful ✅ Now you can login!");
      console.log("Registered User:", response.data);

      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Registration failed ❌ Try again");
    }
  };

  return (
    <div>
      {/* <Banner title="Register Page" /> */}
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="bg-light p-5 rounded shadow text-center"
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <h1 className="fw-bold mb-5" style={{ color: "#0f3460" }}>
            Register
          </h1>

          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control py-3"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control py-3"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control py-3"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-outline-warning py-3 fw-semibold"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;


// import React from 'react'
// import Banner from "../components/Banner/Banner";

// const Registration = () => {
//     return (
//         <div>
//             <Banner title="Registration Page" />
//             <div className="container d-flex justify-content-center align-items-center min-vh-100">
//             <div className="bg-light p-5 rounded shadow text-center" style={{ maxWidth: "600px", width: "100%" }}>
//                 <h1 className="fw-bold mb-5" style={{ color: "#0f3460"}}>Registration</h1>

//                 <form>
//                 <div className="mb-3">
//                     <input
//                     type="text"
//                     className="form-control py-3"
//                     placeholder="Your Username"
//                     required
//                     />
//                 </div>

//                 <div className="mb-3">
//                     <input
//                     type="email"
//                     className="form-control py-3"
//                     placeholder="Your Email"
//                     required
//                     />
//                 </div>

//                 <div className="mb-3">
//                     <input
//                     type="password"
//                     className="form-control py-3"
//                     placeholder="Your Password"
//                     required
//                     />
//                 </div>

//                 <div className="d-grid">
//                     <button type="submit" className="btn btn-outline-warning py-3 fw-semibold">
//                     Login
//                     </button>
//                 </div>
//                 </form>
//             </div>
//             </div> 
//         </div>
//     )
// }

// export default Registration
