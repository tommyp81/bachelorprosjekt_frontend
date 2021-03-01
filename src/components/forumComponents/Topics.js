import { faBorderNone } from '@fortawesome/free-solid-svg-icons';
import React, { createRef } from 'react';
import { Container, Row, Col, Button, Accordion, Card, ButtonGroup, Tabs, Tab } from "react-bootstrap";
import "./Topics.css";

const Topics = ({ topics, subtopics, topClick, subClick, focus }) => {
	
	return (
		<div className="Topics">
			<Tabs variant="pills" className="justify-content-center">
				{topics.map((topics, i) => (
					<Tab key={i} eventKey={topics.id} value={topics.title} title={topics.title} onClick={topClick} className="tab">
						{subtopics.filter(subtopics => (subtopics.topicId === topics.id)).map((filteredSubtopics, i) => (
						<Button key={i} value={filteredSubtopics.id} onClick={subClick}>{filteredSubtopics.title}</Button>
					))}
					</Tab>
				))}
			</Tabs>
		</div>
	);
}

export default Topics;