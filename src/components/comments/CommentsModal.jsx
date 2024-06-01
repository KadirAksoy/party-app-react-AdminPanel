import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const CommentsModal = ({ comments, show, handleClose, refreshComments }) => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  const getUserById = async (id) => {
    if (users[id]) return users[id];
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/super-admin/getUserResponse/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = response.data;
      setUsers((prevUsers) => ({
        ...prevUsers,
        [id]: userData,
      }));
      return userData;
    } catch (error) {
      console.error("There was an error fetching the user!", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const userIds = [...new Set(comments.map((comment) => comment.user))];
      await Promise.all(userIds.map((id) => getUserById(id)));
    };

    if (comments.length > 0) {
      fetchUsers();
    }
  }, [comments]);

  const handleDeleteClick = (comment) => {
    setSelectedComment(comment);
    setShowDeleteModal(true);
  };

  const deleteComment = async () => {
    if (!selectedComment) return;
    try {
      await axios.delete(
        `http://localhost:8080/api/comments/delete/${selectedComment.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      refreshComments(); // To refresh the comments after deletion
      setShowDeleteModal(false);
    } catch (error) {
      console.error("There was an error deleting the comment!", error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Yorumlar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {comments.length > 0 ? (
            comments.map((comment) => {
              const user = users[comment.user];
              return (
                <div key={comment.id}>
                  <p>
                    <strong>
                      {user
                        ? `${user.firstName} ${user.lastName}`
                        : "Kullanıcı"}
                      :
                    </strong>{" "}
                    {comment.text}
                  </p>
                  <p>
                    <small>
                      {new Date(comment.createdTime).toLocaleString()}
                    </small>
                  </p>
                  <p>
                    <small>{user ? user.email : ""}</small>
                  </p>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(comment)}
                  >
                    Sil
                  </Button>
                  <hr />
                </div>
              );
            })
          ) : (
            <p>Yorum bulunmamaktadır.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
        </Modal.Footer>
      </Modal>

      {selectedComment && (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Yorumu Sil</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Bu yorumu silmek istediğinize emin misiniz?</p>
            <p>
              <strong>{selectedComment.text}</strong>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              İptal
            </Button>
            <Button variant="danger" onClick={deleteComment}>
              Sil
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default CommentsModal;
