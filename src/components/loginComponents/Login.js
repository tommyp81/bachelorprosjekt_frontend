import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import WelcomeLogo from "./WelcomeLogo";

import { Link, useHistory } from "react-router-dom";
import Register from "../registerComponent/Register";

import "./Login.css";
import { UserContext } from "../../UserContext";

const Login = ({ history }) => {
  const [uname, setUname] = useState("test");
  // const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);

  function validateForm() {
    // return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    switch (uname) {
      case "test":
        setUser({ id: 6, username: "test", loggedIn: true });
        break;
      case "tommy":
        setUser({ id: 1, username: "tommy", loggedIn: true });
        break;
      case "henrik":
        setUser({ id: 2, username: "henrik", loggedIn: true });
        break;
      case "erik":
        setUser({ id: 3, username: "erik", loggedIn: true });
        break;
      case "pia":
        setUser({ id: 4, username: "pia", loggedIn: true });
        break;
      case "sepita":
        setUser({ id: 5, username: "sepideh", loggedIn: true });
        break;
      case "charlotte":
        setUser({ id: 7, username: "charlotte", loggedIn: true });
        break;
      default:
        break;
    }

    loginUser();
  }

  const loginUser = () => {
    history.push("./");
  };

  return (
    <div className="Login">
      <Container>
        <Row xs={1} sm={1} lg={2}>
          <Col className="logo" lg={7}>
            <WelcomeLogo />
          </Col>
          <Col className="login" lg={5}>
            <h2>Logg inn med <br />Idrettens ID</h2>
            <Form onSubmit={handleSubmit}>
              {/* <Form.Group controlId="formBasicEmail" >
                    <Form.Control 
                    type="text"
                    name="username"
                    placeholder="Brukernavn"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control 
                    type="password"
                    name="password"
                    placeholder="Passord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group> */}
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Velg bruker</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => setUname(e.target.value)}
                >
                  <option value="test">test</option>
                  <option value="tommy">tommy</option>
                  <option value="henrik">henrik</option>
                  <option value="erik">erik</option>
                  <option value="pia">pia</option>
                  <option value="sepideh">sepideh</option>
                  <option value="charlotte">charlotte</option>
                </Form.Control>
              </Form.Group>

              <Button
                variant="success"
                type="submit"
                // disabled={!validateForm()}
              >
                Logg inn
              </Button>
            </Form>
            <a href="https://www.nif.buypass.no/nif-forgot-password/">Glemt passord?</a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
