import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Container, Col, Modal, Row, Tabs, Tab } from "react-bootstrap";
import WelcomeLogo from "./WelcomeLogo";

import { Link, useHistory } from "react-router-dom";
import Register from "../registerComponent/Register";

import "./Login.css";
import { UserContext } from "../../UserContext";
import { host } from "../../App";

const Login = ({ history, setUsers }) => {
  

  // LOGIN / REGISTRATION HOOKS
  const [input, setInput] = useState(""); //test
  const [password, setPassword] = useState("");

  const [tabKey, setTabKey] = useState('login')


  // USER HANDLING
  const { setUser } = useContext(UserContext);


  function validateForm() {
    return input.length > 0 && password.length > 0;
  }

  function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();

    if (validateEmail(input)){
      formData.append("email", input)
    } else {
      formData.append("username", input)
    }

    formData.append("password", password)
    const res = await fetch(host+"Login", {
      method: 'POST',
      body: formData
    })
    
    if (res.ok) {
      const data = await res.json()
      setUser({ ...data, loggedIn: true });
      console.log("Success")
    } else {
      const resText = await res.text()
      alert(resText)
      return;
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
            <h2>Logg inn / Registrer deg</h2>
            <Tabs transition={false} activeKey={tabKey} onSelect={k => setTabKey(k)}>
              <Tab eventKey="login" title="login">
                <Form onSubmit={handleSubmit}>
                  <Form.Label>Innlogging</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Brukernavn/epost"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                
                  <Form.Control 
                    type="password"
                    placeholder="Passord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  
                  <Button
                    variant="success"
                      type="submit"
                      disabled={!validateForm()}
                  >
                    Logg inn
                  </Button>
                </Form>
              </Tab>
              <Tab eventKey="register" title="register">
                <Register setTabKey={setTabKey} setUsers={setUsers}/>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
