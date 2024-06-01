import React, { useState } from "react";
import PartiesPage from "../page/PartiesPage";
import RequestsPage from "../page/RequestsPage";
import UsersPage from "../page/UsersPage";

const AdminPanel = () => {
  const [activePage, setActivePage] = useState("parties");

  const renderPage = () => {
    switch (activePage) {
      case "parties":
        return <PartiesPage />;
      case "users":
        return <UsersPage />;
      case "requests":
        return <RequestsPage />;
      default:
        return <PartiesPage />;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          width: "220px",
          backgroundColor: "#f4f4f4",
          padding: "20px",
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
          position: "fixed",
          height: "100%",
          top: 0,
          left: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>Menü</h2>
        <ul style={{ listStyleType: "none", padding: 0, width: "100%" }}>
          <li style={{ marginBottom: "15px" }}>
            <button
              onClick={() => setActivePage("parties")}
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                textDecoration: "none",
                color: "inherit",
                border: "none",
                cursor: "pointer",
              }}
            >
              Partiler
            </button>
          </li>
          <li style={{ marginBottom: "15px" }}>
            <button
              onClick={() => setActivePage("users")}
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                textDecoration: "none",
                color: "inherit",
                border: "none",
                cursor: "pointer",
              }}
            >
              Kullanıcılar
            </button>
          </li>
          <li style={{ marginBottom: "15px" }}>
            <button
              onClick={() => setActivePage("requests")}
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                textDecoration: "none",
                color: "inherit",
                border: "none",
                cursor: "pointer",
              }}
            >
              İstekler
            </button>
          </li>
        </ul>
      </div>
      <div style={{ marginLeft: "240px", padding: "20px", flex: 1 }}>
        {renderPage()}
      </div>
    </div>
  );
};

export default AdminPanel;
