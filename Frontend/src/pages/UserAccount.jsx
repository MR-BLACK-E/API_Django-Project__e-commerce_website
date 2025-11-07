import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UserAccount = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [details, setDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    town: "",
  });

  // ✅ Fetch user details
  const fetchUserDetails = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/usermaindetails/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDetails(res.data);
      setFormData(res.data);
    } catch (err) {
      console.error("Error fetching user details:", err);
      toast.error("Failed to fetch user details");
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }
    fetchUserDetails();
    window.scrollTo(0, 0);
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Update user details
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/usermaindetails/",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Profile updated successfully!");
      setShowModal(false);
      fetchUserDetails(); // refresh data
    } catch (err) {
      console.error("Error updating user details:", err);
      toast.error("Failed to update profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    toast.info("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="container my-5 mt-5" style={{ minHeight: "600px" }}>
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <div className="list-group shadow-sm">
            <h5 className="list-group-item fw-bold text-center bg-light">
              My Account
            </h5>
            <button
              className="list-group-item list-group-item-action"
              onClick={() => setShowModal(true)}
            >
              Edit Profile
            </button>
            <button
              className="list-group-item list-group-item-action"
              onClick={() => navigate("/orders")}
            >
              My Orders
            </button>
            <button
              className="list-group-item list-group-item-action"
              onClick={() => navigate("/cart")}
            >
              My Cart
            </button>
            <button
              className="list-group-item list-group-item-action"
              onClick={() => navigate("/summery")}
            >
              Order Summary
            </button>
            <button
              className="list-group-item list-group-item-action text-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <div className="card shadow-sm p-4">
            <h4 className="fw-bold mb-3">
              Welcome, {details?.first_name || "User"} {details?.last_name || ""}
            </h4>
            <p>
              <strong>Email:</strong> {details?.email || "N/A"}
            </p>

            <hr />

            {/* ✅ User Details Section */}
            <div className="user-details-section mb-4">
              <h5 className="fw-semibold mb-3 text-secondary">Your Details</h5>
              {details ? (
                <div className="p-3 border rounded bg-light">
                  <p>
                    <strong>Name:</strong> {details.first_name}{" "}
                    {details.last_name}
                  </p>
                  <p>
                    <strong>Email:</strong> {details.email}
                  </p>
                  <p>
                    <strong>Address:</strong> {details.address}
                  </p>
                  <p>
                    <strong>Town/City:</strong> {details.town}
                  </p>
                </div>
              ) : (
                <div className="text-muted">
                  No user details found.{" "}
                  <button
                    className="btn btn-link p-0"
                    onClick={() => setShowModal(true)}
                  >
                    Add now
                  </button>
                </div>
              )}
            </div>

            <hr />

            {/* Quick Links */}
            <h5>Quick Links</h5>
            <div className="d-flex flex-wrap gap-3 mt-3">
              <button
                onClick={() => navigate("/orders")}
                className="btn btn-outline-primary"
              >
                My Orders
              </button>
              <button
                onClick={() => navigate("/cart")}
                className="btn btn-outline-warning"
              >
                My Cart
              </button>
              <button
                onClick={() => navigate("/checkout")}
                className="btn btn-outline-success"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Edit Profile Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            background: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleUpdate}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name || ""}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name || ""}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address || ""}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Town/City</label>
                    <input
                      type="text"
                      name="town"
                      value={formData.town || ""}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAccount;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const UserAccount = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("accessToken");
//   const [details, setDetails] = useState(null);

//   // ✅ Fetch user details from backend
//   const fetchUserDetails = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/api/usermaindetails/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // ✅ Backend returns a single object, not an array
//       setDetails(res.data);
//     } catch (err) {
//       console.error("Error fetching user details:", err);
//       toast.error("Failed to fetch user details");
//     }
//   };

//   useEffect(() => {
//     if (!token) {
//       toast.error("Please login first!");
//       navigate("/login");
//       return;
//     }
//     fetchUserDetails();
//     window.scrollTo(0, 0);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("accessToken");
//     toast.info("Logged out successfully");
//     navigate("/login");
//   };

//   return (
//     <div className="container my-5 mt-5" style={{ minHeight: "600px" }}>
//       <div className="row">
//         {/* Sidebar */}
//         <div className="col-md-3">
//           <div className="list-group shadow-sm">
//             <h5 className="list-group-item fw-bold text-center bg-light">
//               My Account
//             </h5>
//             <button
//               className="list-group-item list-group-item-action"
//               onClick={() => navigate("/userdetails")}
//             >
//               Add / Edit Details
//             </button>
//             <button
//               className="list-group-item list-group-item-action"
//               onClick={() => navigate("/orders")}
//             >
//               My Orders
//             </button>
//             <button
//               className="list-group-item list-group-item-action"
//               onClick={() => navigate("/cart")}
//             >
//               My Cart
//             </button>
//             <button
//               className="list-group-item list-group-item-action"
//               onClick={() => navigate("/summery")}
//             >
//               Order Summary
//             </button>
//             <button
//               className="list-group-item list-group-item-action text-danger"
//               onClick={handleLogout}
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="col-md-9">
//           <div className="card shadow-sm p-4">
//             <h4 className="fw-bold mb-3">
//               Welcome, {details?.first_name || "User"} {details?.last_name || ""}
//             </h4>
//             <p>
//               <strong>Email:</strong> {details?.email || "N/A"}
//             </p>

//             <hr />

//             {/* ✅ User Details Section */}
//             <div className="user-details-section mb-4">
//               <h5 className="fw-semibold mb-3 text-secondary">Your Details</h5>
//               {details ? (
//                 <div className="p-3 border rounded bg-light">
//                   <p>
//                     <strong>Name:</strong> {details.first_name}{" "}
//                     {details.last_name}
//                   </p>
//                   <p>
//                     <strong>Email:</strong> {details.email}
//                   </p>
//                   <p>
//                     <strong>Address:</strong> {details.address}
//                   </p>
//                   <p>
//                     <strong>Town/City:</strong> {details.town}
//                   </p>
//                 </div>
//               ) : (
//                 <div className="text-muted">
//                   No user details found.{" "}
//                   <button
//                     className="btn btn-link p-0"
//                     onClick={() => navigate("/userdetails")}
//                   >
//                     Add now
//                   </button>
//                 </div>
//               )}
//             </div>

//             <hr />

//             {/* Quick Links */}
//             <h5>Quick Links</h5>
//             <div className="d-flex flex-wrap gap-3 mt-3">
//               <button
//                 onClick={() => navigate("/orders")}
//                 className="btn btn-outline-primary"
//               >
//                 My Orders
//               </button>
//               <button
//                 onClick={() => navigate("/cart")}
//                 className="btn btn-outline-warning"
//               >
//                 My Cart
//               </button>
//               <button
//                 onClick={() => navigate("/checkout")}
//                 className="btn btn-outline-success"
//               >
//                 Checkout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserAccount;

