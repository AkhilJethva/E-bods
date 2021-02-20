import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Col, Container, Form, FormGroup, Input, Jumbotron, Label, Row } from 'reactstrap';
import './ContactUs.css'
import b1 from '../../Images/BackGround/b1.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faEnvelope, faPaperPlane, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';

function ContactUs(props) {

    return (
        <div className="contactUs">
            <img 
                className="contactUs__image"
                src={b1}
                alt=""
            />
            <Container fluid className="contactUs__upper">
                <Row>
                    <Col>
                        <h3>Our Mission</h3>
                        <p>HEY! WE’RE STARTING LOGROCKET RESEARCH, COULD YOU ANSWER THREE QUESTIONS FOR US</p>
                    </Col>
                </Row>
            </Container >
            <Container className="contactUs__formContainer">
                <Row>
                    <Col xs="12" sm="9">

                    <h3>SEND US A MESSAGE</h3>
                        <Form className="contactUs__form">
                            <Row>
                                <Col xs="12" sm="6" >
                                    <FormGroup className="contactuUs__formItem">
                                        <Label for="name">Your Name</Label>
                                        <Input type="text" name="name" id="name"
                                            
                                            placeholder="Your name" 
                                            />
                                    </FormGroup>
                                    <FormGroup className="contactuUs__formItem">
                                        <Label for="mobile">Phone Number</Label>
                                        <Input type="text" name="mobile" id="mobile"
                                            
                                            placeholder="(+91) xxxxx yyyyy" 
                                            />
                                    </FormGroup>
                                    <FormGroup className="contactuUs__formItem">
                                        <Label for="exampleEmail">Email</Label>
                                        <Input type="email" name="email" id="exampleEmail"
                                            
                                            placeholder="xyz@abc.com" 
                                            />
                                    </FormGroup>
                                </Col>
                                <Col xs="12" sm="6" >
                                    <FormGroup className="contactuUs__formItem">
                                        <Label for="exampleText">Text Area</Label>
                                        <Input type="textarea" rows="5" cols="5" name="text" id="exampleText" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Button className="contactUSform__btn" color="#196e1b"><FontAwesomeIcon  size="2x"  icon={faPaperPlane} /></Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                            
                        </Form>
                    </Col>
                    <Col className="sec2" xs="12" sm="3">
                        <Row><Col><h5 className="sec2__h5">CONTACT INFORMATION</h5></Col></Row>
                        <Row>
                            <Col>
                            <div className="contactUs__sec2">
                                <div className="contactUs__detail">
                                    <FontAwesomeIcon icon={faAddressCard} color="white" size="1x" />
                                    <address>
                                        Shiv Shakti, Mahavir nagar<br></br>
                                        Delvada Road, Una: 362 560
                                    </address>
                                </div>
                                <div className="contactUs__detail">
                                    <FontAwesomeIcon icon={faEnvelope} color="white"   size="1x" />
                                    <address>
                                        support_ebods@gmail.com
                                    </address>
                                </div>
                                <div className="contactUs__detail">
                                    <FontAwesomeIcon icon={faPhone} color="white"  size="1x" />
                                    <address>
                                        (+91) 7016137452 <br></br>
                                        (+91) 7096378081
                                    </address>
                                </div>
                            </div>
                            </Col>
                        </Row>
                        <Row></Row>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Map google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    initialCenter={
                        {
                            lat: -1.2884,
                            lng: 36.8233
                        }
                    }>
                    <Marker position={{
                        lat: -1.2884,
                        lng: 36.8233
                    }} />
                </Map>

            </Container>
        </div>
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBAonwc6VkSqsoYsXF-T4cKdHLXLIJQIjw'
})(ContactUs)
