import React, { useState } from 'react';
import {Button, Tabs, Tab, Accordion, Card, Image } from "react-bootstrap";
import "./Topics.css";


const Topics = ({ topics, subtopics, topClick, subClick, allTopics, topicFocus }) => {
	

	return (
		<div className="Topics">
			<div className="desktop">
			<Accordion>
				<Accordion.Toggle
				as={Button} 
				variant="pills"
				eventKey="0"
				value="Alle kategorier"
				onClick={allTopics}
				>
					Alle kategorier
				</Accordion.Toggle>
			</Accordion>
				
			{topics.map((topics, i) => (
			
			<Accordion
			activeKey={topicFocus}
			onSelect={topClick}>
				
				<Accordion.Toggle
				eventKey={topics.id}
				className="imgbtn">
					<Image 
					src={topics.imageUrl}
					className={topicFocus === topics.id ? 'topicimgActive' : 'topicimg'}
					/>
					<div className="imgtitle">{topics.title}</div>
				</Accordion.Toggle>

				{subtopics.filter(subtopics => (subtopics.topicId === topics.id)).map((filteredSubtopics, i) => (
				<Accordion.Collapse eventKey={topics.id}>
							<Button key={i} title={filteredSubtopics.title} value={filteredSubtopics.id} onClick={subClick}>{filteredSubtopics.title}</Button>
				</Accordion.Collapse>))}
				
			</Accordion>))}
			</div>

			
			<Tabs 
			as={Button}
			variant="pills" 
			className="topics" 
			onSelect={topClick}>
				<Tab title="Alle kategorier" value="Alle kategorier" key="0" eventKey="0" className="tab"  onClick={allTopics}>
				</Tab>
				{topics.map((topics, i) => (
					<Tab key={i} eventKey={topics.id} title={topics.title} className="tab">
						{subtopics.filter(subtopics => (subtopics.topicId === topics.id)).map((filteredSubtopics, i) => (
							<Button key={i} title={filteredSubtopics.title} value={filteredSubtopics.id} onClick={subClick}>{filteredSubtopics.title}</Button>
						))}
					</Tab>
				))}
				
			</Tabs>
		</div>
			
	);
}

export default Topics;