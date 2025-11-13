import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const [details, setDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    town: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  // ✅ Fetch existing user details if available
  const fetchUserDetails = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/usermaindetails/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.length > 0) {
        setDetails(res.data[0]); // Load first (or latest) detail
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
    }
  };

  // ✅ Handle form field changes
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  // ✅ Submit user details to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !details.first_name ||
      !details.last_name ||
      !details.email ||
      !details.address ||
      !details.town
    ) {
      toast.error("Please fill in all fields!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/usermaindetails/",
        details,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("✅ Details saved successfully!");
      navigate("/user"); // You can redirect wherever needed
    } catch (err) {
      console.error("Error saving user details:", err);
      toast.error("Failed to save details. Try again.");
    } finally {
      setLoading(false);
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

  return (
    <div className="container my-5">
      <h2 className="fw-semibold mb-4 mt-5" style={{ color: "#45595b" }}>
        User Details
      </h2>

      <div className="row">
        <div className="col-lg-7 mb-4" style={{ color: "#45595b" }}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">
                First Name <sup className="text-danger">*</sup>
              </label>
              <input
                type="text"
                name="first_name"
                value={details.first_name}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Last Name <sup className="text-danger">*</sup>
              </label>
              <input
                type="text"
                name="last_name"
                value={details.last_name}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Email Address <sup className="text-danger">*</sup>
              </label>
              <input
                type="email"
                name="email"
                value={details.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Address <sup className="text-danger">*</sup>
              </label>
              <input
                type="text"
                name="address"
                value={details.address}
                onChange={handleChange}
                className="form-control"
                placeholder="House Number, Street Name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Town/City <sup className="text-danger">*</sup>
              </label>
              <input
                type="text"
                name="town"
                value={details.town}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Saving..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
