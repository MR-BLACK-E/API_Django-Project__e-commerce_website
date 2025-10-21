import React, { useState } from "react";
import axios from "axios";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });

      // Save access + refresh tokens with the same keys as ProtectedRoute
      localStorage.setItem("adminToken", res.data.access);
      localStorage.setItem("adminRefreshToken", res.data.refresh);

      alert("Login successful!");
      window.location.href = "*"; // ✅ HashRouter fix
    } catch (err) {
      console.error("Login failed", err);
      // alert("Invalid credentials");
      alert("Only Admin can Login");
    }
  };

  return (
    <div style={{paddingTop:"100px"}} className="container d-flex justify-content-center align-items-center min-vh-10 mt-5">
      <div
        className="bg-light p-5 rounded shadow text-center"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h2 className="fw-bold mb-4" style={{ color: "#0f3460" }}>
          Admin Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control py-3"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control py-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 py-3">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;


// import React, { useState } from "react";
// import axios from "axios";

// const AdminLogin = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://127.0.0.1:8000/api/token/", {
//         username,
//         password,
//       });

//       // Save access + refresh tokens
//       localStorage.setItem("adminToken", res.data.access);
//       localStorage.setItem("adminRefreshToken", res.data.refresh);

//       alert("Login successful!");
//       window.location.href = "/admin/dashboard"; // redirect after login
//     } catch (err) {
//       console.error("Login failed", err);
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center min-vh-10 mt-5">
//       <div className="bg-light p-5 rounded shadow text-center" style={{ maxWidth: "500px", width: "100%" }}>
//         <h2 className="fw-bold mb-4" style={{ color: "#0f3460" }}>Admin Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control py-3"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="password"
//               className="form-control py-3"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="btn btn-primary w-100 py-3">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;

