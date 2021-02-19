import { faBorderNone } from '@fortawesome/free-solid-svg-icons';
import React, { createRef } from 'react';
import { Container, Row, Col, Button, Accordion, Card, ButtonGroup, Tabs, Tab } from "react-bootstrap";
import "./Topics.css";

const Topics = ({ topics, subtopics, subClick, focus }) => {
	
	return (
		<div className="Topics">
            <Tabs variant="pills" className="tabs">
            {topics.map((topics, i) => (
                <Tab key={i} eventKey={topics.id}  value={topics.title} title={topics.title} className="tab">
                    {subtopics.filter(subtopics => (subtopics.topicId === topics.id)).map((filteredSubtopics, i) => (
                    <Button key={i} value={filteredSubtopics.id} onClick={subClick}>{filteredSubtopics.title}</Button>
                ))}
                </Tab>
            ))}
            </Tabs>




				
			{/* <Accordion animation={false}>
					{topics.map((topics, i) => (
						<Card key={i}>
							<Card.Header>
								<Accordion.Toggle as={Button} variant="success" size="lg" eventKey={topics.id} onClick={subClick} value={topics.title}>
									{topics.title}
								</Accordion.Toggle>
							</Card.Header>
							<Accordion.Collapse eventKey={topics.id} animation={false}>
								<Card.Body>
									<ButtonGroup>
										{subtopics.filter(subtopics => (subtopics.topicId === topics.id)).map((filteredSubtopics, i) => (
											<Button key={i} value={filteredSubtopics.title} onClick={subClick} >{filteredSubtopics.title}</Button>
										))}
									</ButtonGroup>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					))}
				</Accordion><>
				<ButtonGroup>
					{topics.map(topic => (
						<Button key={topic.id} value={topic.title} onClick={subClick} variant="success">{topic.title}</Button>
					))}
				</ButtonGroup>
				{topics.map(topic => (
					<div className={`group${topic.id}`} >
						{subtopics.filter(subtopics => (subtopics.topicId === topic.id)).map((filteredSubtopics, i) => (
							<Button key={i} value={filteredSubtopics.title} onClick={subClick} >{filteredSubtopics.title}</Button>
						))}
					</div>
				))}
			</> */}
			
		</div>
	);
}

export default Topics;