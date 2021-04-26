import React, { useState } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import WelcomeLogo from "../loginComponents/WelcomeLogo";
import { host } from "../../App";
import "./Register.css";

const Register = (props) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmitUser = async (event) => {
    const userData = {
      username: username,
      firstName: firstname,
      lastName: lastname,
      //epost: email,
      password: password,
      //bekreftPassord: confirmPassword
    };

    fetch(host + "users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));

    handleClose();
  };

  return (
    <div className="Register">
      <Container fluid="md">
        <Row>
          <Col className="submit" sm={30}>
            <h2 id="registerHeading">Registrer informasjonen din</h2>

            <Form>
              <Form.Group controlId="">
                <Form.Label>Brukernavn</Form.Label>
                <Form.Control
                  id="username"
                  type="text"
                  name="Brukernavn"
                  placeholder="Brukernavn"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="">
                <Form.Label>Fornavn</Form.Label>
                <Form.Control
                  id="firstname"
                  type="text"
                  name="Fornavn"
                  placeholder=""
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="">
                <Form.Label>Etternavn</Form.Label>
                <Form.Control
                  id="lastname"
                  type="text"
                  name="Etternavn"
                  placeholder=""
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>E-post</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Passord</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Bekreft passord</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder=""
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="success"
                type="submit"
                onClick={handleSubmitUser}
              >
                Sendt inn
              </Button>
            </Form>

            <a href="/Login">Har du en konto?</a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
