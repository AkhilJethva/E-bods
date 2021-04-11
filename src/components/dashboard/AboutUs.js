import React,  { useState } from 'react'
import './AboutUs.css'
import { Collapse, Button, CardBody, Card, CardImg, Toast, ToastBody, ToastHeader } from 'reactstrap';
import i1 from '../../Images/AboutUsImg/i1.jpg'
import DonateAni from '../../animations/25067-donate.json'
import Lottie from 'react-lottie';


function AboutUs(props) {

    const [isOpen, setIsOpen] = useState(true);
    
    const toggle = () => setIsOpen(!isOpen);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: DonateAni,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <div className="aboutUs">
            <div className="aboutUs__info">
                <Button color="primary" className="aboutUs__infobtn" onClick={toggle} style={{ marginBottom: '1rem' }}>What's E-BODS?</Button>
                <Collapse isOpen={isOpen}>
                    <Card className="info__card">
                    <CardImg className="info__img" width="100%" src={i1} alt="Card image cap" />
                    <CardBody>
                        <p><blockquote><i>“Service to others is the rent you pay for your room here on earth.”</i></blockquote> -Mohammed Ali</p>
                        <p><blockquote><i>“We ourselves feel that what we are doing is just a drop in the ocean. But the ocean would be less because of that missing drop.” </i></blockquote> -Mother Teresa</p>
                    </CardBody>
                    </Card>
                </Collapse>
                <div className="aboutUs__anima">
                <Lottie 
                    options={defaultOptions}
                    height={200}
                    width={200}
                /></div>
            </div>
            <div className="aboutUs__workflow">
                
                <div className="workflow__header">
                    <hr></hr>
                        <h3>Steps to fund Raise</h3>
                    <hr></hr>
                </div>
                <div className="p-3 my-2 chatbox">
                    <img alt="" src="https://img.icons8.com/plasticine/100/000000/internet.png"/>
                    <Toast  className="toast__left">
                    <ToastHeader>
                        Step-1
                    </ToastHeader>
                    <ToastBody  className="toast___body">
                        Start your free fundraiser
                    </ToastBody>
                    </Toast>
                </div>
                <div className="p-3 my-2 chatbox">
                    
                    <Toast className="toast__right">
                    <ToastHeader>
                        Step-2
                    </ToastHeader>
                    <ToastBody className="toast___body">
                        Share your fundraiser online
                    </ToastBody>
                    </Toast>
                    <img alt="" style={{width:"100px"}} src="https://img.icons8.com/nolan/64/share.png"/>
                </div>
                <div className="p-3 my-2 chatbox">
                    <img alt="" src="https://img.icons8.com/doodle/96/000000/earth-care.png"/>
                    <Toast className="toast__left">
                    <ToastHeader>
                        Step-3
                    </ToastHeader>
                    <ToastBody className="toast___body">
                        Receive donation from around the glob
                    </ToastBody>
                    </Toast>
                </div>
                <div className="p-3 my-2 chatbox">
                    
                    <Toast className="toast__right">
                    <ToastHeader>
                        Step-4
                    </ToastHeader>
                    <ToastBody className="toast___body">
                        Get transfer the funds to hospital directly
                    </ToastBody>
                    </Toast>
                    <img alt="" src="https://img.icons8.com/emoji/96/000000/hospital-emoji.png"/>
                </div>
                
            </div>
        </div>
    )
}

export default AboutUs
