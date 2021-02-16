import React from 'react';
import { Container, Row, Button, Accordion, Card } from "react-bootstrap";
import "./Topics.css";

const Topics = ({ topics, subtopics, subClick }) => {

    return (
        <div className="Topics">
            <Container>
                {topics.map((topics, i) => (
                    
                    <Accordion key={i}>
                        <Row>
                            <Card> 
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="success" size="lg" eventKey={topics.id} onClick={subClick} value={topics.title}>
                                        {topics.title}
                                    </Accordion.Toggle>
                                </Card.Header>
                            </Card>
                        </Row>
                        <Row>
                            {subtopics.filter(subtopics => (subtopics.topicId === topics.id)).map((filteredSubtopics, i) => (
                            <Accordion.Collapse key={i} eventKey={filteredSubtopics.topicId}>
                                <Card.Body><Button value={filteredSubtopics.title} onClick={subClick} >{filteredSubtopics.title}</Button></Card.Body>
                            </Accordion.Collapse>
                            ))}
                        </Row>
                    </Accordion>
                ))}
            </Container>
        </div>
    );
}

export default Topics;