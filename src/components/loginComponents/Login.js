import React, { useState } from "react"; 
import { Form, Button, Container, Col, Row } from "react-bootstrap";
// import logo from "C:/Users/Tobia/kunnskapsportalen_badminton/src/nbf_logo_farger-02.png";
import WelcomeLogo from './WelcomeLogo';

import { useHistory } from 'react-router-dom'

// import "./Login.css";

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
      history.push("/hjem")
      logIn()
    }


  
  return (
    
    <Container fluid="md" style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Row className="">
          <Col sm={6}>
            <WelcomeLogo />
          </Col>
          <Col sm={6} style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', maxWidth: 400, minWidth: 300}}>
            <h2>Logg inn med idrettens ID</h2>
            <div style={{height: '5vh'}}  />
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
            <div style={{height: '5vh'}}  />
            <p>Glemt passord?</p>
          </Col>
        </Row>
      </Container>
      
    
  );
}

export default Login;