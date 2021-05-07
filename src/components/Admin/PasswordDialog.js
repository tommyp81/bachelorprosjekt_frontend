import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { host } from "../../App";

const PasswordDialog = ({ user }) => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setPassword("");
    setPassword2("");
    setShow(true);
  };

  const isDiabled = password.length < 1 || password2.length < 1;

  const setNewPassword = async (e) => {
    e.preventDefault();
    if (password === password2) {
      const res = await fetch(host + `users/${user.id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ ...user, password }),
      });
      if (res.ok) {
        handleClose();
        alert("Passordet er endret!");
      } else {
        const text = await res.text();
        alert(text);
      }
    } else {
      alert("Passordene er ikke like!");
    }
  };

  return (
    <>
      <span className="btn-link" onClick={handleShow}>
        Endre Passord
      </span>
      <Modal animation={false} show={show} onHide={handleClose}>
        <Modal.Header closeButton={true}>
          <Modal.Title>Sett nytt passord for: {user.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Nytt Passord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Bekreft Passord"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <div className="float-right">
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Avbryt
            </Button>
            <Button
              disabled={isDiabled}
              variant="success"
              onClick={setNewPassword}
            >
              Endre
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default PasswordDialog;
