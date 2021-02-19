import React ,{Component} from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";
import { SiFacebook } from 'react-icons/si';
import { RiTwitterFill, RiInstagramLine} from 'react-icons/ri';
import { HiOutlineMail } from 'react-icons/hi';

function Footer(){
 
    return (
      <div className="Footer">
        <Container>
            <Row>
                <Col>
                  <div className="social">
                    <p><b>Badminton</b><br /></p>
                    <a className="facebook" href='https://www.facebook.com/badmintonnorge/'><SiFacebook size={22} /></a>
                    <a className="twitter" href='https://twitter.com/badmintonnorge'><RiTwitterFill size={22} /></a>
                    <a className="instagran" href='https://www.instagram.com/badmintonnorge/'><RiInstagramLine size={22}/></a>
                  </div>
                </Col>
            </Row>
            <Row xs={1} sm={1} lg={2}>
              
                  <Col md={6}>
                    <div className="textRight">
                      <p><b>Besøksadresse:</b><br />Idrettens hus, Sognsveien 73, 0854 Oslo</p>
                      <p><b>Postadresse:</b><br />Norges Badmintonforbund, Postboks 5000, 0840 Oslo</p>
                    </div>
                  </Col>
                  
                  <Col md={6}>
                      <div className="link">
                        <p><b><HiOutlineMail size={21.5}/>  E-post:</b> <br /><a href="mailto:badminton@badminton.no">badminton@badminton.no</a></p>
                        <p><b>Fakturaadresse:</b> <br />871483922@autoinvoice.no</p>
                      </div>
                  </Col>
                      
            </Row>
            <Row>
                <Col>
                  <div className="personvern">
                      <p><b>Personvern og informasjonskapsler</b><br />
                        Alt innhold er beskyttet i henhold til lov om opphavsrett til åndsverk (Åndsverkloven). 
                        Innholdet kan ikke benyttes kommersielt uten samtykke fra Norges idrettsforbund. 
                        Ved å bruke dette nettstedet godtar du at informasjonskapsler (cookies) brukes til trafikkmåling 
                        og optimalisering av innhold. (03)</p>
                  </div>
                </Col>
            </Row>
        </Container>
      </div>
    );
    
}  
  export default Footer;
  