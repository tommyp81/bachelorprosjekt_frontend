import React, { useState } from 'react';
import {Button, Tabs, Tab, Accordion, Card, Image, Modal, Form } from "react-bootstrap";
import FileDrop from '../FileDrop';

const UploadFile = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
	
	return (
        <div className="UploadFile">
            <Button onClick={handleShow} variant="primary">Last opp</Button>
            
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Last opp ny...</Modal.Title>
                </Modal.Header>
                <Tabs defaultActiveKey="0">
                    <Tab title="Video" eventKey="0">
                        <Modal.Body>
                            <Form>
                                <h4>Lim inn URL</h4>
                                <Form.Control type="input"></Form.Control>
                            </Form>
                        </Modal.Body>
                    </Tab>
                    <Tab title="Dokument" eventKey="1">
                        <Modal.Body>
                            <FileDrop />
                        </Modal.Body>
                    </Tab>
                </Tabs>
                <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Avbryt
                </Button>
                <Button variant="primary">
                    Last opp
                </Button>
                </Modal.Footer>
            </Modal>
        </div>

        
    )
}

export default UploadFile;