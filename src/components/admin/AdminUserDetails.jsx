import React from "react";

const AdminUserDetails = ({ user }) => {
  return (
    <div>
      <h2>Kullanıcı Detayları</h2>
      <p>ID: {user.id}</p>
      <p>Ad: {user.firstName}</p>
      <p>Soyad: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Rol: {user.role}</p>
      <p>
        Oluşturma Tarihi:{" "}
        {user.createdTime && new Date(user.createdTime).toLocaleString()}
      </p>
      <p>
        Güncelleme Tarihi:{" "}
        {user.updatedTime && new Date(user.updatedTime).toLocaleString()}
      </p>
      <p>
        Doğum Tarihi:{" "}
        {user.birthdayDate && new Date(user.birthdayDate).toLocaleDateString()}
      </p>
      <p>Aktif: {user.active ? "Evet" : "Hayır"}</p>
      <p>OTP: {user.otp}</p>
      <p>
        OTP Oluşturma Tarihi:{" "}
        {user.otpGeneratedTime &&
          new Date(user.otpGeneratedTime).toLocaleString()}
      </p>
    </div>
  );
};

export default AdminUserDetails;
