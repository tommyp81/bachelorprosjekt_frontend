import React, { useState } from 'react';
import {Button, Tabs, Tab, Accordion, Card, Image } from "react-bootstrap";

const ContentType = () => {
	
	return (
        <div className="ContentType">
            <Tabs 
            as={Button}
            variant="pills"
            defaultActiveKey="0">
                <Tab title="Vis alt" eventKey="0">
                    
                </Tab>
                <Tab title="Video" eventKey="1">
                </Tab>
                <Tab title="Dokument" eventKey="2">
                </Tab>
            </Tabs>
        </div>
    )
}

export default ContentType;