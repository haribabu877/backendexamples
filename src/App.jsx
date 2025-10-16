import React from "react";
import Register from "../components/register";
import Login from "../components/login";

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>React + Node + MySQL Auth</h2>
      <Register />
      <hr style={{ margin: "30px" }} />
      <Login />
    </div>
  );
}

export default App;
