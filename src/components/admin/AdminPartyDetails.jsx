import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

const AdminPartyDetails = ({ parties }) => {
  const [images, setImages] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchImages = async () => {
      const newImages = {};
      for (const party of parties) {
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
  }, [parties, token]);

  return (
    <div>
      <h3>Partiler</h3>
      {parties && parties.length > 0 ? (
        parties.map((party) => (
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
                <p>Katılımcı Limiti: {party.participantLimit}</p>
                <p>
                  Oluşturma Tarihi:{" "}
                  {new Date(party.createdTime).toLocaleString()}
                </p>
                <p>
                  Güncelleme Tarihi:{" "}
                  {new Date(party.updatedTime).toLocaleString()}
                </p>
                <p>Aktif: {party.active ? "Evet" : "Hayır"}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>Parti bulunamadı.</p>
      )}
    </div>
  );
};

export default AdminPartyDetails;
