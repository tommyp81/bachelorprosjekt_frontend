import { faBorderNone } from '@fortawesome/free-solid-svg-icons';
import React, { createRef } from 'react';
import { Container, Row, Col, Button, Accordion, Card, ButtonGroup, Tabs, Tab } from "react-bootstrap";
import "./Topics.css";

const Topics = ({ topics, subtopics, subClick, topClick, focus }) => {
	
	return (
		<div className="Topics" >
            <Tabs variant="pills" className="tabs" defaultActiveKey="0">  
            {topics.map((topics, i) => (
                <Tab eventKey={topics.id} onClick={topClick} value={topics.id} title={topics.title} className="tab">
                    {subtopics.filter(subtopics => (subtopics.topicId === topics.id)).map((filteredSubtopics, i) => (
                    <Button key={i} value={filteredSubtopics.title} onClick={subClick}>{filteredSubtopics.title}</Button>
                ))}
                </Tab>
            ))}
            </Tabs>
		</div>
	);
}

export default Topics;