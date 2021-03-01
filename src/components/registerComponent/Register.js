import React, { useState } from 'react';
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import WelcomeLogo from '../loginComponents/WelcomeLogo';
import "./Register.css"


const Register = (props) => {
    return (  
        <div className="Register">
            <Container fluid="md">
                <Row>
                    <Col className="logo" sm={6} >
                        <WelcomeLogo />
                    </Col>
                    <Col className="submit" sm={6} >
                    <h2 id="registerHeading">Registrer informasjonen din</h2>
                    <Form>
                        <Form.Group controlId="">
                            <Form.Label>Fødsels-/D-nummer</Form.Label>
                            <Form.Control 
                                id="personnummer"
                                type="number"
                                name="ddmmååxxxxx"
                                placeholder="ddmmååxxxxx"
                                value={""}
                            />
                        </Form.Group>

                        <Form.Group controlId="">
                            <Form.Label>Fornavn</Form.Label>
                            <Form.Control 
                                id="Fornavn"
                                type="text"
                                name="Fornavn"
                                placeholder=""
                                value={""}
                            />
                        </Form.Group>

                        <Form.Group  controlId="">
                            <Form.Label>Etternavn</Form.Label>
                            <Form.Control 
                                id="Etternavn"
                                type="text"
                                name="Etternavn"
                                placeholder=""
                                value={""}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" >
                            <Form.Label>E-post</Form.Label>
                            <Form.Control 
                                type="email"
                                name="email"
                                placeholder="email@example.com"
                                value={""}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                        <Form.Label>Passord</Form.Label>
                        <Form.Control 
                            type="password"
                            name="password"
                            placeholder=""
                            value={""}
                        />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                        <Form.Label>Bekreft passord</Form.Label>
                        <Form.Control 
                            type="password"
                            name="password"
                            placeholder=""
                            value={""}
                        />
                        </Form.Group>

                        <Button 
                            variant="success" 
                            type="submit"
                            onClick={""}
                        >
                    Sendt inn
                </Button>
            </Form>
            <a href="/Login">Har du en konto?</a>
          </Col>
        </Row>
      </Container>
      </div>
    );
}
 
export default Register;