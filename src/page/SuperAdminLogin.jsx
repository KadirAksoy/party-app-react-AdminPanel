import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SuperAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/signing",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        console.log("Token:", token);

        // Token'ı localStorage veya başka bir yerde saklayabilirsiniz
        localStorage.setItem("token", token);

        // Admin paneline yönlendirme
        navigate("/admin-panel");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Admin Paneli
        </h2>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: "10px", margin: "10px 0" }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: "10px", margin: "10px 0" }}
          />
        </label>
        <button type="submit" style={{ padding: "10px", margin: "10px 0" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default SuperAdminLogin;
