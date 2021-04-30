import React, { useState } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import WelcomeLogo from "../loginComponents/WelcomeLogo";
import { host } from "../../App";
import "./Register.css";

const Register = ({ setTabKey, setUsers}) => {

  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmitUser = async (event) => {

    if(password === confirmPassword){
      event.preventDefault();
      const userData = {
        username: username,
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
        //bekreftPassord: BekreftPassord
      };

      console.log("Objektet:");
      console.log(userData);

      fetch(host + "users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => {
          if(res.ok)
            return res.json();
          throw res
        })
        .then((data) => {
          setUsers(current => [...current, data])
        })
        .catch((error) => console.log(error));

        setTabKey('login')
    } else {
      alert("Passord og bekreft passord er ikke like.")
    }
  };

  return (
    <div className="Register">
      <Container fluid="md">
        <Row>
          {/*<Col className="logo" sm={12} >
                        <WelcomeLogo />
                        </Col>*/}
          <Col className="submit">
            <Form onSubmit={handleSubmitUser}>
              <Form.Group >
                <Form.Label>Brukernavn</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Brukernavn"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group >
                <Form.Label>Fornavn</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Fornavn"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </Form.Group>

              <Form.Group >
                <Form.Label>Etternavn</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Etternavn"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Form.Group>

              <Form.Group >
                <Form.Label>E-post</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group >
                <Form.Label>Passord</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Passord"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group >
                <Form.Label>Bekreft passord</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Bekreft Passord"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="success"
                type="submit"
              >
                Opprett bruker
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
