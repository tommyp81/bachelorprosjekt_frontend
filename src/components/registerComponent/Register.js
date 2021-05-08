import React, { useState } from "react";
import { Form, Row, Col, Button } from 'react-bootstrap';
import { host } from "../../App";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


const Register = ({ setUsers, loginUser}) => {

  // const [username, setUsername] = useState("");
  // const [firstname, setFirstname] = useState("");
  // const [lastname, setLastname] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  // var isDisabled = true;
  // if(!username || !firstname || !lastname || !email || !password || !confirmPassword){
  //   isDisabled = true;
  // } else {
  //   isDisabled = false;
  // }

  const { register, handleSubmit, errors } = useForm()


  const onSubmit = data => {
    console.log(data)
  }


  
  // const handleSubmitUser = async (event) => {
  //   var userExists = false;

  //   event.preventDefault();
  //   const userData = {
  //     username: username,
  //     firstName: firstname,
  //     lastName: lastname,
  //     email: email,
  //     password: password
  //   };

  //   if(password === confirmPassword){
  //     fetch(host + "users", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(userData),
  //     })
  //       .then((res) => {
  //         if(!res.ok) {
  //           userExists = true;
  //           res.text().then(text => alert(text))
  //         } else {
  //           return res.json();
  //         }    
  //       })
  //       .then((data) => {
  //         setUsers(current => [...current, data])
  //         const formData = new FormData()
  //         formData.append('username', data.username)
  //         formData.append('password', password)
  //         loginUser(formData)
  //       })
  //       .catch((error) => console.log(error));
  //     }

      
  //   if(password === confirmPassword && !userExists){
  //     console.log("login")
  //   } else {
  //     alert("Passord og bekreft passord er ikke like.")
  //   }
  // };

  return (
    <div className="Register">
      <div className="registerdesktop">
      <Row className="justify-content-md-center"> 
        <form onSubmit={handleSubmit(onSubmit)}>
          <Col md="auto" className="register">
            {/* <Form className="form">
              <Form.Label>Brukernavn</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                // tabIndex="1"
              />
              <br />
              <Form.Label>Fornavn</Form.Label>
              <Form.Control
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                // tabIndex="3"
              />
              <br/>
              <Form.Label>Passord</Form.Label>
              <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // tabIndex="5"
                />
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
                // tabIndex="2"
              />
              <br/>
              <Form.Label>Etternavn</Form.Label>
              <Form.Control
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                // tabIndex="4"
              />
              <br/>
              
              <Form.Label>Bekreft passord</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                // tabIndex="6"
              />
              <br/>
            </Form> */}

              <div>
                <label>Brukernavn</label>
                <input name="username" type="text" ref={register} />
              </div>
              <div>
                <label>Fornavn</label>
                <input name="firstName" type="text" ref={register} />
              </div>
              <div>
                <label>Passord</label>
                <input name="password" type="password" ref={register} />
              </div>

              <div>
                <label>E-post</label>
                <input name="email" type="email" ref={register} />
              </div>
              <div>
                <label>Etternavn</label>
                <input name="lastName" type="text" ref={register} />
              </div>
              <div>
                <label>Bekreft passord</label>
                <input name="confirmPassword" type="password" ref={register} />
              </div>
            
            </Col>
            </form>
            <Col md="auto" className="register">
              
            </Col>
          
          </Row>
          <Row className="justify-content-md-center">
            <Col className="register" md="auto">
            {/* <Button
                variant="success"
                type="submit"
                disabled={isDisabled}
                onClick={handleSubmitUser}
                // tabIndex="7"
              >
                Registrer
              </Button> */}
            </Col>
          </Row>
          </div>


          <div className="registermobile">
          {/* <Row className="justify-content-md-center"> 
          <Col md="auto" className="register">
            <Form className="form">
              <Form.Label>Brukernavn</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <Form.Label>Fornavn</Form.Label>
              <Form.Control
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <br/>
              <Form.Label>Etternavn</Form.Label>
              <Form.Control
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
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
              <br/>
              <Form.Label>Passord</Form.Label>
              <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              <br/>
              <Form.Label>Bekreft passord</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
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
          </Row>*/}</div> 
     {/*
      <Container fluid="md">
        <Row>
          <Col className="logo" sm={12} >
                        <WelcomeLogo />
                        </Col>
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
                disabled={isDisabled}
              >
                Opprett bruker
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>*/}
    </div>
  );
};

export default Register;
