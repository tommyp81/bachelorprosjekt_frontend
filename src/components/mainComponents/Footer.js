import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";
import { SiFacebook } from 'react-icons/si';
import { RiTwitterFill, RiInstagramLine } from 'react-icons/ri';
import { HiOutlineMail } from 'react-icons/hi';

function Footer() {

  return (
    <div className="Footer">
      <Container>
        <Row>
          <Col>
            <div className="social">
              <p><b>Badminton</b><br /></p>
              <a className="facebook" href='https://www.facebook.com/badmintonnorge/' target="_blank"><SiFacebook size={22} /></a>
              <a className="twitter" href='https://twitter.com/badmintonnorge' target="_blank"><RiTwitterFill size={22} /></a>
              <a className="instagram" href='https://www.instagram.com/badmintonnorge/' target="_blank"><RiInstagramLine size={22} /></a>
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
              <p><b><HiOutlineMail size={21.5} />  E-post:</b> <br /><a href="mailto:badminton@badminton.no">badminton@badminton.no</a></p>
              <p><b>Fakturaadresse:</b> <br />871483922@autoinvoice.no</p>
            </div>
          </Col>

        </Row>
      </Container>
    </div>
  );

}
export default Footer;
