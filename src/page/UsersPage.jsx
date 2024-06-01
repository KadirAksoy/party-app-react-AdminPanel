import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import AdminUserDetails from "../components/admin/AdminUserDetails";
import PartyUserDetails from "../components/admin/PartyUserDetails";
import AdminPartyDetails from "../components/admin/AdminPartyDetails";
import AdminParticipantParties from "../components/admin/AdminParticipantParties";

Modal.setAppElement("#root");

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [parties, setParties] = useState([]);
  const [attendParties, setAttendParties] = useState([]);

  const token = localStorage.getItem("token");

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/users/super-admin/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("There was an error fetching the users!", error);
    }
  };

  const getPartiesByUserId = async (adminId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/api/parties/getByAdminId/${adminId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setParties(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("There was an error fetching the parties!", error);
    }
  };

  const getAttendPartiesByUserId = async (adminId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/api/parties/${adminId}/parties`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAttendParties(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("There was an error fetching the parties!", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleUserClick = async (user) => {
    setSelectedUser(user);
    setShowModal(true);
    setActiveTab("details");
    await getPartiesByUserId(user.id);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setParties([]);
    setAttendParties([]);
  };

  const handleTabClick = async (tab) => {
    setActiveTab(tab);
    if (tab === "parties") {
      await getPartiesByUserId(selectedUser.id);
    } else if (tab === "participantParties") {
      await getAttendPartiesByUserId(selectedUser.id);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <div style={{ width: "100%" }}>
        <h2 style={{ textAlign: "center" }}>Kullanıcılar</h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            margin: "20px 0",
            fontSize: "18px",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ddd", padding: "12px" }}>
                Ad
              </th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "12px" }}>
                Soyad
              </th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "12px" }}>
                Email
              </th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "12px" }}>
                İşlemler
              </th>
            </tr>
          </thead>
          <PartyUserDetails users={users} onUserClick={handleUserClick} />
        </table>
      </div>

      {selectedUser && (
        <Modal
          isOpen={showModal}
          onRequestClose={closeModal}
          contentLabel="Kullanıcı Detayları"
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              width: "500px",
              minWidth: "600px",
              minHeight: "600px",
            },
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "10px",
              marginBottom: "10px",
              padding: "6px",
              minWidth: "2px",
            }}
          >
            <button onClick={() => handleTabClick("details")}>
              Kullanıcı Detayları
            </button>
            <button onClick={() => handleTabClick("parties")}>Partiler</button>
            <button onClick={() => handleTabClick("participantParties")}>
              Katıldığı Partiler
            </button>
          </div>
          {activeTab === "details" && <AdminUserDetails user={selectedUser} />}
          {activeTab === "parties" && <AdminPartyDetails parties={parties} />}
          {activeTab === "participantParties" && (
            <AdminParticipantParties participantParties={attendParties} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default UsersPage;
