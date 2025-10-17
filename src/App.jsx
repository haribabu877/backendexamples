import React from "react";
import Register from "../components/register";
import Login from "../components/login";

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Employee Monitor</h2>
      <Register />
      <hr style={{ margin: "20px" }} />
      <Login />
    </div>
  );
}

export default App;
