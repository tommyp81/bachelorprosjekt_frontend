import React, { useContext, useState } from "react";
import { Form, Button, Col, Row, Tabs, Tab, Image } from "react-bootstrap";


import "./Login.css";
import { UserContext } from "../../UserContext";
import { host } from "../../App";
import Register from "../registerComponent/Register";

const Login = ({ history }) => {


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

    if (validateEmail(input)) {
      formData.append("email", input)
    } else {
      formData.append("username", input)
    }

    formData.append("password", password)

    loginUser(formData)
  }

  const loginUser = async (formData) => {

    const res = await fetch(host + "Login", {
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
    <div className="Login">

      <div className="logo">
        <Image src="https://www.badminton.no/siteassets/badminton_logo.png"
          width="225px"
          style={{ backgroundColor: "white", borderRadius: "50%", padding: "10px" }}
          className="logo" />
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
                  <br />
                  <Form.Label>Passord</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <br />
                  <div className="contact">
                    <p>Glemt brukernavn eller passord? Send e-post til admin på charlotte.stoelen@badminton.no eller ring 97180074 mellom kl. 10:00-15:00 på hverdager!</p>
                  </div>
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
            <Register loginUser={loginUser} />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
};

export default Login;
