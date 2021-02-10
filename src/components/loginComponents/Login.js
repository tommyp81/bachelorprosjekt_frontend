import React, { useState } from "react"; 
import { Form, Button, Container, Image } from "react-bootstrap";
import logo from "../../assets/nbf_logo_farger-02.png";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    function validateForm() {
      return email.length > 0 && password.length > 0;
    }
  
    function handleSubmit(event) {
      event.preventDefault();
    }
  
  return (
    <div className="Login">
      <Container className="con1">
      <Image 
      src={logo} 
      alt="Logo"
      className="logo"/>
      <h1>Norges Badmintonforbund</h1>
      <p>Kunnskapsportal og kommunikasjonsplattform for badmintonspillere over hele landet</p>
      </Container>

      <Container className="con2">
      <h2>Logg inn med idrettens ID</h2>
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
              disabled={!validateForm()}>
              Logg inn
          </Button>
      </Form>
      <br />
      <p>Glemt passord?</p>
      </Container>
    </div>
  );
}

export default Login;