import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Banner from "../components/Banner/Banner";

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

      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // alert("Login successful!");
        navigate("/user");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <div >
      {/* <Banner title="Login Page" /> */}
      <div className="container-fluid py-5 " style={{maxWidth:"1000px",minHeight:"600px"}}>
      <div className="container py-5">
      <div className="row">
      <div className="bg-light p-3 rounded  col-lg-5 d-flex justify-content-center align-items-start" style={{background:"",}}>
        <div className="text-left mb-4">
        <h1 className="fw-bold mb-4 mt-3 text-center " style={{ color: "#0f3460" }}>
            Login
          </h1>
          <h5>Get access to your Orders, Wishlist and Recommendations</h5>
          <div className="mt-3">Don't have account?
             <a href="/registration" className="text-decoration-none">
                Create Account
             </a>
             </div>
          </div>
               
      </div>
      {/* <div className="col-lg-7"> */}
      <div className="col-lg-7 container d-flex justify-content-center align-items-center min-vh-10">
        <div className="" style={{ maxWidth: "600px", width: "100%" }}>
          {/* <h1 className="fw-bold mb-5" style={{ color: "#0f3460" }}>
            Login
          </h1> */}

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
              <button type="submit" className="btn btn-outline-warning py-3 fw-semibold">
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

      {/* </div> */}
      </div>
      </div>
    </div>
  );
};

export default Login;


// import React, { useState } from "react";
// import Banner from "../components/Banner/Banner";
// import axios from "axios";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(""); 

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/login/", {
//         username,
//         password,
//       });

//       localStorage.setItem("user", JSON.stringify(response.data));

//       alert("Login successful!");
//       console.log("Response:", response.data);

//       window.location.href = "/";
//     } catch (err) {
//       console.error(err);
//       setError("Invalid username or password");
//     }
//   };

//   return (
//     <div>
//       <Banner title="Login Page" />
//       <div className="container d-flex justify-content-center align-items-center min-vh-100">
//         <div
//           className="bg-light p-5 rounded shadow text-center"
//           style={{ maxWidth: "600px", width: "100%" }}
//         >
//           <h1 className="fw-bold mb-5" style={{ color: "#0f3460" }}>
//             Login
//           </h1>

//           <form onSubmit={handleLogin}>
//             <div className="mb-3">
//               <input
//                 type="text"
//                 className="form-control py-3"
//                 placeholder="Your Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <input
//                 type="password"
//                 className="form-control py-3"
//                 placeholder="Your Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             {error && <p className="text-danger">{error}</p>}

//             <div className="d-grid">
//               <button
//                 type="submit"
//                 className="btn btn-outline-warning py-3 fw-semibold"
//               >
//                 Login
//               </button>
//             </div>
//             <div className="mt-3">
//             <a href="/forgotpassword" className="text-decoration-none">
//                 Forgot Password?
//             </a>
//             </div>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

