import React, { useEffect, useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import axios from "axios";
import PartyDetailsModal from "../components/party/PartyDetailsModal"; // Import the PartyDetailsModal component
import CommentsModal from "../components/comments/CommentsModal"; // Import the new CommentsModal component

function PartiesPage() {
  const token = localStorage.getItem("token");
  const [parties, setParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [comments, setComments] = useState([]);

  const getAllParties = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/parties/getAll",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setParties(response.data);
    } catch (error) {
      console.error("There was an error fetching the parties!", error);
    }
  };

  const getCommentsByPartyId = async (partyId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/comments/getCommentByPartyId/${partyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments(response.data);
    } catch (error) {
      console.error("There was an error fetching the comments!", error);
    }
  };

  useEffect(() => {
    getAllParties();
  }, []);

  const handleDetailsClick = (party) => {
    setSelectedParty(party);
    setShowDetailsModal(true);
  };

  const handleCommentsClick = async (party) => {
    setSelectedParty(party);
    await getCommentsByPartyId(party.id);
    setShowCommentsModal(true);
  };

  const handleDeleteClick = (party) => {
    setSelectedParty(party);
    setShowDeleteModal(true);
  };

  const closeDetailsModal = () => setShowDetailsModal(false);
  const closeCommentsModal = () => setShowCommentsModal(false);
  const closeDeleteModal = () => setShowDeleteModal(false);

  const deleteParty = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/parties/delete/${selectedParty.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setParties(parties.filter((party) => party.id !== selectedParty.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("There was an error deleting the party!", error);
    }
  };

  const refreshComments = () => {
    if (selectedParty) {
      getCommentsByPartyId(selectedParty.id);
    }
  };

  return (
    <div>
      <h3>Partiler</h3>
      <div className="d-flex flex-wrap">
        {parties.map((party) => (
          <Card key={party.id} className="m-3" style={{ width: "18rem" }}>
            {party.imageId && (
              <Card.Img
                variant="top"
                src={`http://localhost:8080/api/images/get/${party.imageId}`}
                alt={party.title}
                style={{ height: "180px", objectFit: "cover" }}
              />
            )}
            <Card.Body
              className="d-flex flex-column justify-content-between"
              style={{ height: "220px" }}
            >
              <div>
                <Card.Title>{party.title}</Card.Title>
                <Card.Text>{party.description}</Card.Text>
              </div>
              <div className="d-flex justify-content-between mt-auto">
                <Button
                  variant="primary"
                  onClick={() => handleDetailsClick(party)}
                  style={{ margin: "5px" }}
                >
                  Detaylar
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleCommentsClick(party)}
                  style={{ margin: "5px" }}
                >
                  Yorumlar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteClick(party)}
                  style={{ margin: "5px" }}
                >
                  Sil
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      {selectedParty && (
        <PartyDetailsModal
          party={selectedParty}
          show={showDetailsModal}
          handleClose={closeDetailsModal}
        />
      )}

      {selectedParty && (
        <CommentsModal
          comments={comments}
          show={showCommentsModal}
          handleClose={closeCommentsModal}
          refreshComments={refreshComments}
        />
      )}

      {selectedParty && (
        <Modal show={showDeleteModal} onHide={closeDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Partiyi Sil</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {selectedParty.title} başlıklı partiyi silmek istediğinize emin
              misiniz?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeDeleteModal}>
              İptal
            </Button>
            <Button variant="danger" onClick={deleteParty}>
              Sil
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default PartiesPage;
