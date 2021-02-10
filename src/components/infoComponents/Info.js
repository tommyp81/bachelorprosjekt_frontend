import React, { Component, useState } from 'react';
import {Row, Col, Container, Tabs, Tab} from "react-bootstrap";
import "./Info.css";
 
function Info () {
    
    const [key, setKey] = useState('kat1');

    return (
        <div className="Info">
            <Container>
            <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            >
            <Tab eventKey="kat1" title="Kategori" className="kat1">
                <h1>Tittelkategori</h1>
            <iframe width="854" height="480"
            src="https://www.youtube.com/watch?v=o7k4mtIRSt8">
            </iframe>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Etiam tempor nisi non justo lacinia, non sagittis 
                    quam ornare. Morbi vel ante interdum, rhoncus justo 
                    nec, dapibus magna. Curabitur condimentum mi non scelerisque
                    rhoncus. In mollis justo id leo mollis, non facilisis ipsum 
                    fringilla. Vestibulum ullamcorper luctus nunc, vel aliquam 
                    quam dignissim id. Quisque rutrum eu nisl nec hendrerit. 
                    Vivamus tempor urna mollis interdum accumsan. Aenean nisl 
                    purus, cursus sit amet maximus quis, vehicula ut eros. Praesent 
                    est eros, ultricies ac neque lobortis, vulputate eleifend est. 
                    Maecenas volutpat mi a imperdiet accumsan. Cras at est neque. 
                    Cras ut posuere nunc. In arcu lectus, iaculis in massa eget, 
                    auctor rhoncus mi. Quisque ut feugiat arcu. Curabitur cursus, 
                    lectus a dapibus elementum, lectus massa rhoncus velit, et 
                    cursus orci erat eget augue.</p>
            </Tab>
            </Tabs>
            </Container>
        </div>
    );
}

export default Info;