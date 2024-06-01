import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

const AdminParticipantParties = ({ participantParties }) => {
  const [images, setImages] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchImages = async () => {
      const newImages = {};
      for (const party of participantParties) {
        if (party.imageId) {
          try {
            const response = await axios.get(
              `http://localhost:8080/api/images/get/${party.imageId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                responseType: "blob",
              }
            );
            newImages[party.imageId] = URL.createObjectURL(response.data);
          } catch (error) {
            console.error(
              `Error fetching image with id ${party.imageId}`,
              error
            );
          }
        }
      }
      setImages(newImages);
    };

    fetchImages();
  }, [participantParties, token]);

  return (
    <div>
      <h3>Katıldığı Partiler</h3>
      {participantParties && participantParties.length > 0 ? (
        participantParties.map((party) => (
          <Card key={party.id} className="mb-4">
            {party.imageId && images[party.imageId] && (
              <Card.Img
                variant="top"
                src={images[party.imageId]}
                alt={party.title}
                style={{ width: "100%", height: "auto" }}
              />
            )}
            <Card.Body>
              <Card.Title>{party.title}</Card.Title>
              <Card.Text>
                <p>ID: {party.id}</p>
                <p>Açıklama: {party.description}</p>
                <p>
                  Etkinlik Tarihi: {new Date(party.eventDate).toLocaleString()}
                </p>
                <p>Aktif: {party.active ? "Evet" : "Hayır"}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>Katılımcı partisi bulunamadı.</p>
      )}
    </div>
  );
};

export default AdminParticipantParties;
