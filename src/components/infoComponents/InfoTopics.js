import React, { useState } from 'react';
import {Button} from "react-bootstrap";
import "./Kunnskapsportalen.css";


const InfoTopics = ({ infoTopics, showVideos, showDocuments }) => { 
	
    const [showCategory, setShowCategory] = useState(false);

    const toggleCategory = () => setShowCategory(!showCategory)

    const Category = () => {
        return <div className="">
            <Button onClick={showVideos}>Video</Button>
            <Button onClick={showDocuments}>Dokument</Button>
        </div>;
    }
    
	return (
        <div className="InfoTopics"> 
            {infoTopics.map((mappedInfoTopics, i) => ( 
            <Button key={mappedInfoTopics.id} onClick={toggleCategory} className="float-left">
                {mappedInfoTopics.title}
            </Button> ))}
            {showCategory ? <Category /> : null}
        </div>
    )
}

export default InfoTopics;