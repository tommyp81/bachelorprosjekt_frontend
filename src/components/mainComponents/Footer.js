import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

function Footer() {
    return (
      <div className="Footer">
        <Container >
              <Row>
                  <Col>
                  <p><b>Personvern og informasjonskapsler</b><br />
                    Alt innhold er beskyttet i henhold til lov om opphavsrett til åndsverk (Åndsverkloven). 
                    Innholdet kan ikke benyttes kommersielt uten samtykke fra Norges idrettsforbund. 
                    Ved å bruke dette nettstedet godtar du at informasjonskapsler (cookies) brukes til trafikkmåling 
                    og optimalisering av innhold. (03)</p>
                  </Col>
              </Row>
              <Row>
                  <Col></Col>
              </Row>
              </Container>
      </div>
    );
  }
  
  export default Footer;
  