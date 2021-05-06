import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Container, Col, Modal, Row, Tabs, Tab, Image } from "react-bootstrap";
import Background from "../../assets/images/badminton2.jpg"
import { Link, useHistory } from "react-router-dom";
import Register from "../registerComponent/Register";

import "./Login.css";
import { UserContext } from "../../UserContext";
import { host } from "../../App";
import UsernameDialog from "../Admin/UsernameDialog";

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

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();

    if (validateEmail(input)){
      formData.append("email", input)
    } else {
      formData.append("username", input)
    }

    formData.append("password", password)

    loginUser(formData)
  }

  const loginUser = async (formData) => {

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


    history.push("./");
  };


  return (
    <div className="Login" style={{backgroundImage: `url(${Background})`, height: "110vh"}}>
    
      <div className="logo">
        <Image src="https://www.badminton.no/siteassets/badminton_logo.png" 
        width="225px"
        style={{backgroundColor: "white", borderRadius: "50%", padding: "10px"}}
        className="logo"/>
      </div>
      
       <div className="main">
        <div className="toptext">
        <h1>Norges Badmintonforbund</h1>
        <p>Kunnskapsportal og kommunikasjonsplattform for badmintonspillere over hele landet</p>
      </div>
     
        <Tabs variant="pills" transition={false} activeKey={tabKey} onSelect={k => setTabKey(k)}>
        <Tab title="Logg inn" eventKey="login"> 
        <Row className="justify-content-md-center">
          <Col className="login" md="auto">
            <Form className="form">
              <Form.Label>Brukernavn/E-post</Form.Label>
              <Form.Control
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <br/>
              <Form.Label>Passord</Form.Label>
              <Form.Control 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br/>
              <p>Glemt brukernavn eller passord? Send e-post<br/> til admin på [E-POST]</p>
              <Button
                variant="success"
                type="submit"
                disabled={!validateForm()}
                onClick={handleSubmit}
                >
                Logg inn
              </Button>
            </Form>
          </Col>
        </Row>

        </Tab>
        <Tab title="Registrer" eventKey="register"> 
          <Register setTabKey={setTabKey} setUsers={setUsers} loginUser={loginUser}/>
        </Tab>
      </Tabs>
      </div>
      </div>
  )
    {/** 
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
                <Register setTabKey={setTabKey} setUsers={setUsers} loginUser={loginUser}/>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );*/}
};

export default Login;
