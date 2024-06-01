import React from "react";

const PartyUserDetails = ({ users, onUserClick }) => {
  return (
    <tbody>
      {Array.isArray(users) && users.length > 0 ? (
        users.map((user) => (
          <tr key={user.id}>
            <td style={{ borderBottom: "1px solid #ddd", padding: "12px" }}>
              {user.firstName}
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "12px" }}>
              {user.lastName}
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "12px" }}>
              {user.email}
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "12px" }}>
              <button onClick={() => onUserClick(user)}>Detay</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4" style={{ textAlign: "center", padding: "12px" }}>
            Kullanıcı bulunamadı.
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default PartyUserDetails;
