import React from 'react';
import { Container, Row, Button, Accordion, Card } from "react-bootstrap";
import "./ForumCategories.css";

const ForumCategories = ({ topics, subtopics }) => {
    return (
        <div className="ForumCategories">
            {topics.map((topics) => (
            <Container>
                <Accordion>
                    <Row>
                        <Card> 
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="success" size="lg" eventKey={topics.id}>
                                    {topics.title}
                                </Accordion.Toggle>
                            </Card.Header>
                        </Card>
                    </Row>
                    <Row>
                        {subtopics.filter(subtopics => (subtopics.topicId === topics.id)).map(filteredSubtopics => (
                        <Accordion.Collapse eventKey={filteredSubtopics.topicId}>
                            <Card.Body><Button>{filteredSubtopics.title}</Button></Card.Body>
                        </Accordion.Collapse>))}
                    </Row>
                </Accordion>
            </Container>
            ))}
        </div>
    );
}

export default ForumCategories;