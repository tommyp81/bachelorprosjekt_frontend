import React, { useState } from 'react';
import {Button} from "react-bootstrap";
import "./Kunnskapsportalen.css";


const InfoTopics = ({ infoTopics, videos }) => { 
	
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
            {infoTopics.map((mappedInfoTopics, i) => ( 
            <Button onClick={showCat} className="float-left">
                {mappedInfoTopics.title}
                
            </Button> ))}
            {showCategory ? <Category /> : null}
        </div>
    )
}

export default InfoTopics;