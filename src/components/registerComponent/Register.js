import React, { useState } from 'react';
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import WelcomeLogo from '../loginComponents/WelcomeLogo';
import { host } from '../../App'
import "./Register.css"


const Register = (props) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [Personnummer, setPersonnummer] = useState("")
    const [Brukernavn, setBrukernavn] = useState("")
    const [Fornavn, setFornavn] = useState("")
    const [Etternavn, setEtternavn] = useState("")
    const [Epost, setEpost] = useState("")
    const [Passord, setPassord] = useState("")
    const [BekreftPassord, setBekreftPassord] = useState("")


    const handleSubmitUser = async (event) => {
        
        const brukerData = {
            //personnummer: Personnummer,
            username: Brukernavn,
            firstName: Fornavn,
            lastName: Etternavn,
            //epost: Epost,
            password: Passord
            //bekreftPassord: BekreftPassord
        }


        console.log("Objektet:")
        console.log(brukerData)


        fetch(host+'users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(brukerData)
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
                console.log(data)
                //setVideos(current => [...current, data])
        })
        .catch(error => console.log(error))

        handleClose();
    };


    return (  
        <div className="Register">
            <Container fluid="md">
                <Row>
                    {/*<Col className="logo" sm={12} >
                        <WelcomeLogo />
                        </Col>*/}
                    <Col className="submit" sm={30} >
                    <h2 id="registerHeading">Registrer informasjonen din</h2>

                    
                    <Form>
                        <Form.Group controlId="">
                            <Form.Label>Personnummer</Form.Label>
                            <Form.Control 
                                id="Personnummer"
                                type="number"
                                name="Personnummer"
                                placeholder="ddmmååxxxxx"
                                value={Personnummer}
                                onChange={e => setPersonnummer(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="">
                            <Form.Label>Brukernavn</Form.Label>
                            <Form.Control 
                                id="Brukernavn"
                                type="text"
                                name="Brukernavn"
                                placeholder="Brukernavn"
                                value={Brukernavn}
                                onChange={e => setBrukernavn(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="">
                            <Form.Label>Fornavn</Form.Label>
                            <Form.Control 
                                id="Fornavn"
                                type="text"
                                name="Fornavn"
                                placeholder=""
                                value={Fornavn}
                                onChange={e => setFornavn(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group  controlId="">
                            <Form.Label>Etternavn</Form.Label>
                            <Form.Control 
                                id="Etternavn"
                                type="text"
                                name="Etternavn"
                                placeholder=""
                                value={Etternavn}
                                onChange={e => setEtternavn(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" >
                            <Form.Label>E-post</Form.Label>
                            <Form.Control 
                                type="email"
                                name="email"
                                placeholder="email@example.com"
                                value={Epost}
                                onChange={e => setEpost(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Passord</Form.Label>
                            <Form.Control 
                                type="password"
                                name="password"
                                placeholder=""
                                value={Passord}
                                onChange={e => setPassord(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Bekreft passord</Form.Label>
                            <Form.Control 
                                type="password"
                                name="password"
                                placeholder=""
                                value={BekreftPassord}
                                onChange={e => setBekreftPassord(e.target.value)}
                            />
                        </Form.Group>

                        <Button 
                            variant="success" 
                            type="submit"
                            onClick={handleSubmitUser}
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