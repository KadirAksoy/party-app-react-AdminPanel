import React, { useEffect, useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import axios from "axios";

function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [actionType, setActionType] = useState(null); // "delete" or "accept"
  const token = localStorage.getItem("token");

  const getRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/requests/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequests(response.data);
      console.log(requests);
    } catch (error) {
      console.error("There was an error fetching the requests!", error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  const handleConfirm = async () => {
    if (actionType === "delete") {
      await deleteRequest(selectedRequest.id);
    } else if (actionType === "accept") {
      const user = await getUserByEmail(selectedRequest.email);
      if (user) {
        await acceptRequest(user.id);
      }
    }
    setShowConfirmModal(false);
  };

  const handleAccept = (request) => {
    setSelectedRequest(request);
    setActionType("accept");
    setShowConfirmModal(true);
  };

  const handleDelete = (request) => {
    setSelectedRequest(request);
    setActionType("delete");
    setShowConfirmModal(true);
  };

  const deleteRequest = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/requests/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequests(requests.filter((request) => request.id !== id));
    } catch (error) {
      console.error("There was an error deleting the request!", error);
    }
  };

  const acceptRequest = async (userId) => {
    try {
      await axios.post(
        `http://localhost:8080/api/requests/accept/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedRequests = requests.map((request) => {
        if (request.email === selectedRequest.email) {
          return { ...request, accept: true };
        }
        return request;
      });
      setRequests(updatedRequests);
    } catch (error) {
      console.error("There was an error accepting the request!", error);
    }
  };

  const getUserByEmail = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/super-admin/emailUserResponse/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.id;
    } catch (error) {
      console.error("There was an error fetching the user by email!", error);
    }
  };

  return (
    <div>
      <h3>Requests</h3>
      <div className="d-flex flex-wrap">
        {requests.map((request) => (
          <Card key={request.id} className="m-3" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Email: {request.email}</Card.Title>
              <Card.Text>Accepted: {request.accept ? "Yes" : "No"}</Card.Text>
              <Card.Text>
                Created Time: {new Date(request.createdTime).toLocaleString()}
              </Card.Text>
              <Card.Text>
                Updated Time: {new Date(request.updatedTime).toLocaleString()}
              </Card.Text>
              <div className="d-flex justify-content-between">
                <Button
                  variant="success"
                  onClick={() => handleAccept(request)}
                  style={{ margin: "5px" }}
                >
                  Accept
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(request)}
                  style={{ margin: "5px" }}
                >
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`Are you sure you want to ${
            actionType === "delete" ? "delete" : "accept"
          } this request?`}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            No
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RequestsPage;
