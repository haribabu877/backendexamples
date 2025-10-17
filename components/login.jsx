import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [FullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setFullName(e.target.value)}
      />
      <br />
      <input
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
      <p>{msg}</p>
    </div>
  );
}
