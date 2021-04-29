import React, { useState } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import WelcomeLogo from "../loginComponents/WelcomeLogo";
import { host } from "../../App";
import "./Register.css";

const Register = ({ setTabKey, setUsers}) => {

  const [Brukernavn, setBrukernavn] = useState("");
  const [Fornavn, setFornavn] = useState("");
  const [Etternavn, setEtternavn] = useState("");
  const [Epost, setEpost] = useState("");
  const [Passord, setPassord] = useState("");
  const [BekreftPassord, setBekreftPassord] = useState("");

  const handleSubmitUser = async (event) => {

    event.preventDefault();
    const brukerData = {
      username: Brukernavn,
      firstName: Fornavn,
      lastName: Etternavn,
      email: Epost,
      password: Passord,
      //bekreftPassord: BekreftPassord
    };

    console.log("Objektet:");
    console.log(brukerData);

    fetch(host + "users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(brukerData),
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
                  value={Brukernavn}
                  onChange={(e) => setBrukernavn(e.target.value)}
                />
              </Form.Group>

              <Form.Group >
                <Form.Label>Fornavn</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Fornavn"
                  value={Fornavn}
                  onChange={(e) => setFornavn(e.target.value)}
                />
              </Form.Group>

              <Form.Group >
                <Form.Label>Etternavn</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Etternavn"
                  value={Etternavn}
                  onChange={(e) => setEtternavn(e.target.value)}
                />
              </Form.Group>

              <Form.Group >
                <Form.Label>E-post</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="email@example.com"
                  value={Epost}
                  onChange={(e) => setEpost(e.target.value)}
                />
              </Form.Group>

              <Form.Group >
                <Form.Label>Passord</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Passord"
                  value={Passord}
                  onChange={(e) => setPassord(e.target.value)}
                />
              </Form.Group>

              <Form.Group >
                <Form.Label>Bekreft passord</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Bekreft Passord"
                  value={BekreftPassord}
                  onChange={(e) => setBekreftPassord(e.target.value)}
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
