import React, { useState } from 'react';
import {Button, Tabs, Tab, Accordion, Form} from "react-bootstrap";
import "./Kunnskapsportalen.css";


const InfoTopics = ({ infoTopics, allContent, filterContent }) => { 

	return (
        <div className="InfoTopics"> 
            <Button onClick={allContent}>Vis alt</Button>
        {infoTopics.map((mappedInfoTopics, i) => ( 
            <Button key={i} onClick={filterContent} value={mappedInfoTopics.id} title={mappedInfoTopics.title}>
                {mappedInfoTopics.title}
            </Button> ))}
        </div>
    )
}

export default InfoTopics;