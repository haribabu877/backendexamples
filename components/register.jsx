import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    organization: "",
    email: "",
    mobilenumber: "",
    totalEmployees: "", // ✅ corrected name
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      setMsg(res.data.message || "Registered successfully!");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error during registration");
    }
  };

  return (
    <div style={{ width: "300px", margin: "auto", textAlign: "center" }}>
      <h3>Register</h3>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        style={{ display: "block", margin: "10px auto", width: "100%", padding: "8px" }}
      />

      <input
        type="text"
        name="organization"
        placeholder="Organization Name"
        value={formData.organization}
        onChange={handleChange}
        style={{ display: "block", margin: "10px auto", width: "100%", padding: "8px" }}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        style={{ display: "block", margin: "10px auto", width: "100%", padding: "8px" }}
      />

      <input
        type="text"
        name="mobilenumber"
        placeholder="Mobile Number"
        value={formData.mobilenumber}
        onChange={handleChange}
        style={{ display: "block", margin: "10px auto", width: "100%", padding: "8px" }}
      />

      {/* ✅ Fixed Dropdown */}
      <select
        name="totalEmployees"
        value={formData.totalEmployees}
        onChange={handleChange}
        style={{ display: "block", margin: "10px auto", width: "100%", padding: "8px" }}
      >
        <option value="">Select Total no of employees</option>
        <option value="1 to 10">1 to 10</option>
        <option value="11 to 50">11 to 50</option>
        <option value="51 to 200">51 to 200</option>
        <option value="201 to 500">201 to 500</option>
        <option value="501 to 1000">501 to 1000</option>
        <option value="1001 to 5000">1001 to 5000</option>
        <option value="5001 to 10000">5001 to 10000</option>
        <option value="10000+">10000+</option>
      </select>

      <button
        onClick={handleRegister}
        style={{
          background: "skyblue",
          border: "none",
          padding: "10px 20px",
          marginTop: "10px",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Submit
      </button>

      <p>{msg}</p>
    </div>
  );
}
