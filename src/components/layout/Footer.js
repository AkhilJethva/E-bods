import { faAddressCard, faEnvelope, faGreaterThan, faPaperPlane, faPhone,  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Col,Row, Container, Form, FormGroup,Input,List,} from 'reactstrap'
import './Footer.css'

import { Button,NavLink } from 'reactstrap'



function Footer() {
    return (
        <footer className="footer fluid">
            <Container fluid>
                <Row className="footer__row"> 
                    <Col xs="6" sm="4">
                        <h4>E-Bods</h4>
                        <div className="footer__sec">
                            <div className="footer__address">
                                <FontAwesomeIcon icon={faAddressCard} color="#0978ed" size="2x" />
                                <address>
                                    <h5>Address</h5>
                                    Shiv Shakti, Mahavir nagar<br></br>
                                    Delvada Road, Una: 362 560
                                </address>
                            </div>
                            <div className="footer__address">
                                <FontAwesomeIcon icon={faEnvelope} color="#0978ed"   size="2x" />
                                <address>
                                    <h5>Have Any Quetions?</h5>
                                    support_ebods@gmail.com
                                </address>
                            </div>
                            <div className="footer__address">
                                <FontAwesomeIcon icon={faPhone} color="#0978ed"  size="2x" />
                                <address>
                                    <h5>Also Available At</h5>
                                    (+91) 7016137452 <br></br>
                                    (+91) 7096378081
                                </address>
                            </div>
                        </div>
                    </Col>
                    <Col xs="6" sm="4">
                        <h4>Important Links</h4>
                            <div className="footer__sec1">
                                <List >
                                    
                                        <div className="footer__group">
                                            <FontAwesomeIcon icon={faGreaterThan}   size="1x" />
                                            <NavLink className="footer__links" href="https://github.com/reactstrap/reactstrap">Contact Us</NavLink>
                                        </div>
                                        <div className="footer__group">
                                            <FontAwesomeIcon icon={faGreaterThan}   size="1x" />
                                            <NavLink className="footer__links" href="/components/">About Us</NavLink>
                                        </div>
                                        {/* <li className="footer__links">Vestibulum laoreet porttitor sem</li>
                                        <li className="footer__links">Ac tristique libero volutpat at</li> */}
                                </List>
                            </div>
                    </Col>
                    <Col  sm="4">
                        <h4>
                            CONNECT WITH US
                        </h4>
                            <Form className="footer__form">
                                <FormGroup>
                                    <Input type="email" name="email" id="exampleEmail" placeholder="Your Email Address" />
                                </FormGroup>
                                <Button className="form__btn" color="primary"><FontAwesomeIcon icon={faPaperPlane} /></Button>
                            </Form>
                            <div>
                                <img className="footer__icon" alt="" src="https://img.icons8.com/bubbles/50/000000/twitter.png"/>
                                <img className="footer__icon" alt="" src="https://img.icons8.com/bubbles/50/000000/facebook-new.png"/>
                                <img className="footer__icon" alt="" src="https://img.icons8.com/bubbles/50/000000/instagram-new.png"/>
                            </div>
                    </Col>
                </Row>
            </Container>
            <div className="footer__copyright">
                <hr></hr>
                <h6>All rights reserved by E-BODS. Copyright © 2021</h6>
                <hr></hr>
            </div>
        </footer>
    )
}

export default Footer
