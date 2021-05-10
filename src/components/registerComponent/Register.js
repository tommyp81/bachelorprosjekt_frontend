import React, { useState } from "react";
import { Form, Row, Col, Button } from 'react-bootstrap';
import { host } from "../../App";

const Register = ({ setTabKey, setUsers, loginUser}) => {

  const [username, setUsername] = useState("");
  const [checkUsername, setCheckUsername] = useState("");

  const [firstname, setFirstname] = useState("");
  const [checkFirstname, setCheckFirstname] = useState("");

  const [lastname, setLastname] = useState("");
  const [checkLastname, setCheckLastname] = useState("");

  const [email, setEmail] = useState("");
  const [checkEmail, setCheckEmail] = useState("");

  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("")

  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkConfirmPassword, setCheckConfirmPassword] = useState("")

  var isDisabled = true;
  if(!username || !firstname || !lastname || !email || !password || !confirmPassword){
    isDisabled = true;
  } else {
    isDisabled = false;
  }

  
  const handleSubmitUser = async (event) => {
    var userExists = false;

    event.preventDefault();
    const userData = {
      username: username,
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: password
    };

    if(password === confirmPassword){
      fetch(host + "users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => {
          if(!res.ok) {
            userExists = true;
            res.text().then(text => alert(text))
          } else {
            return res.json();
          }    
        })
        .then((data) => {
          setUsers(current => [...current, data])
          const formData = new FormData()
          formData.append('username', data.username)
          formData.append('password', password)
          loginUser(formData)
        })
        .catch((error) => console.log(error));
      }

    /*
    const validUsername = new RegExp(/^[a-zA-Z]{3,20}\d*$/i) 
    if (!username.match(validUsername)) {
      setCheckUsername(<span style={{color: "red", fontSize: "13px",fontWeight: "600"}}>Brukernavn må være minst 3 og <br/>maks 20 karakterer langt</span>)
    } else if (sjekk om brukernavn eksisterer) {
      setCheckUsername(<span style={{color: "red", fontSize: "13px",fontWeight: "600"}}>Brukernavnet er opptatt</span>)
    } else {
      setCheckUsername("")
    }

    const validEmail = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
    if (!email.match(validEmail)) {
      setCheckEmail(<span style={{color: "red", fontSize: "13px",fontWeight: "600"}}>E-posten er ikke gyldig</span>)
    } else if (sjekk om epost eksisterer) {
      setCheckEmail(<span style={{color: "red", fontSize: "13px",fontWeight: "600"}}>E-posten er opptatt</span>)
    } else {
      setCheckEmail("")
    }

    if (firstname < 0) {
      setCheckFirstname(<span style={{color: "red", fontSize: "13px",fontWeight: "600"}}>Fornavn kan ikke være tomt!</span>)
    } else {
      setCheckFirstname("")
    }

    if (lastname < 0) {
      setCheckLastname(<span style={{color: "red", fontSize: "13px",fontWeight: "600"}}>Etternavn kan ikke være tomt!</span>)
    } else {
      setCheckLastname("")
    }

    /*
    const validPassword = new RegExp(/"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/)
    if (!password.match(validPassword)) {
      setCheckPassword(<span style={{color: "red", fontSize: "13px",fontWeight: "600"}}>Passord må være minst 8 karakterer langt <br/>og ha minst ett tall</span>)
    }
    }*/
    if(password === confirmPassword && !userExists){
      setCheckConfirmPassword("")
      setTabKey('login')
    } else {
      setCheckConfirmPassword(<span style={{color: "red", fontSize: "13px",fontWeight: "600"}}>Passord og bekreft passord er ikke like!</span>)
    }
  };


  return (
    <div className="Register">
      <div className="registerdesktop">
      <Row className="justify-content-md-center"> 
          <Col md="auto" className="register">
            <Form className="form">
              <Form.Label>Brukernavn</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                tabIndex="1"
              />
              {checkUsername}
              <br />
              <Form.Label>Fornavn</Form.Label>
              <Form.Control
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                tabIndex="3"
              />
              {checkFirstname}
              <br/>
              <Form.Label>Passord</Form.Label>
              <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  tabIndex="5"
                />
              {checkPassword}
              <br/>
            </Form>
            </Col>
            <Col md="auto" className="register"> 
            <Form className="form">
              <Form.Label>E-post</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                tabIndex="2"
              />
              {checkEmail}
              <br/>
              <Form.Label>Etternavn</Form.Label>
              <Form.Control
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                tabIndex="4"
              />
              {checkLastname}
              <br/>
              
              <Form.Label>Bekreft passord</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                tabIndex="6"
              />
              {checkConfirmPassword}
              <br/>
            </Form>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col className="register" md="auto">
            <Button
                variant="success"
                type="submit"
                disabled={isDisabled}
                onClick={handleSubmitUser}
                tabIndex="7"
              >
                Registrer
              </Button>
            </Col>
          </Row>
          </div>


          <div className="registermobile">
          <Row className="justify-content-md-center"> 
          <Col md="auto" className="register">
            <Form className="form">
              <Form.Label>Brukernavn</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {checkUsername}
              <br />
              <Form.Label>Fornavn</Form.Label>
              <Form.Control
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              {checkFirstname}
              <br/>
              <Form.Label>Etternavn</Form.Label>
              <Form.Control
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              {checkLastname}
              <br/>
              
            </Form>
            </Col>
            <Col md="auto" className="register"> 
            <Form className="form">
              <Form.Label>E-post</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {checkEmail}
              <br/>
              <Form.Label>Passord</Form.Label>
              <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {checkPassword}
              <br/>
              <Form.Label>Bekreft passord</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {checkConfirmPassword}
              <br/>
            </Form>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col className="register" md="auto">
            <Button
                variant="success"
                type="submit"
                disabled={isDisabled}
                onClick={handleSubmitUser}
              >
                Registrer
              </Button>
            </Col>
          </Row></div>
    </div>
  );
};

export default Register;
