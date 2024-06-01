import React from "react";
import { Modal, Button } from "react-bootstrap";

const PartyDetailsModal = ({ party, show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Parti Detayları</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{party.title}</h4>
        <p>ID: {party.id}</p>
        <p>Açıklama: {party.description}</p>
        <p>Etkinlik Tarihi: {new Date(party.eventDate).toLocaleString()}</p>
        <p>Katılımcı Limiti: {party.participantLimit}</p>
        <p>Oluşturma Tarihi: {new Date(party.createdTime).toLocaleString()}</p>
        <p>Güncelleme Tarihi: {new Date(party.updatedTime).toLocaleString()}</p>
        <p>Aktif: {party.active ? "Evet" : "Hayır"}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Kapat
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PartyDetailsModal;
