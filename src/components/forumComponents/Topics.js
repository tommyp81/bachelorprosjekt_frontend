import React, { useState } from 'react';
import { Button, Tabs, Tab, Accordion, Card, Image } from "react-bootstrap";
import "./Topics.css";
import {host} from '../../App'

const Topics = ({ topics, subtopics, topClick, subClick, topicFocus, subtopicFocus }) => {


	return (
		<div className="Topics">
			<div className="desktop">
				<Accordion onSelect={topClick} activeKey={topicFocus}>
					<Accordion.Toggle
						as={Button}
						variant="pills"
						eventKey="0"
						value="Alle kategorier"
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
								src={host+topics.imageUrl}
								className={topicFocus === topics.id ? 'topicimgActive' : 'topicimg'}
							/>
							<div className="imgtitle">{topics.title}</div>
						</Accordion.Toggle>

						{subtopics.filter(subtopics => (subtopics.topicId === topics.id)).map((filteredSubtopics, i) => (
							<Accordion.Collapse eventKey={topics.id}>
								<Button 
								key={i} 
								title={filteredSubtopics.title} 
								value={filteredSubtopics.id} 
								onClick={subClick}
								className={subtopicFocus === filteredSubtopics.id ? "subtopicbtnActive" : "subtopicbtn"}>
									{filteredSubtopics.title}
								</Button>
							</Accordion.Collapse>))}

					</Accordion>))}
			</div>


			<Tabs
				as={Button}
				variant="pills"
				className="topics"
				onSelect={topClick}>
				<Tab title="Alle kategorier" value="Alle kategorier" key="0" eventKey="0" className="tab" >
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