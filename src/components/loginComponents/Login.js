import React, { useState } from "react"; 
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import WelcomeLogo from './WelcomeLogo';

import { useHistory } from 'react-router-dom'
import Register from '../registerComponent/Register';

import "./Login.css";

function Login({ logIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();
  
    function validateForm() {
      return email.length > 0 && password.length > 0;
    }
  
    function handleSubmit(event) {
      event.preventDefault();
    }

    const onLoginSubmit = () => {
      console.log("HEI")
      history.push("./hjem")
      logIn()
    }


  
  return (
  <div className="Login">
    <Container fluid="md">
        <Row className="">
          <Col className="logo" sm={6}>
            <WelcomeLogo />
          </Col>
          <Col className="login" sm={6}>
            <h2>Logg inn med idrettens ID</h2>
            <a href="/Register">Ny bruker?</a>
            <Form>
                <Form.Group controlId="formBasicEmail" onSubmit={handleSubmit}>
                    <Form.Control 
                    type="email"
                    name="email"
                    placeholder="E-post"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" onSubmit={handleSubmit}>
                    <Form.Control 
                    type="password"
                    name="password"
                    placeholder="Passord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                
                <Button 
                    variant="success" 
                    type="submit"
                    disabled={!validateForm()}
                    onClick={onLoginSubmit}
                >
                    Logg inn
                </Button>
            </Form>
            <p>Glemt passord?</p>
          </Col>
        </Row>
      </Container>
    </div> 
    
  );
}

export default Login;