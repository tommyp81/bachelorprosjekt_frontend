import React, { useState } from 'react';
import {Button, Tabs, Tab, Accordion, Card, Image } from "react-bootstrap";
import "./Kunnskapsportalen.css";


const InfoTopics = () => {
	
    const [infoTopics, setInfoTopics] = useState();
    const [showCategory, setShowCategory] = useState(false);

    const showCat = () => setShowCategory(true)

    const Category = () => {
        return <div className="">
            <Button id="video">Video</Button>
            <Button id="dokument">Dokument</Button>
        </div>;
    }
    

	return (
        <div className="InfoTopics">
            <Button onClick={showCat} className="float-left">
                InfoTopic 1
            </Button>
            {showCategory ? <Category /> : null}

        </div>
    )
}

export default InfoTopics;