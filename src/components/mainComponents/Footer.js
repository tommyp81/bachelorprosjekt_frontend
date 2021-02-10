import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

function Footer() {
    return (
      <div className="Footer">
        <Container>
            <Row xs={1} sm={1} lg={2}>
                  <Col md={4}>
                  <p><b>Personvern og informasjonskapsler</b><br />
                    Alt innhold er beskyttet i henhold til lov om opphavsrett til åndsverk (Åndsverkloven). 
                    Innholdet kan ikke benyttes kommersielt uten samtykke fra Norges idrettsforbund. 
                    Ved å bruke dette nettstedet godtar du at informasjonskapsler (cookies) brukes til trafikkmåling 
                    og optimalisering av innhold. (03)</p>
                  </Col>
                  <Col md={4}>
                    <p>Besøksadresse: Idrettens hus, Sognsveien 73, 0854 Oslo</p>
                      <p>Postadresse: Norges Badmintonforbund, Postboks 5000, 0840 Oslo</p>
                      <p>E-post: badminton@badminton.no</p>
                      <p>Fakturaadresse: 871483922@autoinvoice.no</p></Col>
              </Row>
              <Row>
              </Row>
        </Container>
      </div>
    );
  }
  
  export default Footer;
  