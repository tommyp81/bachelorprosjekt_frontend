import React, { Component } from 'react';
import { Container, Row, Col, Button, Nav, Accordion, Tabs, Tab, Card } from "react-bootstrap";
import "./ForumCategories.css";

function ForumCategories () {
    return (
        <div className="ForumCategories">
            <Container>
                <Accordion>
                    <Row>
                        <Card> 
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="success" size="lg" eventKey="0">
                                    Konkurranse
                                </Accordion.Toggle>
                            </Card.Header>
                        </Card>

                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="success" size="lg" eventKey="1">
                                    Kompetanse
                                </Accordion.Toggle>
                            </Card.Header>
                        </Card>

                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="success" size="lg" eventKey="2">
                                    Utvikling
                                </Accordion.Toggle>
                            </Card.Header>
                        </Card>

                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="success" size="lg" eventKey="3">
                                    Toppidrett
                                </Accordion.Toggle>
                            </Card.Header>
                        </Card>
                    </Row> 
                    <Row>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Button>Hallo</Button>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Row>    
                    <Row>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <Button>Hallo</Button>
                                <Button>Hei</Button>
                                <Button>Hallo</Button>
                                <Button>Hallo</Button>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Row>
                    <Row>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                <Button>Hallo</Button>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Row>
                    <Row>
                        <Accordion.Collapse eventKey="3">
                            <Card.Body>
                                    <Button>Hallo</Button>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Row>
                </Accordion>
 
                </Container>
        </div>
    );
}

export default ForumCategories;